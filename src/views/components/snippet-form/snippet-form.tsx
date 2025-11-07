import React, { useState } from "react";
import { useSnippetStore } from "../../../data/state/snippetStore";
import { IDropdownItem, ISnippet, SimpleSnippet } from "../../../data/models";
import OutlineMultiselect from "../outline-multiselect";
import { arrayToItems } from "../../../data/helpers";
import Editor from "@monaco-editor/react";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { Label } from "../../../components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/select";
import { capitalize } from "lodash";

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
    <div className="h-screen grid grid-rows-[auto_1fr] flex-1">
      <div className="grid items-center p-4 gap-4 grid-cols-2 [grid-template-areas:'name_name''folder_language''tags_tags']">
        <div className="[grid-area:name] grid grid-cols-[1fr_auto_auto] gap-2">
          <Input
            placeholder="Snippet Name"
            value={eSnippet.name}
            onChange={(e) =>
              setESnippet({
                ...eSnippet,
                name: e.target.value,
              })
            }
          />
          <Button onClick={onSaveClick}>SAVE</Button>
          <Button
            variant="outline"
            onClick={() => {
              closeForm();
            }}
          >
            CANCEL
          </Button>
        </div>

        <div className="[grid-area:folder] space-y-2">
          <Label>Folder</Label>
          <Select
            value={eSnippet.folder ?? undefined}
            onValueChange={(value) => {
              setESnippet({
                ...eSnippet,
                folder: value,
              });
            }}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select folder" />
            </SelectTrigger>
            <SelectContent>
              {arrayToItems(folders).map((item) => (
                <SelectItem key={item.key} value={item.key}>
                  {capitalize(item.value)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="[grid-area:language] space-y-2">
          <Label>Language</Label>
          <Select
            value={eSnippet.language ?? languages[0]}
            onValueChange={(value) => {
              setESnippet({
                ...eSnippet,
                language: value,
              });
            }}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select language" />
            </SelectTrigger>
            <SelectContent>
              {arrayToItems(languages).map((item) => (
                <SelectItem key={item.key} value={item.key}>
                  {capitalize(item.value)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="[grid-area:tags] space-y-2">
          <Label>Tags</Label>
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

      <div className="row-start-2">
        <Editor
          language={eSnippet.language ?? languages[0]}
          value={eSnippet.snippet}
          height="100%"
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
