import express from "express";
const router = express.Router();

import { assetProfile, priceChart } from "../controllers/stockController.js";
router.route("/priceChart").post(priceChart);
router.route("/assetProfile").post(assetProfile);

export default router;
