import axios from "axios";
import User from "../models/User.js";
import { StatusCodes } from "http-status-codes";
import mongoose from "mongoose";
import Transaction from "../models/Transaction.js";
import { BadRequestError, UnAuthenticatedError } from "../errors/index.js";

const getTransactions = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.user.userId });
    const transaction = await Transaction.find({
      $or: [{ receiver: user.name }, { giver: user.name }],
    });
    res.json(transaction);
  } catch (error) {
    throw new BadRequestError("Something Went Wrong :(");
  }
};

const pay = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.user.userId });
    const newBalance = Number(user.balance) - 100;
    const newUser = await User.findOneAndUpdate(
      { _id: req.user.userId },
      { balance: newBalance }
    );
    const transaction = await Transaction.create({
      giver: user.name,
      receiver: "Tip Account",
      amount: 100,
      transactionTime: new Date(),
    });
    res.status(StatusCodes.OK).json("Payment Done!!");
  } catch (error) {
    console.log(error);
    throw new BadRequestError("Something Went Wrong :(");
  }
};

export { getTransactions, pay };
