const express = require("express");
const router = express.Router();
const { User, Info } = require("../models/user");
const jwt = require("jsonwebtoken");
const secretKey = "your-secret-key";
// Import the necessary components and fu
router.get("/userInfo/:id", async (req, res) => {
  const id = req.params.id;
  const data = await User.findById(id);
  const username = data.username;
  const userinfo = await Info.findOne({ username: username });
  console.log("userInfo", userinfo, username, data, id);
  res.json(userinfo);
});

module.exports = router;
