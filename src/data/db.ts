import Firebase from "./firebase";
import { IFolder, ITag } from "./models";

const firebase = new Firebase();
const collections = {
  FOLDER: "folders",
  TAG: "tags",
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
};

export default db;
