import { configureStore } from "@reduxjs/toolkit";

import companyDataReducer from "./beautyItems.js";

export const store = configureStore({
  reducer: {
    companyData: companyDataReducer,
  },
  // the thunk middleware adds automatically
});
