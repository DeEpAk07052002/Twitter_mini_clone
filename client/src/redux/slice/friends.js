import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
export const updateFriend = createAsyncThunk("updateFriend", async (data) => {
  // console.log("this data transmitted", data);
  const response = await axios.post(
    `https://twitter-clone-4.onrender.com/updateFriend`,
    data,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  console.log("this is response", response);
  return response.data;
});

const registerSlice = createSlice({
  name: "updateFriend",
  initialState: {
    isLoading: false,
    data: null,
    isError: false,
  },
  extraReducers: (builder) => {
    builder.addCase(updateFriend.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(updateFriend.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
    });
    builder.addCase(updateFriend.rejected, (state, action) => {
      state.isError = true;
      //   console.log("Error", action.payload);
    });
  },
});

export default registerSlice.reducer;
