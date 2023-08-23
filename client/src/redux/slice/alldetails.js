import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
export const alldetails = createAsyncThunk("alldetails", async (data) => {
  // console.log("this data transmitted", data);
  const username = data.username;

  const response = await axios.get(
    `http://localhost:8080/alldetails/${username}`,
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
  name: "alldetails",
  initialState: {
    isLoading: false,
    data: null,
    isError: false,
  },
  extraReducers: (builder) => {
    builder.addCase(alldetails.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(alldetails.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
    });
    builder.addCase(alldetails.rejected, (state, action) => {
      state.isError = true;
      //   console.log("Error", action.payload);
    });
  },
});

export default registerSlice.reducer;
