import React from "react";
import "./snippet-details.scss";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { RootState } from "../../../data/state/reducers";
import { useSelector } from "react-redux";

const SnippetDetails = () => {
  const { selectedSnippet, folders, tags } = useSelector(
    (state: RootState) => state.snippets
  );
  return !selectedSnippet ? (
    <EmptySnippet />
  ) : (
    <div className="snippet-details">
      <div className="info">
        <span className="title">{selectedSnippet.name}</span>
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

export default SnippetDetails;
