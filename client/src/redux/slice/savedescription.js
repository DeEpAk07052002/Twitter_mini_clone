import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
export const savedescription = createAsyncThunk(
  "savedescription",
  async (data) => {
    // console.log("this data transmitted", data);
    // let id = localStorage.getItem("user_id");
    console.log("this is data for post tweet", data);
    const response = await axios.post(
      `https://twitter-clone-4.onrender.com/savedescription`,
      data,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log("this is response from savedescription", response);
    return response.data;
  }
);

const registerSlice = createSlice({
  name: "savedescription",
  initialState: {
    isLoading: false,
    data: null,
    isError: false,
  },
  extraReducers: (builder) => {
    builder.addCase(savedescription.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(savedescription.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
    });
    builder.addCase(savedescription.rejected, (state, action) => {
      state.isError = true;
      //   console.log("Error", action.payload);
    });
  },
});

export default registerSlice.reducer;
