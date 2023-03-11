import express from "express";
const router = express.Router();

import { getTransactions, pay } from "../controllers/transactionController.js";
router.route("/getTransaction").get(getTransactions);
router.route("/pay").get(pay);

export default router;
