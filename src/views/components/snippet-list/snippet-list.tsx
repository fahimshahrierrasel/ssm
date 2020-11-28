import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import OutlineButton from "../outline-button";
import OutlineInput from "../outline-input";
import Snippet from "../snippet/snippet";
import "./snippet-list.scss";
import {
  setSelectedSnippet,
  RootState,
} from "../../../data/state/reducers";

interface ISnippetListProps {
  openForm: Function;
}

const SnippetList = ({ openForm }: ISnippetListProps) => {
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
            openForm();
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

SnippetList.propTypes = {
  openForm: PropTypes.func,
};

export default SnippetList;
