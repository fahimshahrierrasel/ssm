import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import OutlineButton from "../outline-button";
import OutlineInput from "../outline-input";
import Snippet from "../snippet/snippet";
import "./snippet-list.scss";
import {
  setSelectedSnippet,
  RootState,
  getSnippets,
} from "../../../data/state/reducers";

interface ISnippetListProps {
  openForm: Function;
}

const SnippetList = ({ openForm }: ISnippetListProps) => {
  const dispatch = useDispatch();
  const { snippets } = useSelector((state: RootState) => state.snippets);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    dispatch(getSnippets());
    return () => {};
  }, [dispatch]);

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
