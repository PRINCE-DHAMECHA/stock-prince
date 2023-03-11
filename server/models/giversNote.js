import mongoose from "mongoose";

const giversNoteSchema = new mongoose.Schema({
  lender: {
    type: String,
    required: [true, "Please provide name"],
    minlength: 3,
    maxlength: 20,
    trim: true,
  },
  principal: {
    type: Number,
    required: [true, "Please provide principal"],
  },
  interest: {
    type: Number,
    required: [true, "Please provide interest"],
  },
  createdBy: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: [true, "Please provide user"],
  },
});

export default mongoose.model("giversNote", giversNoteSchema);
