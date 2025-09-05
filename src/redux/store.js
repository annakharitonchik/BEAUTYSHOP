import { configureStore } from "@reduxjs/toolkit";
import shopDataReducer from "./beautyItemsSlice.js";
export const store = configureStore({
  reducer: {
    shopData: shopDataReducer,
  },
  // the thunk middleware adds automatically
});
