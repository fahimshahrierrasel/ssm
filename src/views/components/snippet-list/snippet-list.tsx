import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import OutlineButton from "../outline-button";
import OutlineInput from "../outline-input";
import Snippet from "../snippet/snippet";
import "./snippet-list.scss";
import {
  newSnippet,
  setSelectedSnippet,
  RootState,
} from "../../../data/state/reducers";

const SnippetList = () => {
  const dispatch = useDispatch();
  const { snippets } = useSelector((state: RootState) => state.snippets);
  const [searchQuery, setSearchQuery] = useState("");

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
        <h4 style={{ padding: "5px" }}>Snippets</h4>
        <OutlineButton
          title="NEW"
          onClick={() => {
            dispatch(newSnippet());
          }}
        />
      </div>
      <div className="snippets">
        {snippets.map((snippet) => (
          <Snippet
            key={snippet.id}
            snippet={snippet}
            onClick={() => {
              dispatch(setSelectedSnippet(snippet.id));
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default SnippetList;
