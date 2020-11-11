import React, { useState } from "react";
import { languages } from "../../../data/constants";
import OutlineButton from "../outline-button";
import "./sidebar.scss";
import { capitalize } from "lodash";
import Modal from "../modal";
import Portal from "../../portal";
import SimpleForm from "../simple-form";
import OutlineItem from "../outline-item";

const folders = [
  "JavaScript",
  "TypeScript",
  "React",
  ".Net",
  "Android",
  "Java",
  "Flutter",
  "Dart",
  "Xamarin",
  "Git",
  "Docker",
  "Angular",
  "Go",
  "Sass",
  "Tools",
];

const Sidebar = () => {
  const [showCreateFolderModal, setShowCreateFolderModal] = useState<boolean>(
    false
  );
  const [showCreateTagModal, setShowCreateTagModal] = useState<boolean>(false);

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
            <OutlineItem key={folder} title={folder} onItemClick={() => {}} />
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

      {showCreateFolderModal && (
        <Portal>
          <Modal title="Create Folder">
            <SimpleForm
              placeholder="Folder Name"
              onSave={(fieldValue: string) => {
                console.log(fieldValue);
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
                console.log(fieldValue);
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
