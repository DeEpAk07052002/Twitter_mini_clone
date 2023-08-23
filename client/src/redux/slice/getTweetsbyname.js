import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
export const getTweetsbyname = createAsyncThunk(
  "getTweetsbyname",
  async (data) => {
    // console.log("this data transmitted", data);

    let username = data.username;
    console.log("this is username ", username);
    console.log("this is usernaem of getTweetsbyname", username);
    const response = await axios.get(
      `http://localhost:8080/getTweetsbyname/${username}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log("this is response  from get tweet", response);
    return response.data;
  }
);

const registerSlice = createSlice({
  name: "getTweetsbyname",
  initialState: {
    isLoading: false,
    data: null,
    isError: false,
  },
  extraReducers: (builder) => {
    builder.addCase(getTweetsbyname.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(getTweetsbyname.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
    });
    builder.addCase(getTweetsbyname.rejected, (state, action) => {
      state.isError = true;
      //   console.log("Error", action.payload);
    });
  },
});

export default registerSlice.reducer;
