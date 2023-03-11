import mongoose from "mongoose";

const ShareSchema = new mongoose.Schema({
  ownerName: {
    type: String,
    required: [true, "Please provide name"],
    minlength: 3,
    maxlength: 20,
    trim: true,
  },
  stockName: {
    type: String,
    required: [true, "Please provide name"],
    minlength: 3,
    maxlength: 20,
    trim: true,
  },
  price: {
    type: Number,
  },
  tax: {
    type: Number,
  },
  quantity: {
    type: Number,
  },
  buyTime: {
    type: Date,
  },
  createdBy: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: [true, "Please provide user"],
  },
});

export default mongoose.model("Share", ShareSchema);
