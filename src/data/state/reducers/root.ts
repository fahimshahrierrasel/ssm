import { combineReducers } from "@reduxjs/toolkit";

import navigationReducer from "./navigation";
import snippetReducer from "./snippet";

export const rootReducer = combineReducers({
  navigation: navigationReducer,
  snippets: snippetReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
