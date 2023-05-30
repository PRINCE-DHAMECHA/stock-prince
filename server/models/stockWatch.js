import mongoose from "mongoose";

const stockWatchSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  stocks: [
    {
      name: {
        type: String,
        required: true,
      },
      symbol: {
        type: String,
        required: true,
      },
      exc: {
        type: String,
        required: true,
      },
    },
  ],
  createdBy: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: [true, "Please provide user"],
  },
});

export default mongoose.model("StockWatch", stockWatchSchema);
