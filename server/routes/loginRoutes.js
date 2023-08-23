const express = require("express");
const router = express.Router();
const { User } = require("../models/user");
const jwt = require("jsonwebtoken");
const secretKey = "your-secret-key";
// Import the necessary components and functions

router.post("/login", async (req, res) => {
  const queryData = req.body;
  const allUsers = await User.find({});

  let b = false;
  let data;
  allUsers.map((user) => {
    if (user.email == queryData.email && user.password == queryData.password) {
      b = true;
      data = user;
    }
  });

  let return_val;
  if (b === false) {
    return_val = { status: "Emailid or Password Incrorrect" };
  } else {
    const token = jwt.sign(queryData, secretKey, { expiresIn: "1h" });
    return_val = { status: "success", token: token, user: data };
  }
  res.json(return_val);
});

module.exports = router;
