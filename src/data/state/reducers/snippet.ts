import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IFolder, ISimpleSnippet, ISnippet, ITag } from "../../models";
import { AppThunk } from "../store";
import { languages } from "../../constants";
import { orderBy } from "lodash";
import { v4 as uuidv4 } from "uuid";
import db from "../../db";

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
    addFolders: (state, action: PayloadAction<IFolder[]>) => {
      state.folders = orderBy(
        [...state.folders, ...action.payload],
        ["name"],
        ["asc"]
      );
    },
    addTags: (state, action: PayloadAction<ITag[]>) => {
      state.tags = orderBy(
        [...state.tags, ...action.payload],
        ["name"],
        ["asc"]
      );
    },
  },
});

export const {
  addSnippet,
  setSelectedSnippet,
  addFolders,
  addTags,
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
    const folder = await db.createFolder({
      ...newFolder,
      created_at: new Date().getTime(),
      updated_at: new Date().getTime(),
    });
    dispatch(addFolders([folder]));
  } catch (err) {
    console.error("Error at creating folder", err);
  }
};

export const getFolders = (): AppThunk => async (dispatch) => {
  try {
    const folders = await db.getFolders();
    dispatch(addFolders(folders));
  } catch (err) {
    console.error("Error at fetching folders", err);
  }
};

export const createTag = (newTag: ITag): AppThunk => async (dispatch) => {
  try {
    const tag = await db.createTag({
      ...newTag,
      created_at: new Date().getTime(),
      updated_at: new Date().getTime(),
    });

    dispatch(addTags([tag]));
  } catch (err) {
    console.error("Error at creating tag", err);
  }
};

export const getTags = (): AppThunk => async (dispatch) => {
  try {
    const tags = await db.getTags();
    dispatch(addTags(tags));
  } catch (err) {
    console.error("Error at fetching tags", err);
  }
};
