import express from "express";
const router = express.Router();

import { assetProfle, priceChart } from "../controllers/stockCOntroller.js";
router.route("/assetProfile").post(assetProfle);
router.route("/priceChart").post(priceChart);

export default router;
