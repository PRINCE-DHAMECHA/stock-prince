import axios from "axios";
import { StatusCodes } from "http-status-codes";

const assetProfile = async (req, res) => {
  const { symbol, isIndian } = req.body;
  let obj = {};
  try {
    let data = await axios.get(
      `https://query1.finance.yahoo.com/v6/finance/quoteSummary/${symbol}${
        isIndian ? ".ns" : ""
      }?modules=assetProfile`
    );
    data = data?.data?.quoteSummary?.result[0]?.assetProfile;
    obj.address = data?.address1;
    obj.website = data?.website;
    obj.sector = data?.sector;
    obj.about = data?.longBusinessSummary;
    obj.employeesCount = data?.fullTimeEmployees;
    data = await axios.get(
      `https://query1.finance.yahoo.com/v6/finance/quoteSummary/${symbol}${
        isIndian ? ".ns" : ""
      }?modules=financialData`
    );
    data = data?.data?.quoteSummary?.result[0]?.financialData;
    obj.currentPrice = data?.currentPrice?.fmt;
    obj.targetHigh = data?.targetHighPrice?.fmt;
    obj.targetLow = data?.targetLowPrice?.fmt;
    obj.recommendation = data?.recommendationKey;
  } catch (e) {
    console.log(e);
  }
  res.json(obj);
};

const priceChart = async (req, res) => {
  const { symbol, isIndian } = req.body;
  let obj = {};
  try {
    let data = await axios.get(
      `https://query1.finance.yahoo.com/v8/finance/chart/${symbol}${
        isIndian ? ".ns" : ""
      }?metrics=high?&interval=1mo&range=6mo`
    );
    let time = data?.data?.chart?.result[0]?.timestamp;
    let price = data?.data?.chart?.result[0]?.indicators?.quote[0]?.close;
    let arr = [];
    for (let i = 0; i < time?.length; i++) {
      var dt = new Date(0);
      dt.setUTCSeconds(time[i]);
      let temp = {};
      temp.date = dt;
      temp.price = price[i]?.toFixed(2);
      arr.push(temp);
    }
    obj.sixMonthPrice = arr;
    data = await axios.get(
      `https://query1.finance.yahoo.com/v8/finance/chart/${symbol}${
        isIndian ? ".ns" : ""
      }?metrics=high?&interval=5d&range=1mo`
    );
    time = data?.data?.chart?.result[0]?.timestamp;
    price = data?.data?.chart?.result[0]?.indicators?.quote[0]?.close;
    arr = [];
    for (let i = 0; i < time.length; i++) {
      var dt = new Date(0);
      dt.setUTCSeconds(time[i]);
      let temp = {};
      temp.date = dt;
      temp.price = price[i]?.toFixed(2);
      arr.push(temp);
    }
    obj.monthPrice = arr;
    data = await axios.get(
      `https://query1.finance.yahoo.com/v8/finance/chart/${symbol}${
        isIndian ? ".ns" : ""
      }?metrics=high?&interval=1d&range=1wk`
    );
    time = data?.data?.chart?.result[0]?.timestamp;
    price = data?.data?.chart?.result[0]?.indicators?.quote[0]?.close;
    arr = [];
    for (let i = 0; i < time.length; i++) {
      var dt = new Date(0);
      dt.setUTCSeconds(time[i]);
      let temp = {};
      temp.date = dt;
      temp.price = price[i]?.toFixed(2);
      arr.push(temp);
    }
    obj.weekPrice = arr;
    data = await axios.get(
      `https://query1.finance.yahoo.com/v8/finance/chart/${symbol}${
        isIndian ? ".ns" : ""
      }?metrics=high?&interval=30m&range=1d`
    );
    time = data?.data?.chart?.result[0]?.timestamp;
    price = data?.data?.chart?.result[0]?.indicators?.quote[0]?.close;
    arr = [];
    for (let i = 0; i < time.length; i++) {
      var dt = new Date(0);
      dt.setUTCSeconds(time[i]);
      let temp = {};
      temp.date = dt;
      temp.price = price[i]?.toFixed(2);
      arr.push(temp);
    }
    obj.dayPrice = arr;
  } catch (e) {
    console.log(e);
  }
  res.json(obj);
};
export { assetProfile, priceChart };
