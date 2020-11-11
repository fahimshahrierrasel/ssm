import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = { location: "", loading: false };

const navigationSlice = createSlice({
  name: "navigations",
  initialState: initialState,
  reducers: {
    newSnippet: (state, action: PayloadAction) => {
      state.location = "new";
    },
    editSnippet: (state, action: PayloadAction) => {
      state.location = "edit";
    },
    discardSnippet: (state, action: PayloadAction) => {
      state.location = "";
    },
    about: (state, action: PayloadAction) => {
      state.location = "about";
    },
    settings: (state, action: PayloadAction) => {
      state.location = "settings";
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
  newSnippet,
  editSnippet,
  discardSnippet,
  about,
  settings,
  showLoader,
  hideLoader,
} = navigationSlice.actions;

export default navigationSlice.reducer;
