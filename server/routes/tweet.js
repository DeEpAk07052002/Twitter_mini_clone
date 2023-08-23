const express = require("express");
const router = express.Router();
const { Tweet, User, Info } = require("../models/user");
const jwt = require("jsonwebtoken");
const secretKey = "your-secret-key";
// Import the necessary components and fu
router.post("/postTweet", async (req, res) => {
  let success_message = "";
  const queryData = req.body;
  if (queryData.type == "add") {
    const newTweet = new Tweet({
      created_by: queryData.created_by,
      content: queryData.content,
    });
    const savedTweet = await newTweet.save();
    success_message = "added Successfully";
  } else if (queryData.type == "update") {
    try {
      const updateResult = await Tweet.updateOne(
        { _id: queryData.id },
        { content: queryData.content }
      );
      success_message = "updated Successfully";
      console.log("Friend updated successfully:", updateResult);
    } catch (error) {
      console.error("Error updating friend:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  } else if (queryData.type == "delete") {
    console.log("i am here now");
    Tweet.deleteOne({ _id: queryData.id })
      .then(() => {
        success_message = "Deleted Successfully";
      })
      .catch((err) => {
        // Handle the error here
      });
  }

  res.json({ status: success_message });
});
router.get("/postTweet/:username", async (req, res) => {
  const username = req.params.username;
  const getall = await Tweet.find({}).sort({ created_on: -1 });
  let getfriends = await Info.findOne({ username: username });
  let friends_data = "";
  if (getfriends?.friends) {
    friends_data = getfriends?.friends;
  }
  let friends = friends_data.split(", ");

  let friends_name = [];
  await Promise.all(
    friends.map(async (id) => {
      if (id.length !== 0) {
        const user = await User.findById(id);
        if (user) {
          friends_name.push(user.username);
        }
      }
    })
  );
  console.log("spliting friends", getfriends.friends, username, friends_name);
  //   console.log("this is friends list", friends_name);
  const filtered_all = [];
  await Promise.all(
    getall.map(async (tweet) => {
      if (friends_name.includes(tweet.created_by)) {
        filtered_all.push(tweet);
      }
    })
  );
  res.json(filtered_all);
});

module.exports = router;
