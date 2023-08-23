const express = require("express");
const router = express.Router();
const { Tweet, User, Info } = require("../models/user");
const jwt = require("jsonwebtoken");
const secretKey = "your-secret-key";
router.get("/getTweetsbyname/:username", async (req, res) => {
  const username = req.params.username;

  const getall = await Tweet.find({ created_by: username }).sort({
    created_on: -1,
  });
  console.log("this is username in getTweetsbyname", username, getall);
  res.json(getall);
});

module.exports = router;
