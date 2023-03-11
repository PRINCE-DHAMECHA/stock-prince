import mongoose from "mongoose";

const TransactionSchema = new mongoose.Schema({
  giver: {
    type: String,
    required: [true, "Please provide name"],
    minlength: 3,
    maxlength: 20,
    trim: true,
  },
  receiver: {
    type: String,
    required: [true, "Please provide name"],
    minlength: 3,
    maxlength: 20,
    trim: true,
  },
  amount: {
    type: Number,
  },
  transactionTime: {
    type: Date,
  },
  isStockTransaction: {
    type: Boolean,
  },
  stockName: {
    type: String,
  },
  price: {
    type: Number,
  },
  quantity: {
    type: Number,
  },
  principal: {
    type: Number,
  },
  interest: {
    type: Number,
  },
  isRepay: {
    type: Boolean,
  },
  tax: {
    type: Number,
  },
});

export default mongoose.model("Transaction", TransactionSchema);
