import giversNote from "../models/giversNote.js";
import Loan from "../models/Loan.js";
import Transaction from "../models/Transaction.js";
import { StatusCodes } from "http-status-codes";
import User from "../models/User.js";
import {
  BadRequestError,
  InternalServerError,
  UnAuthenticatedError,
} from "../errors/index.js";
import checkUser from "../Utils/checkUser.js";

const createNote = async (req, res) => {
  const { lender, principal, interest } = req.body;
  try {
    if (!lender || !principal || !interest) {
      throw new BadRequestError("Please Provide All Values!!");
    }
    const createdBy = req.user.userId;
    const user = await User.findOne({ name: lender });
    checkUser(req.user, user._id);
    const user1 = await giversNote.create({
      lender,
      principal,
      interest,
      createdBy,
    });
    res.status(StatusCodes.CREATED).json({
      user1,
    });
  } catch (e) {
    if (e instanceof BadRequestError) {
      throw new BadRequestError(e.message);
    } else {
      throw new InternalServerError("Something Went Wrong!!");
    }
  }
};

const repayLoan = async (req, res) => {
  const { _id, outstanding, principal, interest } = req.body;
  try {
    if (!_id) {
      throw new BadRequestError("Please Provide All Values!!");
    }
    const loan = await Loan.findOne({ _id });
    if (!loan) {
      throw new BadRequestError("Loan Repaid!!");
    }
    const borrower = await User.findOne({ name: loan.borrower });
    const user = await User.findOne({ _id: req.user.userId });
    checkUser(req.user, borrower._id);
    const lender = await User.findOne({ name: loan.lender });

    if (borrower.name === lender.name) {
      throw new BadRequestError("You Can't Repay This Loan!!");
    }
    if (borrower.balance < outstanding) {
      throw new BadRequestError(
        "You Don't Have Sufficient Money To Repay This Loan!!"
      );
    }

    await User.updateOne(
      { name: lender.name },
      {
        balance: lender.balance + Number(outstanding),
        givings: lender.givings - loan.principal,
      }
    );
    await User.updateOne(
      { name: borrower.name },
      {
        balance: borrower.balance - Number(outstanding),
        borrowings: borrower.borrowings - loan.principal,
      }
    );
    await Transaction.create({
      giver: borrower.name,
      receiver: lender.name,
      amount: outstanding,
      transactionTime: new Date(),
      isStockTransaction: false,
      principal: principal,
      interest: interest,
      isRepay: true,
    });
    await Loan.findByIdAndRemove({ _id });
    res.status(StatusCodes.ACCEPTED).json("Success");
  } catch (e) {
    if (e instanceof BadRequestError) {
      throw new BadRequestError(e.message);
    } else {
      throw new InternalServerError("Something Went Wrong!!");
    }
  }
};

const grantLoan = async (req, res) => {
  const { _id } = req.body;
  try {
    if (!_id) {
      throw new BadRequestError("Please Provide All Values!!");
    }
    const borrower = await User.findOne({ _id: req.user.userId });
    const note = await giversNote.findOne({ _id });
    if (!note) {
      throw new BadRequestError("Loan No Longer Available");
    }
    const lender = await User.findOne({ _id: note.createdBy });

    if (borrower.name === lender.name) {
      throw new BadRequestError("You Can't Give Yourself A Loan!!");
    }
    let processingFees = (note.principal * 0.005).toFixed(2);
    if (lender.balance < note.principal) {
      throw new BadRequestError(
        "Lender Currently Does Not Have Sufficient Amount Of Money!!"
      );
    }
    const newLender = await User.updateOne(
      { name: lender.name },
      {
        balance: lender.balance - note.principal - processingFees,
        givings: lender.givings + note.principal,
      }
    );
    const newBorrower = await User.updateOne(
      { name: borrower.name },
      {
        balance: borrower.balance + note.principal - processingFees,
        borrowings: borrower.borrowings + note.principal,
      }
    );
    const loan = await Loan.create({
      lender: lender.name,
      borrower: borrower.name,
      principal: note.principal,
      interest: note.interest,
      issuedDate: new Date(),
    });
    const transaction = await Transaction.create({
      giver: lender.name,
      receiver: borrower.name,
      amount: note.principal,
      transactionTime: new Date(),
      isStockTransaction: false,
      principal: note.principal,
      interest: note.interest,
      isRepay: false,
      tax: processingFees,
    });
    const noteRemoved = await giversNote.findByIdAndRemove({ _id });
    res.status(StatusCodes.ACCEPTED).json(transaction);
  } catch (e) {
    if (e instanceof BadRequestError) {
      throw new BadRequestError(e.message);
    } else {
      throw new InternalServerError("Something Went Wrong :(");
    }
  }
};

const getMyGivings = async (req, res) => {
  try {
    const lender = await User.findOne({ _id: req.user.userId });
    const loans = await Loan.find({ lender: lender.name });
    res.status(StatusCodes.ACCEPTED).json(loans);
  } catch (e) {
    throw new InternalServerError("Something Went Wrong :(");
  }
};

const getMyBorrowings = async (req, res) => {
  try {
    const borrower = await User.findOne({ _id: req.user.userId });
    const loans = await Loan.find({ borrower: borrower.name });
    res.status(StatusCodes.ACCEPTED).json(loans);
  } catch (err) {
    throw new InternalServerError("Something Went Wrong :(");
  }
};

const getNotes = async (req, res) => {
  giversNote.find((err, data) => {
    if (err) {
      throw new InternalServerError("Something Went Wrong :(");
    }
    res.status(StatusCodes.OK).json(data);
  });
};

const getMyNotes = async (req, res) => {
  const queryObject = {
    createdBy: req.user.userId,
  };
  giversNote.find(queryObject, (err, data) => {
    if (err) {
      throw new InternalServerError("Something Went Wrong :(");
    }
    res.status(StatusCodes.OK).json(data);
  });
};

const deleteMynote = async (req, res) => {
  const { _id } = req.body;
  try {
    const note = await giversNote.findOne({ _id });
    checkUser(req.user, note.createdBy);
  } catch (e) {
    throw new InternalServerError("Something Went Wrong :(");
  }
  try {
    const noteRemoved = await giversNote.findByIdAndRemove({ _id });
    res.status(StatusCodes.ACCEPTED).json("Note Deleted Successfully");
  } catch (e) {
    throw new InternalServerError("Something Went Wrong :(");
  }
};

export {
  createNote,
  getNotes,
  getMyNotes,
  grantLoan,
  getMyBorrowings,
  getMyGivings,
  repayLoan,
  deleteMynote,
};
