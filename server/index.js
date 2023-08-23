const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const server = express();
const jwt = require("jsonwebtoken");
const secretKey = "your-secret-key";
const registerRoute = require("./routes/RegisterRoutes");
const loginRoute = require("./routes/loginRoutes");
const getUser = require("./routes/totaluser");
const userInfo = require("./routes/userinfo");
const updateFriend = require("./routes/friends");
const tweet = require("./routes/tweet");
const updateLikes = require("./routes/updateLikes");
const alldetails = require("./routes/alldetails");
const savedescription = require("./routes/savedescription");
const getTweetsbyname = require("./routes/getTweetsbyname");
const path = require("path");
server.use(cors());
server.use(bodyParser.json());
let uri =
  "mongodb+srv://deepakugpta0705:OirDdOHR8FII2ZDh@cluster0.qdfk76t.mongodb.net/?retryWrites=true&w=majority";
main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect(uri);
  console.log("db connected");
}
server.use(registerRoute);
server.use(loginRoute);
server.use(getUser);
server.use(userInfo);
server.use(updateFriend);
server.use(tweet);
server.use(updateLikes);
server.use(alldetails);
server.use(savedescription);
server.use(getTweetsbyname);
const PORT = process.env.PORT || 8080;

server.listen(PORT, () => {
  console.log("server started");
});
