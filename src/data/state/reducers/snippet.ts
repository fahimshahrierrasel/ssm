import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  IFolder,
  ISearchTerm,
  ISnippet,
  ITag,
  SimpleSnippet,
} from "../../models";
import { AppThunk } from "../store";
import { languages } from "../../constants";
import { orderBy } from "lodash";
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
      const updatedSnippets = [...state.snippets, action.payload];
      state.snippets = orderBy(
        updatedSnippets,
        ["created_at"],
        ["desc"]
      );
    },
    addSnippets: (state, action: PayloadAction<ISnippet[]>) => {
      state.snippets = orderBy(action.payload, ["created_at"], ["desc"]);
    },
    updateSnippet: (state, action: PayloadAction<ISnippet>) => {
      state.snippets = orderBy(
        state.snippets.map((snippet) => {
          if (snippet.id === action.payload.id) {
            return {
              ...snippet,
              ...action.payload,
            };
          }
          return snippet;
        }),
        ["created_at"],
        ["desc"]
      );
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
  addSnippets,
  updateSnippet,
  setSelectedSnippet,
  addFolders,
  addTags,
} = snippetSlice.actions;

export default snippetSlice.reducer;

// Thunk Actions
export const createOrUpdateSnippet = (newSnippet: ISnippet): AppThunk => async (
  dispatch
) => {
  try {
    console.log(newSnippet);
    let snippet = new SimpleSnippet();

    if (newSnippet.id !== "") {
      snippet = await db.updateSnippet({
        ...newSnippet,
        updated_at: new Date().getTime(),
      });
      dispatch(updateSnippet(snippet));
      dispatch(setSelectedSnippet(snippet.id));
    } else {
      snippet = await db.createSnippet({
        ...newSnippet,
        is_favourite: false,
        created_at: new Date().getTime(),
        updated_at: new Date().getTime(),
      });
      dispatch(addSnippet(snippet));
    }
  } catch (err) {
    console.error("Error at creating snippet", err);
  }
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

export const getSnippets = (): AppThunk => async (dispatch) => {
  try {
    const snippets = await db.getSnippets();
    dispatch(addSnippets(snippets));
  } catch (err) {
    console.error("Error at fetching snippets", err);
  }
};

export const getFavouriteSnippets = (): AppThunk => async (dispatch) => {
  try {
    const searchTerm: ISearchTerm = {
      propertyName: "is_favourite",
      operator: "==",
      value: true,
    };
    const snippets = await db.searchSnippets([searchTerm]);
    dispatch(addSnippets(snippets));
  } catch (err) {
    console.error("Error at searching snippets", err);
  }
};

export const getDeletedSnippets = (): AppThunk => async (dispatch) => {
  try {
    const searchTerm: ISearchTerm = {
      propertyName: "deleted_at",
      operator: ">=",
      value: "",
    };
    const snippets = await db.searchSnippets([searchTerm]);
    dispatch(addSnippets(snippets));
  } catch (err) {
    console.error("Error at searching snippets", err);
  }
};

export const searchSnippets = (searchTerm: ISearchTerm): AppThunk => async (
  dispatch
) => {
  try {
    const snippets = await db.searchSnippets([searchTerm]);
    dispatch(addSnippets(snippets));
  } catch (err) {
    console.error("Error at searching snippets", err);
  }
};


export const searchSnippetsByTag = (tagId: string): AppThunk => async (
  dispatch
) => {
  try {
    const searchTerm: ISearchTerm = {
      propertyName: "tags",
      operator: "array-contains",
      value: tagId,
    };
    const snippets = await db.searchSnippets([searchTerm]);
    dispatch(addSnippets(snippets));
  } catch (err) {
    console.error("Error at searching snippets", err);
  }
};