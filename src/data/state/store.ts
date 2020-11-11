import { configureStore, getDefaultMiddleware, Action } from "@reduxjs/toolkit";
import { rootReducer, RootState } from "./reducers";
import { ThunkAction } from "redux-thunk";

const store = configureStore({
  middleware: getDefaultMiddleware(),
  reducer: rootReducer,
});

export type AppDispatch = typeof store.dispatch;

export type AppThunk = ThunkAction<void, RootState, unknown, Action<string>>;

export default store;
