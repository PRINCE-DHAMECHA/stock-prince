import Share from "../models/Share.js";
import User from "../models/User.js";
import { StatusCodes } from "http-status-codes";
import checkUser from "../Utils/checkUser.js";
import {
  BadRequestError,
  InternalServerError,
  UnAuthenticatedError,
} from "../errors/index.js";
import Transaction from "../models/Transaction.js";

const buy = async (req, res) => {
  let { ownerName, stockName, price, quantity } = req.body;
  quantity = Number(quantity);
  price = Number(price);
  let tempPrice = price;
  let tempQuantity = quantity;
  const createdBy = req.user.userId;
  if (!ownerName || !stockName || !price || !quantity) {
    throw new BadRequestError("Please Provide All Values!!");
  }
  if (price <= 0 || quantity <= 0 || quantity % 1 != 0) {
    throw new BadRequestError("Please Provide Valid Values!!");
  }
  try {
    let user = await User.findOne({ name: ownerName });

    if (!user) {
      throw new BadRequestError("No User Found!!");
    }
    checkUser(req.user, user._id);
    let wallet = user["balance"];
    let brokerage = Math.min(0.0003 * quantity * price, 20);
    if (wallet < quantity * price + brokerage) {
      throw new BadRequestError("Not Enough Balance In Your Demat Account!!");
    }
    let newWallet = parseFloat(wallet - price * quantity - brokerage);
    newWallet = newWallet.toFixed(2);

    let test = await Share.findOne({ ownerName, stockName });

    if (test) {
      checkUser(req.user, test.createdBy);
      price =
        (parseFloat(test["price"]) * parseFloat(test["quantity"]) +
          parseFloat(price) * parseFloat(quantity)) /
        (parseFloat(test["quantity"]) + parseFloat(quantity));
      quantity = Number(quantity) + Number(test["quantity"]);
      await Share.findOneAndUpdate(
        { ownerName, stockName },
        { ownerName, stockName, price, quantity }
      );
      res.status(StatusCodes.OK);
      await User.updateOne(
        { name: ownerName },
        {
          balance: newWallet,
        }
      );
      await Transaction.create({
        giver: ownerName,
        receiver: "Stock-Market",
        amount: (tempPrice * tempQuantity + brokerage).toFixed(2),
        transactionTime: new Date(),
        isStockTransaction: true,
        stockName: stockName,
        price: tempPrice,
        quantity: tempQuantity,
        tax: brokerage,
      });
      res.json("Buy Success!!");
    } else {
      price = parseFloat(price);
      quantity = Number(quantity);
      await Share.create({
        ownerName,
        stockName,
        price,
        quantity,
        createdBy,
        buyTime: new Date(),
        tax: brokerage,
      });
      res.status(StatusCodes.OK);
      await User.updateOne(
        { name: ownerName },
        {
          balance: newWallet,
        }
      );
      await Transaction.create({
        giver: ownerName,
        receiver: "Stock-Market",
        amount: (tempPrice * tempQuantity + brokerage).toFixed(2),
        transactionTime: new Date(),
        isStockTransaction: true,
        stockName: stockName,
        price: tempPrice,
        quantity: tempQuantity,
        tax: brokerage,
      });
      res.json("Buy Success!!");
    }
  } catch (e) {
    if (e instanceof BadRequestError) {
      throw new BadRequestError(e.message);
    } else if (e instanceof UnAuthenticatedError) {
      throw new UnAuthenticatedError(e.message);
    } else {
      throw new InternalServerError("Something Went Wrong :(");
    }
  }
};

