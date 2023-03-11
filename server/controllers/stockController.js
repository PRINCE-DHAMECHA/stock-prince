import axios from "axios";
import { StatusCodes } from "http-status-codes";

const assetProfle = async (req, res) => {
  const { symbol } = req.body;
  let obj = {};
  await axios
    .get(
      `https://query1.finance.yahoo.com/v10/finance/quoteSummary/${symbol}.ns?modules=assetProfile`
    )
    .then((d) => {
      let data = d.data.quoteSummary.result[0].assetProfile;
      obj.address = data.address1;
      obj.website = data.website;
      obj.sector = data.sector;
      obj.about = data.longBusinessSummary;
      obj.employeesCount = data.fullTimeEmployees;
    });
  await axios
    .get(
      `https://query1.finance.yahoo.com/v10/finance/quoteSummary/${symbol}.ns?modules=financialData`
    )
    .then((d) => {
      let data = d.data.quoteSummary.result[0].financialData;
      obj.currentPrice = data.currentPrice.fmt;
      obj.targetHigh = data.targetHighPrice.fmt;
      obj.targetLow = data.targetLowPrice.fmt;
      obj.recommendation = data.recommendationKey;
    })
    .catch((e) => {
      console.log(e);
    });
  res.json(obj);
};
const priceChart = async (req, res) => {
  const { symbol } = req.body;
  let obj = {};
  await axios
    .get(
      `https://query1.finance.yahoo.com/v8/finance/chart/${symbol}.ns?metrics=high?&interval=1mo&range=6mo`
    )
    .then((d) => {
      let time = d.data.chart.result[0].timestamp;
      let price = d.data.chart.result[0].indicators.quote[0].close;
      let arr = [];
      for (let i = 0; i < time.length; i++) {
        var d = new Date(0);
        d.setUTCSeconds(time[i]);
        let temp = {};
        temp.date = d;
        temp.price = price[i].toFixed(2);
        arr.push(temp);
      }
      obj.sixMonthPrice = arr;
    });
  await axios
    .get(
      `https://query1.finance.yahoo.com/v8/finance/chart/${symbol}.ns?metrics=high?&interval=5d&range=1mo`
    )
    .then((d) => {
      let time = d.data.chart.result[0].timestamp;
      let price = d.data.chart.result[0].indicators.quote[0].close;
      let arr = [];
      for (let i = 0; i < time.length; i++) {
        var d = new Date(0);
        d.setUTCSeconds(time[i]);
        let temp = {};
        temp.date = d;
        temp.price = price[i].toFixed(2);
        arr.push(temp);
      }
      obj.monthPrice = arr;
    });
  await axios
    .get(
      `https://query1.finance.yahoo.com/v8/finance/chart/${symbol}.ns?metrics=high?&interval=1d&range=1wk`
    )
    .then((d) => {
      let time = d.data.chart.result[0].timestamp;
      let price = d.data.chart.result[0].indicators.quote[0].close;
      let arr = [];
      for (let i = 0; i < time.length; i++) {
        var d = new Date(0);
        d.setUTCSeconds(time[i]);
        let temp = {};
        temp.date = d;
        temp.price = price[i].toFixed(2);
        arr.push(temp);
      }
      obj.weekPrice = arr;
    });
  await axios
    .get(
      `https://query1.finance.yahoo.com/v8/finance/chart/${symbol}.ns?metrics=high?&interval=30m&range=1d`
    )
    .then((d) => {
      let time = d.data.chart.result[0].timestamp;
      let price = d.data.chart.result[0].indicators.quote[0].close;
      let arr = [];
      for (let i = 0; i < time.length; i++) {
        var d = new Date(0);
        d.setUTCSeconds(time[i]);
        let temp = {};
        temp.date = d;
        temp.price = price[i].toFixed(2);
        arr.push(temp);
      }
      obj.dayPrice = arr;
    });
  res.json(obj);
};
export { assetProfle, priceChart };
