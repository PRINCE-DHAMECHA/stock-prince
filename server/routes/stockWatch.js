import express from "express";
const router = express.Router();

import {
  addWatch,
  removeWatch,
  getWatches,
  getOneWatch,
} from "../controllers/stockWatchController.js";
router.route("/add").post(addWatch);
router.route("/delete/:stockId").delete(removeWatch);
router.route("/getOne/:stockSymbol").get(getOneWatch);
router.route("/get").get(getWatches);

export default router;
