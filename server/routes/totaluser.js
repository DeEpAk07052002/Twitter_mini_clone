const express = require("express");
const router = express.Router();
const { User } = require("../models/user");
const jwt = require("jsonwebtoken");
const secretKey = "your-secret-key";
// Import the necessary components and fu
router.get("/getUser", async (req, res) => {
  const allUsers = await User.find({});
  console.log("allUsers data", allUsers);
  res.json(allUsers);
});

module.exports = router;
