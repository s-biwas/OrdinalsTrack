import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  inputAddress:
    "bc1pgfmx47uegje06trqpd8szclsxhk5twsy46xmrydm32f42eajhvzsdk38ce",
};
const exploreSlice = createSlice({
  name: "explore",
  initialState,
  reducers: {
    updateInputAddress(state, action) {
      state.inputAddress = action.payload;
    },
  },
});

export const { updateInputAddress } = exploreSlice.actions;
export default exploreSlice.reducer;
