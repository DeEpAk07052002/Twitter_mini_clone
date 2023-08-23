import { configureStore } from "@reduxjs/toolkit";
import registerReducer from "./slice/login";
import loginReducer from "./slice/login2";
import allUserReducer from "./slice/allUser";
import userDetailsReducer from "./slice/userDetails";
import updateFriendReducer from "./slice/friends";
import postTweetReducer from "./slice/postTweet";
import getTweetReducer from "./slice/getTweet";
import updateLikesReducer from "./slice/updateLikes";
import alldetailsReducer from "./slice/alldetails";
import savedescriptionReducer from "./slice/savedescription";
import getTweetsbynameReducer from "./slice/getTweetsbyname";
export const store = configureStore({
  reducer: {
    register: registerReducer,
    login: loginReducer,
    allUser: allUserReducer,
    userDetails: userDetailsReducer,
    updateFriend: updateFriendReducer,
    postTweet: postTweetReducer,
    getTweet: getTweetReducer,
    updateLike: updateLikesReducer,
    alldetails: alldetailsReducer,
    savedescription: savedescriptionReducer,
    getTweetsbyname: getTweetsbynameReducer,
  },
});
