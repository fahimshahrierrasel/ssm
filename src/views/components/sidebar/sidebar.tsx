import React, { useState, useEffect } from "react";
import { capitalize } from "lodash";
import { useSnippetStore } from "../../../data/state/snippetStore";
import { useNavigationStore } from "../../../data/state/navigationStore";
import { IFolder, ISearchTerm, ITag } from "../../../data/models";
import OutlineButton from "../outline-button";
import Modal from "../modal";
import Portal from "../../portal";
import SimpleForm from "../simple-form";
import OutlineItem from "../outline-item";
import "./sidebar.scss";

const Sidebar = () => {
  const [showCreateFolderModal, setShowCreateFolderModal] = useState<boolean>(
    false
  );
  const [showCreateTagModal, setShowCreateTagModal] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<string>();

  const folders = useSnippetStore((state) => state.folders);
  const tags = useSnippetStore((state) => state.tags);
  const languages = useSnippetStore((state) => state.languages);
  const getFolders = useSnippetStore((state) => state.getFolders);
  const getTags = useSnippetStore((state) => state.getTags);
  const getSnippets = useSnippetStore((state) => state.getSnippets);
  const getFavouriteSnippets = useSnippetStore((state) => state.getFavouriteSnippets);
  const getDeletedSnippets = useSnippetStore((state) => state.getDeletedSnippets);
  const searchSnippets = useSnippetStore((state) => state.searchSnippets);
  const searchSnippetsByTag = useSnippetStore((state) => state.searchSnippetsByTag);
  const createFolder = useSnippetStore((state) => state.createFolder);
  const createTag = useSnippetStore((state) => state.createTag);
  const preferences = useNavigationStore((state) => state.preferences);

  useEffect(() => {
    const loadSidebarData = () => {
      setSelectedItem("all");
      getFolders();
      getTags();
    };
    loadSidebarData();
    return () => {};
  }, [getFolders, getTags]);

  return (
    <div className="sidebar">
      <div className="sidebar-block library">
        <h3 className="sidebar-header">Library</h3>
        <div className="sidebar-item">
          <OutlineItem
            title="All Snippets"
            selected={selectedItem === "all"}
            onItemClick={() => {
              setSelectedItem("all");
              getSnippets();
            }}
          />
          <OutlineItem
            title="Favourite"
            selected={selectedItem === "favourite"}
            onItemClick={() => {
              setSelectedItem("favourite");
              getFavouriteSnippets();
            }}
          />
          <OutlineItem
            title="Trash"
            selected={selectedItem === "trash"}
            onItemClick={() => {
              setSelectedItem("trash");
              getDeletedSnippets();
            }}
          />
        </div>
      </div>
      <div className="sidebar-block folder">
        <div className="sidebar-header">
          <h3>Folders</h3>
          <OutlineButton
            title="ADD"
            onClick={() => {
              setShowCreateFolderModal(true);
            }}
          />
        </div>
        <div className="sidebar-item">
          {folders.map((folder) => (
            <OutlineItem
              key={folder.id}
              title={folder.name}
              selected={selectedItem === folder.id}
              onItemClick={() => {
                setSelectedItem(folder.id);
                searchSnippets({
                  propertyName: "folder",
                  operator: "==",
                  value: folder.id,
                } as ISearchTerm);
              }}
            />
          ))}
        </div>
      </div>
      <div className="sidebar-block tag">
        <div className="sidebar-header">
          <h3>Tags</h3>
          <OutlineButton
            title="ADD"
            onClick={() => {
              setShowCreateTagModal(true);
            }}
          />
        </div>
        <div className="sidebar-item__wrap">
          {tags.map((tag) => (
            <OutlineItem
              key={tag.id}
              title={tag.name}
              selected={selectedItem === tag.id}
              wrapped
              onItemClick={() => {
                setSelectedItem(tag.id);
                searchSnippetsByTag(tag.id);
              }}
            />
          ))}
        </div>
      </div>
      <div className="sidebar-block language">
        <h3 className="sidebar-header">Languages</h3>
        <div className="sidebar-item__wrap">
          {languages.map((lang) => (
            <OutlineItem
              key={lang}
              title={capitalize(lang)}
              selected={selectedItem === lang}
              onItemClick={() => {
                setSelectedItem(lang);
                searchSnippets({
                  propertyName: "language",
                  operator: "==",
                  value: lang,
                } as ISearchTerm);
              }}
              wrapped
            />
          ))}
        </div>
      </div>

      <div className="footer">
        <OutlineButton
          title="Preferences"
          onClick={() => {
            preferences();
          }}
        />
      </div>

      {showCreateFolderModal && (
        <Portal>
          <Modal title="Create Folder">
            <SimpleForm
              placeholder="Folder Name"
              onSave={(fieldValue: string) => {
                createFolder({
                  name: fieldValue,
                } as IFolder);
                setShowCreateFolderModal(false);
              }}
              onCancel={() => setShowCreateFolderModal(false)}
            />
          </Modal>
        </Portal>
      )}

      {showCreateTagModal && (
        <Portal>
          <Modal title="Create Tag">
            <SimpleForm
              placeholder="Tag Name"
              onSave={(fieldValue: string) => {
                createTag({
                  name: fieldValue,
                } as ITag);
                setShowCreateTagModal(false);
              }}
              onCancel={() => setShowCreateTagModal(false)}
            />
          </Modal>
        </Portal>
      )}
    </div>
  );
};

export default Sidebar;
