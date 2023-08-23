const express = require("express");
const router = express.Router();
const { User, Info } = require("../models/user");
const jwt = require("jsonwebtoken");
const secretKey = "your-secret-key";
// Import the necessary components and fu
router.post("/updateFriend", async (req, res) => {
  const { name, friends_list } = req.body;
  console.log("this is friend list", friends_list, name);

  try {
    const updateResult = await Info.updateOne(
      { username: name },
      { friends: friends_list }
    );

    console.log("Friend updated successfully:", updateResult);
    res.json(friends_list);
  } catch (error) {
    console.error("Error updating friend:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
