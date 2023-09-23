import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  response: null,
  error: false,
};
const walletSlice = createSlice({
  name: "wallet",
  initialState,
  reducers: {
    updateResponse(state, action) {
      state.response = action.payload;
    },
    updateError(state, action) {
      state.error = action.payload;
    },
    clearResponse(state) {
      state.response = null;
    },
  },
});

export const { updateResponse, updateError, clearResponse } =
  walletSlice.actions;
export default walletSlice.reducer;
