import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
export const allUser = createAsyncThunk("allUser", async () => {
  // console.log("this data transmitted", data);
  let token = localStorage.getItem("access_token");
  const response = await axios.get(
    "https://twitter-clone-4.onrender.com/getUser",
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // Include the JWT token here
      },
    }
  );
  console.log("this is response", response);
  return response.data;
});

const registerSlice = createSlice({
  name: "allUser",
  initialState: {
    isLoading: false,
    data: null,
    isError: false,
  },
  extraReducers: (builder) => {
    builder.addCase(allUser.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(allUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
    });
    builder.addCase(allUser.rejected, (state, action) => {
      state.isError = true;
      //   console.log("Error", action.payload);
    });
  },
});

export default registerSlice.reducer;
