const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: String,
  username: String,
  password: String,
});
const infoSchema = new mongoose.Schema({
  username: String,
  description: { type: String, default: "" },
  friends: { type: String, default: "" },
});
const tweetSchema = new mongoose.Schema({
  created_by: String,
  content: String,
  likes: { type: Number, default: 0 },
  created_on: {
    type: Date,
    default: Date.now,
  },
});

const Info = mongoose.model("Info", infoSchema);

const User = mongoose.model("User", userSchema);

const Tweet = mongoose.model("Tweet", tweetSchema);

module.exports = { User, Info, Tweet };
