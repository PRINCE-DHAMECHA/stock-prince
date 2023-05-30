import mongoose from "mongoose";

const NewsSchema = new mongoose.Schema({
  newsArr: [
    {
      title: {
        type: String,
      },
      link: {
        type: String,
      },
      description: {
        type: String,
      },
      content: {
        type: String,
      },
    },
  ],
  createDate: { type: Date },
});

export default mongoose.model("News", NewsSchema);
