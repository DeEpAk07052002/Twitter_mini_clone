import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
export const userDetails = createAsyncThunk("userDetails", async () => {
  // console.log("this data transmitted", data);
  let id = localStorage.getItem("user_id");
  console.log("this is id", id);
  const response = await axios.get(`http://localhost:8080/userInfo/${id}`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  console.log("this is response", response);
  return response.data;
});

const registerSlice = createSlice({
  name: "userDetails",
  initialState: {
    isLoading: false,
    data: null,
    isError: false,
  },
  extraReducers: (builder) => {
    builder.addCase(userDetails.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(userDetails.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
    });
    builder.addCase(userDetails.rejected, (state, action) => {
      state.isError = true;
      //   console.log("Error", action.payload);
    });
  },
});

export default registerSlice.reducer;
