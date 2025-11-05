import firebase from "./firebase";
import {
  collection,
  addDoc,
  updateDoc,
  doc,
  getDocs,
  query,
  where,
  WhereFilterOp,
  deleteField,
} from "firebase/firestore";
import { IFolder, ISearchTerm, ISnippet, ITag } from "./models";

const collections = {
  FOLDER: "folders",
  TAG: "tags",
  SNIPPET: "snippets",
};

const db = {
  createFolder: async (folder: IFolder): Promise<IFolder> => {
    const folderRef = await addDoc(
      collection(firebase.db, collections.FOLDER),
      folder
    );

    return {
      ...folder,
      id: folderRef.id,
    };
  },
  createTag: async (tag: ITag): Promise<ITag> => {
    const tagRef = await addDoc(collection(firebase.db, collections.TAG), tag);
    return {
      ...tag,
      id: tagRef.id,
    };
  },
  createSnippet: async (snippet: ISnippet): Promise<ISnippet> => {
    const snippetRef = await addDoc(
      collection(firebase.db, collections.SNIPPET),
      snippet
    );
    return {
      ...snippet,
      id: snippetRef.id,
    };
  },
  updateSnippet: async (snippet: ISnippet): Promise<ISnippet> => {
    const { id, ...updateSnippet } = snippet;
    const snippetRef = doc(firebase.db, collections.SNIPPET, id);
    await updateDoc(snippetRef, updateSnippet);
    return snippet;
  },
  restoreOrDeleteSnippet: async (snippet: ISnippet): Promise<ISnippet> => {
    const { id, ...updateSnippet } = snippet;
    const snippetRef = doc(firebase.db, collections.SNIPPET, id);

    if (snippet.deleted_at) {
      await updateDoc(snippetRef, {
        deleted_at: deleteField(),
      });
      const { deleted_at, ...restoreSnippet } = updateSnippet;
      return {
        ...restoreSnippet,
        id,
      } as ISnippet;
    } else {
      const deletedSnippet = {
        ...updateSnippet,
        deleted_at: new Date().getTime(),
      };
      await updateDoc(snippetRef, deletedSnippet);
      return {
        ...deletedSnippet,
        id,
      } as ISnippet;
    }
  },
  getFolders: async (): Promise<IFolder[]> => {
    const folderSnapshot = await getDocs(
      collection(firebase.db, collections.FOLDER)
    );
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
    const tagSnapshot = await getDocs(
      collection(firebase.db, collections.TAG)
    );
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
    const snippetSnapshot = await getDocs(
      collection(firebase.db, collections.SNIPPET)
    );
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
    const constraints = searchTerms.map((searchTerm) =>
      where(
        searchTerm.propertyName,
        searchTerm.operator as WhereFilterOp,
        searchTerm.value
      )
    );

    const snippetQuery = query(
      collection(firebase.db, collections.SNIPPET),
      ...constraints
    );

    const snippetSnapshot = await getDocs(snippetQuery);
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
