import React, { useState } from "react";
import { IDropdownItem } from "../../../data/models";
import OutlineDropdown from "../outline-dropdown";
import OutlineInput from "../outline-input";
import OutlineMultiselect from "../outline-multiselect";
import { languageItems, languages } from "../../../data/constants";
import { discardSnippet } from "../../../data/state/reducers";
import "./snippet-form.scss";

import MonacoEditor from "react-monaco-editor";
import OutlineButton from "../outline-button";
import { useDispatch } from "react-redux";

const dropdownItems = [
  { key: 1, value: "Folder 1" },
  { key: 2, value: "Folder 2" },
  { key: 3, value: "Folder 3" },
  { key: 4, value: "Folder 4" },
  { key: 5, value: "Folder 5" },
];

const SnippetForm = () => {
  const dispatch = useDispatch();
  const [folder, setFolder] = useState<IDropdownItem | null>(null);
  const [language, setLanguage] = useState<IDropdownItem | null>(null);
  const [tags, setTags] = useState<IDropdownItem[]>([]);
  const [snippet, setSnippet] = useState("");
  return (
    <div className="snippet-form">
      <div className="meta-info">
        <div className="name">
          <OutlineInput
            placeholder="Snippet Name"
            value=""
            onChange={() => {}}
          />
          <OutlineButton title="SAVE" onClick={() => {}} />
          <OutlineButton
            title="CANCEL"
            onClick={() => {
              dispatch(discardSnippet());
            }}
          />
        </div>
        <div className="folder">
          <label>Folder</label>
          <OutlineDropdown
            items={dropdownItems}
            selected={folder}
            onChange={(newVal: IDropdownItem) => {
              setFolder(newVal);
            }}
          />
        </div>
        <div className="language">
          <label>Language</label>
          <OutlineDropdown
            items={languageItems}
            selected={language ?? languageItems[0]}
            onChange={(newVal: IDropdownItem) => {
              setLanguage(newVal);
            }}
          />
        </div>

        <div className="tags">
          <label>Tags</label>
          <OutlineMultiselect
            items={dropdownItems}
            selectedItems={tags}
            onItemChange={(updateItems: IDropdownItem[]) => {
              setTags(updateItems);
            }}
          />
        </div>
      </div>

      <div className="snippet-editor">
        <MonacoEditor
          language={language?.value ?? languages[0]}
          value={snippet}
          height="96%"
          options={{
            formatOnType: true,
            formatOnPaste: true,
            scrollBeyondLastLine: false,
            automaticLayout: true,
            cursorStyle: "line",
          }}
          onChange={(newValue) => setSnippet(newValue)}
        />
      </div>
    </div>
  );
};

export default SnippetForm;
