import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { navigationsPath } from "../../constants";

const initialState = { location:navigationsPath.SIGN_IN, loading: false };

const navigationSlice = createSlice({
  name: "navigations",
  initialState: initialState,
  reducers: {
    login: (state, action: PayloadAction) => {
      state.location = navigationsPath.SIGN_IN
    },
    snippetHome: (state, action: PayloadAction) => {
      state.location = navigationsPath.APP;
    },
    snippetForm: (state, action: PayloadAction) => {
      state.location = navigationsPath.FORM;
    },
    about: (state, action: PayloadAction) => {
      state.location = navigationsPath.ABOUT;
    },
    settings: (state, action: PayloadAction) => {
      state.location = navigationsPath.SETTINGS;
    },
    showLoader: (state, action: PayloadAction) => {
      state.loading = true;
    },
    hideLoader: (state, action: PayloadAction) => {
      state.loading = false;
    },
  },
});

export const {
  snippetForm,
  snippetHome,
  about,
  settings,
  showLoader,
  hideLoader,
} = navigationSlice.actions;

export default navigationSlice.reducer;
