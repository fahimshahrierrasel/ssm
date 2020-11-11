import React, { useState } from "react";
import { useSelector } from "react-redux";
import { IDropdownItem } from "../../../data/models";
import OutlineDropdown from "../outline-dropdown";
import OutlineInput from "../outline-input";
import OutlineMultiselect from "../outline-multiselect";
import { discardSnippet, RootState } from "../../../data/state/reducers";
import "./snippet-form.scss";

import MonacoEditor from "react-monaco-editor";
import OutlineButton from "../outline-button";
import { useDispatch } from "react-redux";
import { arrayToItems } from "../../../data/helpers";

const SnippetForm = () => {
  const dispatch = useDispatch();
  const [folder, setFolder] = useState<IDropdownItem | null>(null);
  const [language, setLanguage] = useState<IDropdownItem | null>(null);
  const [tag, setTag] = useState<IDropdownItem[]>([]);
  const [snippet, setSnippet] = useState("");

  const { folders, tags, languages } = useSelector(
    (state: RootState) => state.snippets
  );

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
            items={arrayToItems(folders)}
            selected={folder}
            onChange={(newVal: IDropdownItem) => {
              setFolder(newVal);
            }}
          />
        </div>

        <div className="language">
          <label>Language</label>
          <OutlineDropdown
            items={arrayToItems(languages)}
            selected={language ?? arrayToItems(languages)[0]}
            onChange={(newVal: IDropdownItem) => {
              setLanguage(newVal);
            }}
          />
        </div>

        <div className="tags">
          <label>Tags</label>
          <OutlineMultiselect
            items={arrayToItems(tags)}
            selectedItems={tag}
            onItemChange={(updateItems: IDropdownItem[]) => {
              setTag(updateItems);
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
