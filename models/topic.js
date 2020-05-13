const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const topicSchema = new Schema({
  keyword: String,
  date_created: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

const Topic = mongoose.model("Topic", topicSchema);

module.exports = Topic;