import { configureStore } from "@reduxjs/toolkit";
import walletReducer from "./services/walletSlice";
import exploreReducer from "./services/exploreSlice";

const store = configureStore({
  reducer: {
    wallet: walletReducer,
    explore: exploreReducer,
  },
});

export default store;
