import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { message } from "antd";
import { useNavigate } from "react-router-dom";
export const adduser = createAsyncThunk("adduser", async (data) => {
  console.log("this data transmitted", data);
  const response = await axios.post(
    "https://twitter-clone-4.onrender.com/register",
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
  name: "register",
  initialState: {
    isLoading: false,
    data: null,
    isError: false,
  },
  extraReducers: (builder) => {
    builder.addCase(adduser.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(adduser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
    });
    builder.addCase(adduser.rejected, (state, action) => {
      state.isError = true;
      //   console.log("Error", action.payload);
    });
  },
});

export default registerSlice.reducer;
