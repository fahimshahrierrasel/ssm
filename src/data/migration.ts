import firebase from "./firebase";
import pb from "./pocketbase";
import { collection, getDocs } from "firebase/firestore";
import { IFolder, ISnippet, ITag } from "./models";

export interface MigrationProgress {
  total: number;
  current: number;
  status: string;
  errors: string[];
}

export type MigrationCallback = (progress: MigrationProgress) => void;

const collections = {
  FOLDER: "folders",
  TAG: "tags",
  SNIPPET: "snippets",
};

export class FirebaseToPocketBaseMigration {
  private progressCallback?: MigrationCallback;

  constructor(progressCallback?: MigrationCallback) {
    this.progressCallback = progressCallback;
  }

  private updateProgress(progress: MigrationProgress) {
    if (this.progressCallback) {
      this.progressCallback(progress);
    }
  }

  /**
   * Export all data from Firebase Firestore
   */
  async exportFromFirebase(): Promise<{
    folders: IFolder[];
    tags: ITag[];
    snippets: ISnippet[];
  }> {
    const data = {
      folders: [] as IFolder[],
      tags: [] as ITag[],
      snippets: [] as ISnippet[],
    };

    try {
      this.updateProgress({
        total: 3,
        current: 0,
        status: "Exporting folders from Firebase...",
        errors: [],
      });

      // Export folders
      const folderSnapshot = await getDocs(
        collection(firebase.db, collections.FOLDER)
      );
      folderSnapshot.forEach((doc) => {
        data.folders.push({
          ...doc.data(),
          id: doc.id,
        } as IFolder);
      });

      this.updateProgress({
        total: 3,
        current: 1,
        status: "Exporting tags from Firebase...",
        errors: [],
      });

      // Export tags
      const tagSnapshot = await getDocs(collection(firebase.db, collections.TAG));
      tagSnapshot.forEach((doc) => {
        data.tags.push({
          ...doc.data(),
          id: doc.id,
        } as ITag);
      });

      this.updateProgress({
        total: 3,
        current: 2,
        status: "Exporting snippets from Firebase...",
        errors: [],
      });

      // Export snippets
      const snippetSnapshot = await getDocs(
        collection(firebase.db, collections.SNIPPET)
      );
      snippetSnapshot.forEach((doc) => {
        data.snippets.push({
          ...doc.data(),
          id: doc.id,
        } as ISnippet);
      });

      this.updateProgress({
        total: 3,
        current: 3,
        status: "Export from Firebase completed!",
        errors: [],
      });

      return data;
    } catch (error: any) {
      const errorMessage = `Firebase export error: ${error.message}`;
      this.updateProgress({
        total: 3,
        current: 0,
        status: "Export failed",
        errors: [errorMessage],
      });
      throw new Error(errorMessage);
    }
  }

  /**
   * Import data to PocketBase
   */
  async importToPocketBase(data: {
    folders: IFolder[];
    tags: ITag[];
    snippets: ISnippet[];
  }): Promise<void> {
    const errors: string[] = [];
    const totalItems = data.folders.length + data.tags.length + data.snippets.length;
    let currentItem = 0;

    try {
      // Import folders
      this.updateProgress({
        total: totalItems,
        current: currentItem,
        status: "Importing folders to PocketBase...",
        errors,
      });

      for (const folder of data.folders) {
        try {
          const { id, ...folderData } = folder;
          await pb.collection(collections.FOLDER).create({
            ...folderData,
            // Preserve original Firebase ID if possible (depends on PocketBase schema)
            firebase_id: id,
          });
          currentItem++;
          this.updateProgress({
            total: totalItems,
            current: currentItem,
            status: `Importing folders (${currentItem}/${data.folders.length})...`,
            errors,
          });
        } catch (error: any) {
          errors.push(`Folder import error: ${error.message}`);
        }
      }

      // Import tags
      this.updateProgress({
        total: totalItems,
        current: currentItem,
        status: "Importing tags to PocketBase...",
        errors,
      });

      for (const tag of data.tags) {
        try {
          const { id, ...tagData } = tag;
          await pb.collection(collections.TAG).create({
            ...tagData,
            firebase_id: id,
          });
          currentItem++;
          this.updateProgress({
            total: totalItems,
            current: currentItem,
            status: `Importing tags (${currentItem - data.folders.length}/${data.tags.length})...`,
            errors,
          });
        } catch (error: any) {
          errors.push(`Tag import error: ${error.message}`);
        }
      }

      // Import snippets
      this.updateProgress({
        total: totalItems,
        current: currentItem,
        status: "Importing snippets to PocketBase...",
        errors,
      });

      for (const snippet of data.snippets) {
        try {
          const { id, ...snippetData } = snippet;
          await pb.collection(collections.SNIPPET).create({
            ...snippetData,
            firebase_id: id,
          });
          currentItem++;
          this.updateProgress({
            total: totalItems,
            current: currentItem,
            status: `Importing snippets (${currentItem - data.folders.length - data.tags.length}/${data.snippets.length})...`,
            errors,
          });
        } catch (error: any) {
          errors.push(`Snippet import error: ${error.message}`);
        }
      }

      this.updateProgress({
        total: totalItems,
        current: currentItem,
        status: "Import to PocketBase completed!",
        errors,
      });
    } catch (error: any) {
      const errorMessage = `PocketBase import error: ${error.message}`;
      errors.push(errorMessage);
      this.updateProgress({
        total: totalItems,
        current: currentItem,
        status: "Import failed",
        errors,
      });
      throw new Error(errorMessage);
    }
  }

  /**
   * Complete migration from Firebase to PocketBase
   */
  async migrate(): Promise<void> {
    try {
      this.updateProgress({
        total: 0,
        current: 0,
        status: "Starting migration...",
        errors: [],
      });

      const data = await this.exportFromFirebase();

      this.updateProgress({
        total: 0,
        current: 0,
        status: "Exported data from Firebase, starting import to PocketBase...",
        errors: [],
      });

      await this.importToPocketBase(data);

      this.updateProgress({
        total: 0,
        current: 0,
        status: "Migration completed successfully!",
        errors: [],
      });
    } catch (error: any) {
      throw new Error(`Migration failed: ${error.message}`);
    }
  }

  /**
   * Export Firebase data to JSON file
   */
  async exportToJSON(): Promise<string> {
    const data = await this.exportFromFirebase();
    return JSON.stringify(data, null, 2);
  }

  /**
   * Import from JSON file
   */
  async importFromJSON(jsonString: string): Promise<void> {
    try {
      const data = JSON.parse(jsonString);
      await this.importToPocketBase(data);
    } catch (error: any) {
      throw new Error(`JSON import failed: ${error.message}`);
    }
  }
}

export default FirebaseToPocketBaseMigration;
