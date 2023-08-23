const express = require("express");
const router = express.Router();
const { User, Info } = require("../models/user");
const jwt = require("jsonwebtoken");
const secretKey = "your-secret-key";
// Import the necessary components and functions

router.post("/register", async (req, res) => {
  const queryData = req.body;
  const allUsers = await User.find({});
  let b = true;
  allUsers.map((user) => {
    if (
      queryData.email === user.email ||
      queryData.username === user.username
    ) {
      b = false;
    }
  });
  let return_val;
  if (b == false) {
    return_val = { status: "Emailid or name already in use" };
  }
  console.log("queryData", queryData, allUsers, b);
  if (b == true) {
    const newUser = new User(queryData);
    const savedUser = await newUser.save();
    const name = queryData.username;
    const newInfo = new Info({ username: name });
    await newInfo.save();

    // console.log("saved_user",savedUser)
    const newUserId = savedUser._id;
    const newUsername = savedUser.username;
    const token = jwt.sign(queryData, secretKey, { expiresIn: "1h" });
    return_val = {
      status: "success",
      token: token,
      user: { id: newUserId, username: newUsername },
    };
  }

  res.json(return_val);
});

module.exports = router;
