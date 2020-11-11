import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ISnippet } from "../../models";
import { AppThunk } from "../store";

interface ISnippetReducer {
  snippets: ISnippet[];
  selectedSnippet: ISnippet | null;
}

const initailState: ISnippetReducer = { snippets: [], selectedSnippet: null };

const snippetSlice = createSlice({
  name: "snippets",
  initialState: initailState,
  reducers: {
    addSnippet: (state, action: PayloadAction<ISnippet>) => {
      state.snippets = [...state.snippets, action.payload];
    },
    setSelectedSnippet: (state, action: PayloadAction<string>) => {
      state.selectedSnippet = state.snippets.find(
        (snippet) => snippet.id === action.payload
      ) as ISnippet;
    },
  },
});

export const { addSnippet, setSelectedSnippet } = snippetSlice.actions;

export default snippetSlice.reducer;

// Thunk Actions
export const createSnippet = (newSnippet: ISnippet): AppThunk => async (
  dispatch
) => {
  try {
    setTimeout(() => {
      dispatch(addSnippet(newSnippet));
    }, 5 * 1000);
  } catch (err) {}
};
