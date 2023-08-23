import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
export const allUser = createAsyncThunk("allUser", async () => {
  // console.log("this data transmitted", data);
  const response = await axios.get("http://localhost:8080/getUser", {
    headers: {
      "Content-Type": "application/json",
    },
  });
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
