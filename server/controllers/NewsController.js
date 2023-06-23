import News from "../models/News.js";
import { StatusCodes } from "http-status-codes";
import axios from "axios";
import BadRequestError from "../errors/bad-request.js";
import InternalServerError from "../errors/server-error.js";

const fetchNews = async (req, res) => {
  let arr = [];
  let dateNow = new Date();
  try {
    let dataOld = await News.find({});
    if (dataOld.length !== 0) {
      dataOld = dataOld[0];
      let dateDB = new Date(dataOld.createDate);
      if (
        dateDB.toISOString().substring(0, 10) ===
        dateNow.toISOString().substring(0, 10)
      ) {
        res
          .status(StatusCodes.ACCEPTED)
          .json({ success: true, resNews: dataOld });
        return;
      }
    }
    await News.findOneAndDelete({ _id: dataOld._id });
    let data = await axios.get(
      "https://newsdata.io/api/1/news?apikey=pub_226996b12d82f7d8a591035fbbbbd8c764c44&qintitle=nse OR bse&language=EN&country=IN"
    );
    for (let res of data.data.results) {
      if (res.title && res.description) {
        let obj = {};
        obj.title = res?.title;
        obj.link = res?.link;
        obj.description = res?.description;
        obj.content = res?.content;
        arr.push(obj);
      }
    }
    data = await axios.get(
      "https://newsdata.io/api/1/news?apikey=pub_226996b12d82f7d8a591035fbbbbd8c764c44&qintitle=nifty&language=EN&country=IN"
    );
    for (let res of data.data.results) {
      let obj = {};
      obj.title = res?.title;
      obj.link = res?.link;
      obj.description = res?.description;
      obj.content = res?.content;
      arr.push(obj);
    }
    data = await axios.get(
      "https://newsdata.io/api/1/news?apikey=pub_226996b12d82f7d8a591035fbbbbd8c764c44&q=fmcg&language=EN&country=IN"
    );
    for (let res of data.data.results) {
      let obj = {};
      obj.title = res?.title;
      obj.link = res?.link;
      obj.description = res?.description;
      obj.content = res?.content;
      arr.push(obj);
    }
    data = await axios.get(
      "https://newsdata.io/api/1/news?apikey=pub_226996b12d82f7d8a591035fbbbbd8c764c44&qintitle=motor&language=EN&country=IN"
    );
    for (let res of data.data.results) {
      let obj = {};
      obj.title = res?.title;
      obj.link = res?.link;
      obj.description = res?.description;
      obj.content = res?.content;
      arr.push(obj);
    }
    data = await axios.get(
      "https://newsdata.io/api/1/news?apikey=pub_226996b12d82f7d8a591035fbbbbd8c764c44&qintitle=bank&language=EN&country=IN"
    );
    for (let res of data.data.results) {
      let obj = {};
      obj.title = res?.title;
      obj.link = res?.link;
      obj.description = res?.description;
      obj.content = res?.content;
      arr.push(obj);
    }
    data = await axios.get(
      "https://newsdata.io/api/1/news?apikey=pub_226996b12d82f7d8a591035fbbbbd8c764c44&qintitle=finance&category=business&language=EN&country=IN"
    );
    for (let res of data.data.results) {
      let obj = {};
      obj.title = res?.title;
      obj.link = res?.link;
      obj.description = res?.description;
      obj.content = res?.content;
      arr.push(obj);
    }
    data = await axios.get(
      "https://newsdata.io/api/1/news?apikey=pub_226996b12d82f7d8a591035fbbbbd8c764c44&q=IT%20Services&language=EN&country=IN&category=business"
    );
    for (let res of data.data.results) {
      let obj = {};
      obj.title = res?.title;
      obj.link = res?.link;
      obj.description = res?.description;
      obj.content = res?.content;
      arr.push(obj);
    }
    data = await axios.get(
      "https://newsdata.io/api/1/news?apikey=pub_226996b12d82f7d8a591035fbbbbd8c764c44&qintitle=steel%20ORenterprise%20OR%20infra%20OR%20metal%20OR%20power&language=EN&country=IN"
    );
    for (let res of data.data.results) {
      let obj = {};
      obj.title = res?.title;
      obj.link = res?.link;
      obj.description = res?.description;
      obj.content = res?.content;
      arr.push(obj);
    }
    let resNews = await News.create({ newsArr: arr, createDate: new Date() });
    res.status(StatusCodes.ACCEPTED).json({ success: true, resNews });
  } catch (e) {
    throw new InternalServerError("Something Went Wrong :(");
  }
};

export { fetchNews };
