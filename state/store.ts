import { configureStore } from "@reduxjs/toolkit";
import JobReducer from "./slice";

export const store = configureStore({
  reducer: {
    counter: JobReducer,
  },

});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
