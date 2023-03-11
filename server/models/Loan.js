import mongoose from "mongoose";

const LoanSchema = new mongoose.Schema({
  lender: {
    type: String,
    required: [true, "Please provide name"],
    minlength: 3,
    maxlength: 20,
    trim: true,
  },
  borrower: {
    type: String,
    required: [true, "Please provide name"],
    minlength: 3,
    maxlength: 20,
    trim: true,
  },
  principal: {
    type: Number,
  },
  interest: {
    type: Number,
  },
  issuedDate: { type: Date },
});

export default mongoose.model("Loan", LoanSchema);
