import React, { useState } from "react";
import { useDispatch } from "react-redux";
import OutlineButton from "../outline-button";
import OutlineInput from "../outline-input";
import Snippet from "../snippet/snippet";
import "./snippet-list.scss";
import { newSnippet } from "../../../data/state/reducers";

const languages = ["JavaScript", "TypeScript", "Java", "Dart", "Go"];

const SnippetList = () => {
  const dispatch = useDispatch();
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
        <OutlineButton title="NEW" onClick={() => {
          dispatch(newSnippet());
        }} />
      </div>
      <div className="snippets">
        {Array.from(Array(30).keys()).map((item) => (
          <Snippet
            key={item}
            title={`Snippet Number #${item}`}
            language={languages[item % languages.length]}
          />
        ))}
      </div>
    </div>
  );
};

export default SnippetList;
