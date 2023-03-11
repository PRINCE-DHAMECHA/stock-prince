import express from "express";
import path from "path";
const app = express();

import { dirname } from "path";
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));
import dotenv from "dotenv";
dotenv.config();

import "express-async-errors";
import connectDB from "./db/connect.js";

import authRouter from "./routes/authRoutes.js";
import shareRouter from "./routes/shareRoutes.js";
import loanRouter from "./routes/loanRouter.js";
import stockRouter from "./routes/stockRoute.js";
import transactionRouter from "./routes/transactionRoute.js";

import notFoundMiddleware from "./middlewares/not-found.js";
import errorHandlerMiddleware from "./middlewares/error-handler.js";
import authenticateUser from "./middlewares/auth.js";
import cors from "cors";

app.use(cors());
app.use(express.json());
app.use("/auth", authRouter);
app.use("/share", authenticateUser, shareRouter);
app.use("/loan", authenticateUser, loanRouter);
app.use("/account", authenticateUser, transactionRouter);
app.use("/stock", stockRouter);

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () => {
      console.log(`Server is listening on port ${port}...`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
