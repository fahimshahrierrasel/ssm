import pb from "./pocketbase";
import { IFolder, ISearchTerm, ISnippet, ITag } from "./models";

const collections = {
  FOLDER: "folders",
  TAG: "tags",
  SNIPPET: "snippets",
};

const pbDb = {
  createFolder: async (folder: IFolder): Promise<IFolder> => {
    const record = await pb.collection(collections.FOLDER).create(folder);
    return {
      ...folder,
      id: record.id,
    };
  },

  createTag: async (tag: ITag): Promise<ITag> => {
    const record = await pb.collection(collections.TAG).create(tag);
    return {
      ...tag,
      id: record.id,
    };
  },

  createSnippet: async (snippet: ISnippet): Promise<ISnippet> => {
    const record = await pb.collection(collections.SNIPPET).create(snippet);
    return {
      ...snippet,
      id: record.id,
    };
  },

  updateSnippet: async (snippet: ISnippet): Promise<ISnippet> => {
    const { id, ...updateSnippet } = snippet;
    await pb.collection(collections.SNIPPET).update(id, updateSnippet);
    return snippet;
  },

  restoreOrDeleteSnippet: async (snippet: ISnippet): Promise<ISnippet> => {
    const { id, ...updateSnippet } = snippet;

    if (snippet.deleted_at) {
      // Restore snippet by removing deleted_at field
      const { deleted_at, ...restoreSnippet } = updateSnippet;
      await pb.collection(collections.SNIPPET).update(id, {
        ...restoreSnippet,
        deleted_at: null,
      });
      return {
        ...restoreSnippet,
        id,
      } as ISnippet;
    } else {
      // Delete snippet by setting deleted_at
      const deletedSnippet = {
        ...updateSnippet,
        deleted_at: new Date().getTime(),
      };
      await pb.collection(collections.SNIPPET).update(id, deletedSnippet);
      return {
        ...deletedSnippet,
        id,
      } as ISnippet;
    }
  },

  getFolders: async (): Promise<IFolder[]> => {
    const records = await pb.collection(collections.FOLDER).getFullList({
      sort: '-created',
    });
    return records as unknown as IFolder[];
  },

  getTags: async (): Promise<ITag[]> => {
    const records = await pb.collection(collections.TAG).getFullList({
      sort: '-created',
    });
    return records as unknown as ITag[];
  },

  getSnippets: async (): Promise<ISnippet[]> => {
    const records = await pb.collection(collections.SNIPPET).getFullList({
      sort: '-created',
    });
    return records as unknown as ISnippet[];
  },

  searchSnippets: async (searchTerms: ISearchTerm[]): Promise<ISnippet[]> => {
    // Build PocketBase filter string
    const filters = searchTerms.map((term) => {
      const { propertyName, operator, value } = term;

      // Convert Firestore operators to PocketBase filter syntax
      switch (operator) {
        case "==":
          return `${propertyName} = "${value}"`;
        case "!=":
          return `${propertyName} != "${value}"`;
        case ">":
          return `${propertyName} > "${value}"`;
        case ">=":
          return `${propertyName} >= "${value}"`;
        case "<":
          return `${propertyName} < "${value}"`;
        case "<=":
          return `${propertyName} <= "${value}"`;
        case "array-contains":
          return `${propertyName} ~ "${value}"`;
        default:
          return `${propertyName} = "${value}"`;
      }
    });

    const filterString = filters.join(" && ");

    const records = await pb.collection(collections.SNIPPET).getFullList({
      filter: filterString,
      sort: '-created',
    });

    return records as unknown as ISnippet[];
  },
};

export default pbDb;
