import React from "react";
import { useDispatch } from "react-redux";
import PropTypes from "prop-types";
import "./snippet-details.scss";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { createOrUpdateSnippet, RootState } from "../../../data/state/reducers";
import { useSelector } from "react-redux";
import OutlineButton from "../outline-button";
import assets from "../../../assets";

interface ISnippetDetailsProps {
  openForm: Function;
}

const SnippetDetails = ({ openForm }: ISnippetDetailsProps) => {
  const dispatch = useDispatch();
  const { selectedSnippet, folders, tags } = useSelector(
    (state: RootState) => state.snippets
  );
  return !selectedSnippet ? (
    <EmptySnippet />
  ) : (
    <div className="snippet-details">
      <div className="info">
        <div className="title">
          <img
            src={
              selectedSnippet.is_favourite
                ? assets.FAVOURITE
                : assets.YET_FAVOURITE
            }
            alt="is_favourite"
            onClick={() => {
              dispatch(
                createOrUpdateSnippet({
                  ...selectedSnippet,
                  is_favourite: !selectedSnippet.is_favourite,
                })
              );
            }}
          />
          <span>{selectedSnippet.name}</span>
          <OutlineButton
            style={{ height: "25px" }}
            title="Edit"
            onClick={() => {
              openForm();
            }}
          />
        </div>
        <span className="language">{selectedSnippet.language}</span>
        <div className="folder">
          <span>Folder:</span>
          <span>
            {
              folders.find((folder) => folder.id === selectedSnippet.folder)
                ?.name
            }
          </span>
        </div>

        <div className="tags">
          <span>Tags:</span>
          {selectedSnippet.tags
            ?.map((sTag) => tags.find((tag) => tag.id === sTag)?.name)
            .join(", ")}
        </div>
      </div>
      <div className="editor">
        <SyntaxHighlighter
          showLineNumbers={true}
          wrapLongLines={true}
          language={selectedSnippet.language}>
          {selectedSnippet.snippet}
        </SyntaxHighlighter>
      </div>
    </div>
  );
};

const EmptySnippet = () => {
  return (
    <div className="empty-snippet">
      <div className="message">
        <p>No Snippet Selected!</p>
        <p>Select Snippet from snippet list</p>
      </div>
    </div>
  );
};

SnippetDetails.propTypes = {
  openForm: PropTypes.func,
};

export default SnippetDetails;
