const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const postSchema = new Schema({
  author: { type: Schema.Types.ObjectId, ref: "User" },
  content: String,
  repliedTo: { type: Schema.Types.ObjectId, ref: "Post"},
  replies: [{ type: Schema.Types.ObjectId, ref: "Post" }],
  thread: { type: Schema.Types.ObjectId, ref: "Thread" },
  snippet: { type: Schema.Types.ObjectId, ref: "Snippet" },
  event: { type: Schema.Types.ObjectId, ref: "Event" },
  date_created: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

const Post = mongoose.model("Post", postSchema);

module.exports = Post;