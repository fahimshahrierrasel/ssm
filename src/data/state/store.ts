import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { rootReducer } from "./reducers";

const store = configureStore({
  middleware: getDefaultMiddleware(),
  reducer: rootReducer,
});

export type AppDispatch = typeof store.dispatch;

export default store;
