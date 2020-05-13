const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const eventSchema = new Schema({
  title: { type: String, required: true },
  author: { type: Schema.Types.ObjectId, ref: "User" },
  date: { type: Date, required: true },
  content: String,
  topics: { type: Array, required: true },
  posts: [{ type: Schema.Types.ObjectId, ref: "Post" }],
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
  quarantined: { type: Boolean, required: true, default: true }
});

const Event = mongoose.model("Event", eventSchema);

module.exports = Event;