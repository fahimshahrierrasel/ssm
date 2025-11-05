import React, { useState, useEffect } from "react";
import { useSnippetStore } from "../../../data/state/snippetStore";
import OutlineButton from "../outline-button";
import OutlineInput from "../outline-input";
import Snippet from "../snippet/snippet";
import "./snippet-list.scss";

interface ISnippetListProps {
  openForm: () => void;
}

const SnippetList = ({ openForm }: ISnippetListProps) => {
  const snippets = useSnippetStore((state) => state.snippets);
  const getSnippets = useSnippetStore((state) => state.getSnippets);
  const setSelectedSnippet = useSnippetStore((state) => state.setSelectedSnippet);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    getSnippets();
    return () => {};
  }, [getSnippets]);

  return (
    <div className="snippet-list">
      <OutlineInput
        placeholder="Search..."
        value={searchQuery}
        style={{ border: "none", padding: "10px", fontSize: "20px" }}
        onChange={(newValue: any) => {
          setSearchQuery(newValue);
        }}
      />
      <div className="list-header">
        <h3>Snippets ({snippets.length})</h3>
        <OutlineButton
          title="NEW"
          style={{ height: "25px" }}
          onClick={() => {
            openForm();
          }}
        />
      </div>
      <div className="snippets">
        {snippets
          .filter((snippet) =>
            searchQuery.trim().length < 0
              ? true
              : snippet.name
                  .toLocaleLowerCase()
                  .includes(searchQuery.trim().toLocaleLowerCase())
          )
          .map((snippet) => (
            <Snippet
              key={snippet.id}
              snippet={snippet}
              onClick={() => {
                setSelectedSnippet(snippet.id);
              }}
            />
          ))}
      </div>
    </div>
  );
};

export default SnippetList;
