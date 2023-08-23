const express = require("express");
const router = express.Router();
const { User, Info, Tweet } = require("../models/user");
const jwt = require("jsonwebtoken");
const secretKey = "your-secret-key";
// Import the necessary components and fu
router.post("/updateLikes/:id/:likes", async (req, res) => {
  const id = req.params.id;
  const likes = req.params.likes;
  try {
    const updateResult = await Tweet.updateOne({ _id: id }, { likes: likes });
  } catch (error) {
    console.error("Error updating friend:", error);
    res.status(500).json({ error: "Internal server error" });
  }
  res.json(likes);
});

module.exports = router;
