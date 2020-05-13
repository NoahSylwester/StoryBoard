const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const snippetSchema = new Schema({
  title: { type: String, required: true },
  author: { type: Schema.Types.ObjectId, ref: "User" },
  content: {
    type: String,
    required: false,
  },
  topics: { type: Array, required: true },
  snippetType: {
    type: String,
    required: true,
    default: "text"
  },
  contentType: {
    type: String,
  },
  image: {
    type: Buffer,
    required: false,
  },
  date_created: {
    type: Date,
    required: true,
    default: Date.now,
  },
  lastActivity: {
    type: Date,
    required: true,
    default: Date.now,
  },
  posts: [{ type: Schema.Types.ObjectId, ref: "Post" }],
  quarantined: { type: Boolean, required: true, default: true }
});

const Snippet = mongoose.model("Snippet", snippetSchema);

module.exports = Snippet;