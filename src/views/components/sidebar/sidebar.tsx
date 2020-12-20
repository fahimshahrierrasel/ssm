import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import OutlineButton from "../outline-button";
import "./sidebar.scss";
import { capitalize } from "lodash";
import Modal from "../modal";
import Portal from "../../portal";
import SimpleForm from "../simple-form";
import OutlineItem from "../outline-item";
import {
  createFolder,
  createTag,
  getDeletedSnippets,
  getFavouriteSnippets,
  getFolders,
  getSnippets,
  getTags,
  preferences,
  RootState,
  searchSnippets,
  searchSnippetsByTag,
} from "../../../data/state/reducers";
import { IFolder, ISearchTerm, ITag } from "../../../data/models";

const Sidebar = () => {
  const dispatch = useDispatch();
  const [showCreateFolderModal, setShowCreateFolderModal] = useState<boolean>(
    false
  );
  const [showCreateTagModal, setShowCreateTagModal] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<string>();

  const { folders, tags, languages } = useSelector(
    (state: RootState) => state.snippets
  );

  useEffect(() => {
    const loadSidebarData = () => {
      setSelectedItem("all");
      dispatch(getFolders());
      dispatch(getTags());
    };
    loadSidebarData();
    return () => {};
  }, [dispatch]);

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
              dispatch(getSnippets());
            }}
          />
          <OutlineItem
            title="Favourite"
            selected={selectedItem === "favourite"}
            onItemClick={() => {
              setSelectedItem("favourite");
              dispatch(getFavouriteSnippets());
            }}
          />
          <OutlineItem
            title="Trash"
            selected={selectedItem === "trash"}
            onItemClick={() => {
              setSelectedItem("trash");
              dispatch(getDeletedSnippets());
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
                dispatch(
                  searchSnippets({
                    propertyName: "folder",
                    operator: "==",
                    value: folder.id,
                  } as ISearchTerm)
                );
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
              title={capitalize(tag.name)}
              selected={selectedItem === tag.id}
              onItemClick={() => {
                setSelectedItem(tag.id);
                dispatch(searchSnippetsByTag(tag.id));
              }}
              wrapped
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
                dispatch(
                  searchSnippets({
                    propertyName: "language",
                    operator: "==",
                    value: lang,
                  } as ISearchTerm)
                );
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
            dispatch(preferences());
          }}
        />
      </div>

      {showCreateFolderModal && (
        <Portal>
          <Modal title="Create Folder">
            <SimpleForm
              placeholder="Folder Name"
              onSave={(fieldValue: string) => {
                dispatch(
                  createFolder({
                    name: fieldValue,
                  } as IFolder)
                );
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
                dispatch(
                  createTag({
                    name: fieldValue,
                  } as ITag)
                );
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
