const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  text: { type: String, unique: true , required: true},
  date: {type: Date, required: true},
  likes: {type: Array, required: true},
  retweets: {type: Number, required: true},
  userId: {type: String, required: true},
  name: {type:String, required: true},
  deleted: {type: Boolean, required: true},
  tweetId: {type: String, required: true}
});


module.exports = mongoose.model("Comment", commentSchema);