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
import { notDeletedFilter } from "../../helpers";

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
      state.snippets = orderBy(updatedSnippets, ["created_at"], ["desc"]);
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
      state.folders = orderBy(action.payload, ["name"], ["asc"]);
    },
    addFolder: (state, action: PayloadAction<IFolder>) => {
      state.folders = orderBy(
        [...state.folders, action.payload],
        ["name"],
        ["asc"]
      );
    },
    addTags: (state, action: PayloadAction<ITag[]>) => {
      state.tags = orderBy(action.payload, ["name"], ["asc"]);
    },
    addTag: (state, action: PayloadAction<ITag>) => {
      state.tags = orderBy([...state.tags, action.payload], ["name"], ["asc"]);
    },
  },
});

export const {
  addSnippet,
  addSnippets,
  updateSnippet,
  setSelectedSnippet,
  addFolders,
  addFolder,
  addTags,
  addTag,
} = snippetSlice.actions;

export default snippetSlice.reducer;

// Thunk Actions
export const createOrUpdateSnippet = (newSnippet: ISnippet): AppThunk => async (
  dispatch
) => {
  try {
    let snippet = new SimpleSnippet();

    if (newSnippet.id !== "") {
      snippet = await db.updateSnippet({
        ...newSnippet,
        updated_at: new Date().getTime(),
      } as ISnippet);
      dispatch(updateSnippet(snippet));
      dispatch(setSelectedSnippet(snippet.id));
    } else {
      let { id, deleted_at, ...simpleSnippet } = newSnippet;
      snippet = await db.createSnippet({
        ...simpleSnippet,
        is_favourite: false,
        created_at: new Date().getTime(),
        updated_at: new Date().getTime(),
      } as ISnippet);
      dispatch(addSnippet(snippet));
    }
  } catch (err) {
    console.error("Error at creating/updating snippet", err);
  }
};

export const deleteOrRestoreSnippet = (
  seletedSnippet: ISnippet
): AppThunk => async (dispatch) => {
  try {
    console.log("Got Delete Command");
    const snippet = await db.restoreOrDeleteSnippet(seletedSnippet);
    dispatch(updateSnippet(snippet));
    dispatch(setSelectedSnippet(""));
    // ToDo: Performance Issue
    if (snippet.deleted_at) {
      dispatch(getSnippets());
    } else {
      dispatch(getDeletedSnippets());
    }
  } catch (err) {
    console.error("Error at deleting/restoring snippet", err);
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
    dispatch(addFolder(folder));
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

    dispatch(addTag(tag));
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
    let snippets = await db.getSnippets();
    snippets = snippets.filter(notDeletedFilter);
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
    let snippets = await db.searchSnippets([searchTerm]);
    snippets = snippets.filter(notDeletedFilter);
    dispatch(addSnippets(snippets));
  } catch (err) {
    console.error("Error at searching snippets", err);
  }
};

export const getDeletedSnippets = (): AppThunk => async (dispatch) => {
  try {
    const searchTerm: ISearchTerm = {
      propertyName: "deleted_at",
      operator: "!=",
      value: null,
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
    let snippets = await db.searchSnippets([searchTerm]);
    snippets = snippets.filter(notDeletedFilter);
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
    let snippets = await db.searchSnippets([searchTerm]);
    snippets = snippets.filter(notDeletedFilter);
    dispatch(addSnippets(snippets));
  } catch (err) {
    console.error("Error at searching snippets", err);
  }
};
