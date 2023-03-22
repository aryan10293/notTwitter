const mongoose = require("mongoose");

const tweetSchema = new mongoose.Schema({
  text: { type: String, unique: true , required: true},
  date: {type: Date, required: true},
  likes: {type: Number, required: true},
  retweets: {type: Number, required: true},
  userId: {type: String, required: true},
  deleted: {type: Boolean, required: true}
});


module.exports = mongoose.model("Tweet", tweetSchema);