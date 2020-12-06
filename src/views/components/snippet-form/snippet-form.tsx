import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { IDropdownItem, ISimpleSnippet } from "../../../data/models";
import OutlineDropdown from "../outline-dropdown";
import OutlineInput from "../outline-input";
import OutlineMultiselect from "../outline-multiselect";
import { RootState, createSnippet } from "../../../data/state/reducers";
import "./snippet-form.scss";
import MonacoEditor from "react-monaco-editor";
import OutlineButton from "../outline-button";
import { useDispatch } from "react-redux";
import { arrayToItems } from "../../../data/helpers";

interface ISnippetFormProps {
  closeForm: Function;
}

const SnippetForm = ({ closeForm }: ISnippetFormProps) => {
  const dispatch = useDispatch();
  const [folder, setFolder] = useState<IDropdownItem | null>(null);
  const [snippetName, setSnippetName] = useState<string>("");
  const [language, setLanguage] = useState<IDropdownItem | null>(null);
  const [selectedTags, setSelectedTags] = useState<IDropdownItem[]>([]);
  const [snippetText, setSnippetText] = useState("");

  const { folders, tags, languages } = useSelector(
    (state: RootState) => state.snippets
  );

  const onSaveClick = async (event: React.MouseEvent<HTMLButtonElement>) => {
    // TODO: Need proper validation
    if (snippetName.length < 3) {
      alert("Name must be longer than 3+");
    }

    if (snippetText.length < 3) {
      alert("Snippet must be longer than 3+");
    }

    dispatch(
      createSnippet({
        name: snippetName,
        snippet: snippetText,
        folder: folder?.key,
        tags: selectedTags?.map((st) => st.key),
        language: language?.value,
      } as ISimpleSnippet)
    );

    closeForm();
  };

  useEffect(() => {
    setLanguage(arrayToItems(languages)[0]);
    return () => {};
  }, [languages]);

  return (
    <div className="snippet-form">
      <div className="meta-info">
        <div className="name">
          <OutlineInput
            placeholder="Snippet Name"
            value={snippetName}
            onChange={(newVal: string) => setSnippetName(newVal)}
          />
          <OutlineButton title="SAVE" onClick={onSaveClick} />
          <OutlineButton
            title="CANCEL"
            onClick={() => {
              closeForm();
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
            selectedItems={selectedTags}
            onItemChange={(updateItems: IDropdownItem[]) => {
              setSelectedTags(updateItems);
            }}
          />
        </div>
      </div>

      <div className="snippet-editor">
        <MonacoEditor
          language={language?.value ?? languages[0]}
          value={snippetText}
          height="96%"
          options={{
            formatOnType: true,
            formatOnPaste: true,
            scrollBeyondLastLine: false,
            automaticLayout: true,
            cursorStyle: "line",
          }}
          onChange={(newValue) => setSnippetText(newValue)}
        />
      </div>
    </div>
  );
};

SnippetForm.propTypes = {
  closeForm: PropTypes.func,
};

export default SnippetForm;
