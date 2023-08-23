import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
export const postTweet = createAsyncThunk("postTweet", async (data) => {
  // console.log("this data transmitted", data);
  // let id = localStorage.getItem("user_id");
  console.log("this is data for post tweet", data);
  const response = await axios.post(`http://localhost:8080/postTweet`, data, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  console.log("this is response from posttweet", response);
  return response.data;
});

const registerSlice = createSlice({
  name: "postTweet",
  initialState: {
    isLoading: false,
    data: null,
    isError: false,
  },
  extraReducers: (builder) => {
    builder.addCase(postTweet.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(postTweet.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
    });
    builder.addCase(postTweet.rejected, (state, action) => {
      state.isError = true;
      //   console.log("Error", action.payload);
    });
  },
});

export default registerSlice.reducer;
