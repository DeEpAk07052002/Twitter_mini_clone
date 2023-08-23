import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { message } from "antd";
import { useNavigate } from "react-router-dom";
export const updateLikes = createAsyncThunk("updateLikes", async (data) => {
  const response = await axios.post(
    `http://localhost:8080/updateLikes/${data.id}/${data.likes}`,
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
    builder.addCase(updateLikes.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(updateLikes.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
    });
    builder.addCase(updateLikes.rejected, (state, action) => {
      state.isError = true;
      //   console.log("Error", action.payload);
    });
  },
});

export default registerSlice.reducer;
