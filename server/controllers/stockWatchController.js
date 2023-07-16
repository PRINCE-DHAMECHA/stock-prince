import axios from "axios";
import { StatusCodes } from "http-status-codes";
import StockWatch from "../models/stockWatch.js";
import { InternalServerError } from "../errors/index.js";
import User from "../models/User.js";

const addWatch = async (req, res) => {
  const { stockName, stockSymbol, exc } = req.body;
  const createdBy = req.user.userId;
  try {
    const user = await User.findById(createdBy);
    const name = user.name;
    const watch = await StockWatch.findOne({ createdBy });
    if (watch) {
      const stockExists = watch.stocks.some(
        (stock) => stock.symbol === stockSymbol && stock.name === stockName
      );
      if (!stockExists) {
        watch.stocks.push({ name: stockName, symbol: stockSymbol, exc });
        await watch.save();
      }
    } else {
      StockWatch.create({
        name,
        stocks: { name: stockName, symbol: stockSymbol, exc },
        createdBy,
      });
    }
    res.status(StatusCodes.ACCEPTED).json({ success: true });
  } catch (e) {
    throw new InternalServerError("Something Went Wrong :(");
  }
};

const removeWatch = async (req, res) => {
  const { stockId } = req.params;
  const createdBy = req.user.userId;
  try {
    const stockWatch = await StockWatch.findOne({ createdBy });
    if (!stockWatch) {
      res.status(404).json({ error: "Stock watch not found" });
    } else {
      const stockIndex = stockWatch.stocks.findIndex(
        (stock) => stock._id.toString() === stockId
      );
      if (stockIndex === -1) {
        res
          .status(StatusCodes.BAD_REQUEST)
          .json({ error: "Stock not found in the stock watch" });
      } else {
        stockWatch.stocks.splice(stockIndex, 1);
        const updatedStockWatch = await stockWatch.save();
        res
          .status(StatusCodes.ACCEPTED)
          .json({ updatedStockWatch, success: true });
      }
    }
  } catch (e) {
    throw new InternalServerError("Something Went Wrong :(");
  }
};

const getWatches = async (req, res) => {
  const createdBy = req.user.userId;
  try {
    const userWatch = await StockWatch.findOne({ createdBy });
    const watches = userWatch.stocks;
    let allWatch = [];
    for (let i of watches) {
      let obj = {};
      await axios
        .get(
          `https://query1.finance.yahoo.com/v6/finance/quoteSummary/${
            i.symbol
          }${i.exc === "NSE" ? ".ns" : ""}?modules=financialData`
        )
        .then((d) => {
          let data = d?.data?.quoteSummary?.result[0]?.financialData;
          obj.currentPrice = data?.currentPrice?.fmt;
          obj.targetHigh = data?.targetHighPrice?.fmt;
          obj.name = i.name;
          obj.symbol = i.symbol;
          obj.exc = i.exc;
          allWatch.push(obj);
        })
        .catch((e) => {
          res.status(StatusCodes.BAD_REQUEST).json({ success: false });
        });
    }
    res.status(StatusCodes.ACCEPTED).json({ watches: allWatch });
  } catch (e) {
    throw new InternalServerError("Something Went Wrong :(");
  }
};

const getOneWatch = async (req, res) => {
  const { stockSymbol } = req.params;
  const { userId } = req.user;
  try {
    const stockWatch = await StockWatch.findOne({ createdBy: userId });
    if (!stockWatch) {
      res.status(404).json({ error: "Stock watch not found" });
    } else {
      const stockIndex = stockWatch.stocks.findIndex(
        (stock) => stock.symbol === stockSymbol
      );
      if (stockIndex === -1) {
        res.status(StatusCodes.ACCEPTED).json({ success: false });
      } else {
        res
          .status(StatusCodes.ACCEPTED)
          .json({ watch: stockWatch.stocks[stockIndex], success: true });
      }
    }
  } catch (e) {
    throw new InternalServerError("Something Went Wrong :(");
  }
};

export { addWatch, removeWatch, getWatches, getOneWatch };
