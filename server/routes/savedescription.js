const express = require("express");
const router = express.Router();
const { User, Info, Tweet } = require("../models/user");
const jwt = require("jsonwebtoken");
const secretKey = "your-secret-key";

router.post("/savedescription", async (req, res) => {
  try {
    const data = req.body;

    await Info.updateOne(
      { username: data.username },
      { $set: { description: data.description } }
    );

    console.log("User description updated successfully");
    res.json("success");
  } catch (error) {
    console.error("Error updating user description:", error);
    res
      .status(500)
      .json({ error: "An error occurred while updating user description" });
  }
});

module.exports = router;
