import { configureStore } from "@reduxjs/toolkit";
import alertReducer from "./slices/alertSlice.js";
import loadingReducer from "./slices/loadingSlice.js";

export const makeStore = () =>
  configureStore({
    reducer: {
      alert: alertReducer,
      loading: loadingReducer,
    },
    devTools: process.env.NODE_ENV === "development",
  });
