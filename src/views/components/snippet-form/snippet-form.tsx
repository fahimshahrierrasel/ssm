import React, { useState } from "react";
import { useSnippetStore } from "../../../data/state/snippetStore";
import { IDropdownItem, ISnippet, SimpleSnippet } from "../../../data/models";
import OutlineDropdown from "../outline-dropdown";
import OutlineInput from "../outline-input";
import OutlineMultiselect from "../outline-multiselect";
import OutlineButton from "../outline-button";
import { arrayToItems } from "../../../data/helpers";
import Editor from "@monaco-editor/react";

interface ISnippetFormProps {
  closeForm: () => void;
  snippet: ISnippet | null;
}

const SnippetForm = ({ closeForm, snippet }: ISnippetFormProps) => {
  const [eSnippet, setESnippet] = useState<ISnippet>(
    snippet ?? new SimpleSnippet()
  );

  const folders = useSnippetStore((state) => state.folders);
  const tags = useSnippetStore((state) => state.tags);
  const languages = useSnippetStore((state) => state.languages);
  const createOrUpdateSnippet = useSnippetStore((state) => state.createOrUpdateSnippet);

  const onSaveClick = async (event: React.MouseEvent<HTMLButtonElement>) => {
    // TODO: Need proper validation
    if (eSnippet.name.length < 3) {
      alert("Name must be longer than 3+");
    }

    if (eSnippet.snippet.length < 3) {
      alert("Snippet must be longer than 3+");
    }
    await createOrUpdateSnippet(eSnippet);
    closeForm();
  };

  return (
    <div className="snippet-form">
      <div className="meta-info">
        <div className="name">
          <OutlineInput
            placeholder="Snippet Name"
            value={eSnippet.name}
            onChange={(newVal: string) =>
              setESnippet({
                ...eSnippet,
                name: newVal,
              })
            }
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
            selected={
              arrayToItems(folders).find(
                (item) => item.key === eSnippet.folder
              ) ?? null
            }
            onChange={(newVal: IDropdownItem) => {
              setESnippet({
                ...eSnippet,
                folder: newVal.key,
              });
            }}
          />
        </div>

        <div className="language">
          <label>Language</label>
          <OutlineDropdown
            items={arrayToItems(languages)}
            selected={
              arrayToItems(languages).find(
                (item) => item.key === eSnippet.language
              ) ?? arrayToItems(languages)[0]
            }
            onChange={(newVal: IDropdownItem) => {
              setESnippet({
                ...eSnippet,
                language: newVal.key,
              });
            }}
          />
        </div>

        <div className="tags">
          <label>Tags</label>
          <OutlineMultiselect
            items={arrayToItems(tags)}
            selectedItems={arrayToItems(tags).filter((item) =>
              eSnippet.tags?.includes(item.key)
            )}
            onItemChange={(updateItems: IDropdownItem[]) => {
              setESnippet({
                ...eSnippet,
                tags: updateItems.map((item) => item.key),
              });
            }}
          />
        </div>
      </div>

      <div className="snippet-editor">
        <Editor
          language={eSnippet.language ?? languages[0]}
          value={eSnippet.snippet}
          height="96%"
          options={{
            formatOnType: true,
            formatOnPaste: true,
            scrollBeyondLastLine: false,
            automaticLayout: true,
            cursorStyle: "line",
          }}
          onChange={(newValue) =>
            setESnippet({
              ...eSnippet,
              snippet: newValue || "",
            })
          }
        />
      </div>
    </div>
  );
};

export default SnippetForm;
