import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = { location: "" };

const navigationSlice = createSlice({
  name: "navigations",
  initialState: initialState,
  reducers: {
    newSnippet: (state, action: PayloadAction) => (state = { location: "new" }),
    editSnippet: (state, action: PayloadAction) =>
      (state = { location: "edit" }),
    discardSnippet: (state, action: PayloadAction) => (state = initialState),
    about: (state, action: PayloadAction) => (state = { location: "about" }),
    settings: (state, action: PayloadAction) =>
      (state = { location: "settings" }),
  },
});

export const {
  newSnippet,
  editSnippet,
  discardSnippet,
  about,
  settings,
} = navigationSlice.actions;

export type NavigationState = ReturnType<typeof navigationSlice.reducer>;

export default navigationSlice.reducer;
