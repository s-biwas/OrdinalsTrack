import { configureStore } from "@reduxjs/toolkit";
import walletReducer from "./services/walletSlice";

const store = configureStore({
  reducer: {
    wallet: walletReducer,
  },
});

export default store;
