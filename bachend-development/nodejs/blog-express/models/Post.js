const mongoose = require("mongoose");
const { Schema } = mongoose;
const postSchema = new Schema(
  {
    title: { type: String, required: true, minLength: 3, maxLength: 100 },
    content: { type: String, required: true, minLength: 10, maxLength: 1000 },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    tags: { type: [String], default: [] },
    comments: [
      {
        author: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          required: true,
        },
        text: { type: String, required: true },
        date: { type: Date, default: Date.now },
      },
    ],
  },
  { timestamps: true }
);

const Post = mongoose.model("Post", postSchema);
module.exports = Post;
