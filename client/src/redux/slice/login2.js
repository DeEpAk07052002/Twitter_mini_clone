import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
export const checkuser = createAsyncThunk("checkuser", async (data) => {
  console.log("this is data before sending", data);
  const response = await axios.post("http://localhost:8080/login", data, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  console.log("this is response checkuser", response);
  return response.data;
});
const loginSlice = createSlice({
  name: "login",
  initialState: {
    isLoading: false,
    data: null,
    isError: false,
  },
  extraReducers: (builder) => {
    builder.addCase(checkuser.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(checkuser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
    });
    builder.addCase(checkuser.rejected, (state, action) => {
      state.isError = true;
      //   console.log("Error", action.payload);
    });
  },
});
export default loginSlice.reducer;
