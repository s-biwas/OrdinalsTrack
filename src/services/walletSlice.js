import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  response: null,
  error: false,
  addresses: null,
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
    updateAddresses(state, action) {
      state.addresses = action.payload;
    },
    clearResponse(state) {
      state.response = null;
      state.addresses = null;
    },
  },
});

export const { updateResponse, updateError, clearResponse, updateAddresses } =
  walletSlice.actions;
export default walletSlice.reducer;
