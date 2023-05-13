import express from "express";
const router = express.Router();

import { assetProfile, priceChart } from "../controllers/stockController.js";
router.route("/assetProfile").post(assetProfile);
router.route("/priceChart").post(priceChart);

export default router;
