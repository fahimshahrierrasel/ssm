import { combineReducers } from "@reduxjs/toolkit";

import navigationReducer from "./navigation";

export const rootReducer = combineReducers({
  navigation: navigationReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
