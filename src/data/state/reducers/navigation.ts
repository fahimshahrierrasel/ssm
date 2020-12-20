import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { navigationsPath } from "../../constants";

const initialState = { location: navigationsPath.APP };

const navigationSlice = createSlice({
  name: "navigations",
  initialState: initialState,
  reducers: {
    snippetHome: (state, action: PayloadAction) => {
      state.location = navigationsPath.APP;
    },
    preferences: (state, action: PayloadAction) => {
      state.location = navigationsPath.PREFERENCES;
    },
  },
});

export const { snippetHome, preferences } = navigationSlice.actions;

export default navigationSlice.reducer;
