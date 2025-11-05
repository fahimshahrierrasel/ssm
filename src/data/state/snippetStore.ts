import { create } from 'zustand';
import { IFolder, ISearchTerm, ISnippet, ITag, SimpleSnippet } from '../models';
import { languages } from '../constants';
import { orderBy } from 'lodash';
import db from '../db';
import { notDeletedFilter } from '../helpers';

interface SnippetStore {
  snippets: ISnippet[];
  folders: IFolder[];
  tags: ITag[];
  languages: string[];
  selectedSnippet: ISnippet | null;

  // Actions
  addSnippet: (snippet: ISnippet) => void;
  addSnippets: (snippets: ISnippet[]) => void;
  updateSnippet: (snippet: ISnippet) => void;
  setSelectedSnippet: (id: string) => void;
  addFolders: (folders: IFolder[]) => void;
  addFolder: (folder: IFolder) => void;
  addTags: (tags: ITag[]) => void;
  addTag: (tag: ITag) => void;

  // Async actions
  createOrUpdateSnippet: (newSnippet: ISnippet) => Promise<void>;
  deleteOrRestoreSnippet: (selectedSnippet: ISnippet) => Promise<void>;
  createFolder: (newFolder: IFolder) => Promise<void>;
  getFolders: () => Promise<void>;
  createTag: (newTag: ITag) => Promise<void>;
  getTags: () => Promise<void>;
  getSnippets: () => Promise<void>;
  getFavouriteSnippets: () => Promise<void>;
  getDeletedSnippets: () => Promise<void>;
  searchSnippets: (searchTerm: ISearchTerm) => Promise<void>;
  searchSnippetsByTag: (tagId: string) => Promise<void>;
}

export const useSnippetStore = create<SnippetStore>((set, get) => ({
  snippets: [],
  folders: [],
  tags: [],
  languages: languages,
  selectedSnippet: null,

  // Sync actions
  addSnippet: (snippet) =>
    set((state) => ({
      snippets: orderBy([...state.snippets, snippet], ['created_at'], ['desc']),
    })),

  addSnippets: (snippets) =>
    set({ snippets: orderBy(snippets, ['created_at'], ['desc']) }),

  updateSnippet: (snippet) =>
    set((state) => ({
      snippets: orderBy(
        state.snippets.map((s) =>
          s.id === snippet.id ? { ...s, ...snippet } : s
        ),
        ['created_at'],
        ['desc']
      ),
    })),

  setSelectedSnippet: (id) =>
    set((state) => ({
      selectedSnippet: state.snippets.find((s) => s.id === id) || null,
    })),

  addFolders: (folders) =>
    set({ folders: orderBy(folders, ['name'], ['asc']) }),

  addFolder: (folder) =>
    set((state) => ({
      folders: orderBy([...state.folders, folder], ['name'], ['asc']),
    })),

  addTags: (tags) =>
    set({ tags: orderBy(tags, ['name'], ['asc']) }),

  addTag: (tag) =>
    set((state) => ({
      tags: orderBy([...state.tags, tag], ['name'], ['asc']),
    })),

  // Async actions
  createOrUpdateSnippet: async (newSnippet) => {
    try {
      let snippet = new SimpleSnippet();

      if (newSnippet.id !== '') {
        snippet = await db.updateSnippet({
          ...newSnippet,
          updated_at: new Date().getTime(),
        } as ISnippet);
        get().updateSnippet(snippet);
        get().setSelectedSnippet(snippet.id);
      } else {
        let { id, deleted_at, ...simpleSnippet } = newSnippet;
        snippet = await db.createSnippet({
          ...simpleSnippet,
          is_favourite: false,
          created_at: new Date().getTime(),
          updated_at: new Date().getTime(),
        } as ISnippet);
        get().addSnippet(snippet);
      }
    } catch (err) {
      console.error('Error at creating/updating snippet', err);
    }
  },

  deleteOrRestoreSnippet: async (selectedSnippet) => {
    try {
      console.log('Got Delete Command');
      const snippet = await db.restoreOrDeleteSnippet(selectedSnippet);
      get().updateSnippet(snippet);
      get().setSelectedSnippet('');

      if (snippet.deleted_at) {
        await get().getSnippets();
      } else {
        await get().getDeletedSnippets();
      }
    } catch (err) {
      console.error('Error at deleting/restoring snippet', err);
    }
  },

  createFolder: async (newFolder) => {
    try {
      const folder = await db.createFolder({
        ...newFolder,
        created_at: new Date().getTime(),
        updated_at: new Date().getTime(),
      });
      get().addFolder(folder);
    } catch (err) {
      console.error('Error at creating folder', err);
    }
  },

  getFolders: async () => {
    try {
      const folders = await db.getFolders();
      get().addFolders(folders);
    } catch (err) {
      console.error('Error at fetching folders', err);
    }
  },

  createTag: async (newTag) => {
    try {
      const tag = await db.createTag({
        ...newTag,
        created_at: new Date().getTime(),
        updated_at: new Date().getTime(),
      });
      get().addTag(tag);
    } catch (err) {
      console.error('Error at creating tag', err);
    }
  },

  getTags: async () => {
    try {
      const tags = await db.getTags();
      get().addTags(tags);
    } catch (err) {
      console.error('Error at fetching tags', err);
    }
  },

  getSnippets: async () => {
    try {
      let snippets = await db.getSnippets();
      snippets = snippets.filter(notDeletedFilter);
      get().addSnippets(snippets);
    } catch (err) {
      console.error('Error at fetching snippets', err);
    }
  },

  getFavouriteSnippets: async () => {
    try {
      const searchTerm: ISearchTerm = {
        propertyName: 'is_favourite',
        operator: '==',
        value: true,
      };
      let snippets = await db.searchSnippets([searchTerm]);
      snippets = snippets.filter(notDeletedFilter);
      get().addSnippets(snippets);
    } catch (err) {
      console.error('Error at searching snippets', err);
    }
  },

  getDeletedSnippets: async () => {
    try {
      const searchTerm: ISearchTerm = {
        propertyName: 'deleted_at',
        operator: '!=',
        value: null,
      };
      const snippets = await db.searchSnippets([searchTerm]);
      get().addSnippets(snippets);
    } catch (err) {
      console.error('Error at searching snippets', err);
    }
  },

  searchSnippets: async (searchTerm) => {
    try {
      let snippets = await db.searchSnippets([searchTerm]);
      snippets = snippets.filter(notDeletedFilter);
      get().addSnippets(snippets);
    } catch (err) {
      console.error('Error at searching snippets', err);
    }
  },

  searchSnippetsByTag: async (tagId) => {
    try {
      const searchTerm: ISearchTerm = {
        propertyName: 'tags',
        operator: 'array-contains',
        value: tagId,
      };
      let snippets = await db.searchSnippets([searchTerm]);
      snippets = snippets.filter(notDeletedFilter);
      get().addSnippets(snippets);
    } catch (err) {
      console.error('Error at searching snippets', err);
    }
  },
}));
