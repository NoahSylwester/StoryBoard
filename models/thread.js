const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const threadSchema = new Schema({
  title: { type: String, required: true },
  author: { type: Schema.Types.ObjectId, ref: "User" },
  content: String,
  topics: { type: Array, required: true },
  posts: [{ type: Schema.Types.ObjectId, ref: "Post" }],
  lastActivity: {
    type: Date,
    required: true,
    default: Date.now,
  },
  date_created: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

const Thread = mongoose.model("Thread", threadSchema);

module.exports = Thread;