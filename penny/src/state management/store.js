import userReducer from "./userSlice.js";
import globalReducer from "./globalSlice.js";

import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
  reducer: {
    user: userReducer,
    global: globalReducer,
  },
});

export default store;
