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
  getFolders,
  getTags,
  RootState,
} from "../../../data/state/reducers";
import { IFolder, ITag } from "../../../data/models";

const Sidebar = () => {
  const dispatch = useDispatch();
  const [showCreateFolderModal, setShowCreateFolderModal] = useState<boolean>(
    false
  );
  const [showCreateTagModal, setShowCreateTagModal] = useState<boolean>(false);

  const { folders, tags, languages } = useSelector(
    (state: RootState) => state.snippets
  );

  useEffect(() => {
    const loadSidebarData = () => {
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
          <OutlineItem title="All Snippets" onItemClick={() => {}} />
          <OutlineItem title="Favourite" onItemClick={() => {}} />
          <OutlineItem title="Trash" onItemClick={() => {}} />
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
              onItemClick={() => {}}
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
              onItemClick={() => {}}
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
              onItemClick={() => {}}
              wrapped
            />
          ))}
        </div>
      </div>

      <div className="footer">
        <OutlineButton title="PROFILE" onClick={() => {}} />
        <OutlineButton title="SETTINGS" onClick={() => {}} />
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
