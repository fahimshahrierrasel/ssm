import React from "react";
import { languages } from "../../../data/constants";
import OutlineButton from "../outline-button";
import "./sidebar.scss";
import { capitalize } from "lodash";

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
  return (
    <div className="sidebar">
      <div className="sidebar-block library">
        <h3 className="sidebar-header">Library</h3>
        <ul className="sidebar-item">
          <li>All Snippets</li>
          <li>Favourite</li>
          <li>Trash</li>
        </ul>
      </div>
      <div className="sidebar-block folder">
        <div className="sidebar-header">
          <h3>Folders</h3>
          <OutlineButton
            title="ADD"
            onClick={() => {
              console.log("Hello World");
            }}
          />
        </div>
        <ul className="sidebar-item">
          {folders.map((folder) => (
            <li key={folder}>{folder}</li>
          ))}
        </ul>
      </div>
      <div className="sidebar-block tag">
        <h3 className="sidebar-header">Tags</h3>
      </div>
      <div className="sidebar-block language">
        <h3 className="sidebar-header">Languages</h3>
        <div className="sidebar-item__wrap">
          {languages.map((lang) => (
            <span key={lang}>{capitalize(lang)}</span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
