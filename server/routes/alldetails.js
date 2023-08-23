const express = require("express");
const router = express.Router();
const { User, Info } = require("../models/user");
const jwt = require("jsonwebtoken");
const secretKey = "your-secret-key";
// Import the necessary components and fu
router.get("/alldetails/:username", async (req, res) => {
  const username = req.params.username;
  const user = await User.findOne({ username: username });
  const id = user._id.toString();
  console.log("this is id", id);
  const data = await Info.find({});
  let followerscnt = 0,
    followingcnt = 0,
    description = "";
  data?.map((data) => {
    if (data.username == username) {
      console.log("this is string of data", data.friends);
      followerscnt += data.friends.split(", ").length - 1;
      description = data.description;
    } else {
      followingcnt += data.friends.split(", ").includes(id) ? 1 : 0;
    }
  });
  const userInfo = {
    followerscnt: followerscnt,
    followingcnt: followingcnt,
    description: description,
  };
  res.json(userInfo);
});

module.exports = router;
