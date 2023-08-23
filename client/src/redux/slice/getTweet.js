import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
export const getTweet = createAsyncThunk("getTweet", async () => {
  // console.log("this data transmitted", data);

  let username = localStorage.getItem("username");
  console.log("this is usernaem of getTweet", username);
  const response = await axios.get(
    `http://localhost:8080/postTweet/${username}`,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  console.log("this is response  from get tweet", response);
  return response.data;
});

const registerSlice = createSlice({
  name: "getTweet",
  initialState: {
    isLoading: false,
    data: null,
    isError: false,
  },
  extraReducers: (builder) => {
    builder.addCase(getTweet.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(getTweet.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
    });
    builder.addCase(getTweet.rejected, (state, action) => {
      state.isError = true;
      //   console.log("Error", action.payload);
    });
  },
});

export default registerSlice.reducer;
