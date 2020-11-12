import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IFolder, ISimpleSnippet, ISnippet, ITag } from "../../models";
import { AppThunk } from "../store";
import { languages } from "../../constants";
import { v4 as uuidv4 } from "uuid";

interface ISnippetReducer {
  snippets: ISnippet[];
  folders: IFolder[];
  tags: ITag[];
  languages: string[];
  selectedSnippet: ISnippet | null;
}

const initailState: ISnippetReducer = {
  snippets: [],
  folders: [],
  tags: [],
  languages: languages,
  selectedSnippet: null,
};

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
    addFolder: (state, action: PayloadAction<IFolder>) => {
      state.folders = [...state.folders, action.payload];
    },
    addTag: (state, action: PayloadAction<ITag>) => {
      state.tags = [...state.tags, action.payload];
    },
  },
});

export const {
  addSnippet,
  setSelectedSnippet,
  addFolder,
  addTag,
} = snippetSlice.actions;

export default snippetSlice.reducer;

// Thunk Actions
export const createSnippet = (newSnippet: ISimpleSnippet): AppThunk => async (
  dispatch
) => {
  try {
    dispatch(
      addSnippet({
        ...newSnippet,
        id: uuidv4(),
        is_favourite: false,
        created_at: new Date().getTime(),
        updated_at: new Date().getTime(),
      } as ISnippet)
    );
  } catch (err) {}
};

export const createFolder = (newFolder: IFolder): AppThunk => async (
  dispatch
) => {
  try {
    dispatch(addFolder(newFolder));
  } catch (err) {}
};

export const createTag = (newTag: ITag): AppThunk => async (dispatch) => {
  try {
    dispatch(addTag(newTag));
  } catch (err) {}
};
