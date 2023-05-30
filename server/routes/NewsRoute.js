import express from "express";
const router = express.Router();

import { fetchNews } from "../controllers/NewsController.js";
router.route("/getNews").get(fetchNews);

export default router;