const sell = async (req, res) => {
  let { ownerName, stockName, price, quantity } = req.body;
  try {
    quantity = Number(quantity);
    price = Number(price);
    let tempPrice = price;
    let tempQuantity = quantity;
    let DP_Charges = 15.93;
    if (!ownerName || !stockName || !price || !quantity) {
      throw new BadRequestError("Please Provide All Values!!");
    }
    if (price <= 0 || quantity <= 0 || quantity % 1 != 0) {
      throw new BadRequestError("Please Provide Valid Values!!");
    }
    let user = await User.findOne({ name: ownerName });

    if (!user) {
      throw new UnAuthenticatedError("No User Found!!");
    }
    checkUser(req.user, user._id);
    let test = await Share.findOne({ ownerName, stockName });

    if (test) {
      checkUser(req.user, test.createdBy);
      if (Number(test["quantity"]) < Number(quantity)) {
        throw new BadRequestError(
          "You Don't Have Sufficient Quantity to Sell!!"
        );
      }
      const newQuantity = Number(test["quantity"]) - Number(quantity);
      let oldQuantity = quantity;
      quantity = newQuantity;
      const sellPrice = price;
      price = Number(test["price"]);
      if (quantity <= 0) {
        await Share.findOneAndRemove({
          ownerName,
          stockName,
        });
        quantity = oldQuantity;
        let newWallet = parseFloat(
          user["balance"] + sellPrice * quantity - DP_Charges
        );
        newWallet = newWallet.toFixed(2);
        await User.updateOne(
          { name: ownerName },
          {
            balance: newWallet,
          }
        );
        await Transaction.create({
          giver: "Stock-Market",
          receiver: ownerName,
          amount: (sellPrice * quantity - DP_Charges).toFixed(2),
          transactionTime: new Date(),
          isStockTransaction: true,
          stockName: stockName,
          price: tempPrice,
          quantity: tempQuantity,
          tax: DP_Charges,
        });
        res.status(StatusCodes.OK).json("Sell Success!!");
      } else {
        await Share.findOneAndUpdate(
          { ownerName, stockName },
          { ownerName, stockName, price, quantity }
        );
        quantity = oldQuantity;
        let newWallet = parseFloat(
          user["balance"] + sellPrice * quantity - DP_Charges
        );
        newWallet = newWallet.toFixed(2);
        await User.updateOne(
          { name: ownerName },
          {
            balance: newWallet,
          }
        );
        await Transaction.create({
          giver: "Stock-Market",
          receiver: ownerName,
          amount: sellPrice * quantity - DP_Charges,
          transactionTime: new Date(),
          isStockTransaction: true,
          stockName: stockName,
          price: tempPrice,
          quantity: tempQuantity,
          tax: DP_Charges,
        });
        res.status(StatusCodes.OK).json("Sell Success!!");
      }
    } else {
      throw new BadRequestError("Share Doesn't Exist In Your Demat Account!!");
    }
  } catch (e) {
    if (e instanceof BadRequestError) {
      throw new BadRequestError(e.message);
    } else if (e instanceof UnAuthenticatedError) {
      throw new UnAuthenticatedError(e.message);
    } else {
      throw new InternalServerError("Something Went Wrong :(");
    }
  }
};

const getShare = async (req, res) => {
  const queryObject = {
    createdBy: req.user.userId,
  };
  Share.find(queryObject)
    .then((shares) => {
      res.status(StatusCodes.OK).json(shares);
    })
    .catch(() => {
      throw new InternalServerError("Something Went Wrong :(");
    });
};

const getUser = (req, res) => {
  const queryObject = {
    _id: req.user.userId,
  };
  User.find(queryObject, (err, data) => {
    if (err) {
      throw new InternalServerError("Something Went Wrong :(");
    }
    res.status(StatusCodes.OK).json(data);
  });
};

const getOneShare = async (req, res) => {
  const { stockName } = req.body;
  try {
    const share = await Share.findOne({
      stockName,
      createdBy: req.user.userId,
    });
    if (share) {
      res.status(StatusCodes.OK).json(share);
    } else {
      res.status(StatusCodes.OK).json({ msg: "You Don't Own This Stock" });
    }
  } catch (e) {
    throw new InternalServerError("Something Went Wrong :(");
  }
};

export { buy, sell, getUser, getShare, getOneShare };
