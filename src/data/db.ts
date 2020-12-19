import firebase from "./firebase";
import app from "firebase/app";
import "firebase/firestore";
import { IFolder, ISearchTerm, ISnippet, ITag } from "./models";

const collections = {
  FOLDER: "folders",
  TAG: "tags",
  SNIPPET: "snippets",
};

const db = {
  createFolder: async (folder: IFolder): Promise<IFolder> => {
    const folderRef = await firebase.db
      .collection(collections.FOLDER)
      .add(folder);

    return {
      ...folder,
      id: folderRef.id,
    };
  },
  createTag: async (tag: ITag): Promise<ITag> => {
    const tagRef = await firebase.db.collection(collections.TAG).add(tag);
    return {
      ...tag,
      id: tagRef.id,
    };
  },
  createSnippet: async (snippet: ISnippet): Promise<ISnippet> => {
    const snippetRef = await firebase.db
      .collection(collections.SNIPPET)
      .add(snippet);
    return {
      ...snippet,
      id: snippetRef.id,
    };
  },
  updateSnippet: async (snippet: ISnippet): Promise<ISnippet> => {
    const { id, ...updateSnippet } = snippet;
    await firebase.db
      .collection(collections.SNIPPET)
      .doc(id)
      .update(updateSnippet);
    return snippet;
  },
  getFolders: async (): Promise<IFolder[]> => {
    const folderSnapshot = await firebase.db
      .collection(collections.FOLDER)
      .get();
    const folders: IFolder[] = [];
    folderSnapshot.forEach((doc) => {
      const data = doc.data();
      folders.push({
        ...data,
        id: doc.id,
      } as IFolder);
    });
    return folders;
  },
  getTags: async (): Promise<ITag[]> => {
    const tagSnapshot = await firebase.db.collection(collections.TAG).get();
    const tags: ITag[] = [];
    tagSnapshot.forEach((doc) => {
      const data = doc.data();
      tags.push({
        ...data,
        id: doc.id,
      } as ITag);
    });
    return tags;
  },
  getSnippets: async (): Promise<ISnippet[]> => {
    const snippetSnapshot = await firebase.db
      .collection(collections.SNIPPET)
      .get();
    const snippets: ISnippet[] = [];
    snippetSnapshot.forEach((doc) => {
      const data = doc.data();
      snippets.push({
        ...data,
        id: doc.id,
      } as ISnippet);
    });
    return snippets;
  },
  searchSnippets: async (searchTerms: ISearchTerm[]): Promise<ISnippet[]> => {
    let snippetRef:
      | app.firestore.CollectionReference
      | app.firestore.Query = firebase.db.collection(collections.SNIPPET);
    searchTerms.forEach((searchTerm) => {
      snippetRef = snippetRef.where(
        searchTerm.propertyName,
        searchTerm.operator as app.firestore.WhereFilterOp,
        searchTerm.value
      );
    });

    var snippetSnapshot = await snippetRef.get();
    const snippets: ISnippet[] = [];
    snippetSnapshot.forEach((doc) => {
      const data = doc.data();
      snippets.push({
        ...data,
        id: doc.id,
      } as ISnippet);
    });
    return snippets;
  },
};

export default db;
