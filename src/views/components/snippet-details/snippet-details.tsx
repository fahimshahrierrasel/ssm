import React, { useState } from "react";
import { useDispatch } from "react-redux";
import PropTypes from "prop-types";
import "./snippet-details.scss";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import {
  createOrUpdateSnippet,
  deleteOrRestoreSnippet,
  RootState,
} from "../../../data/state/reducers";
import { useSelector } from "react-redux";
import OutlineButton from "../outline-button";
import assets from "../../../assets";
import SimpleAlert from "../simple-alert";

interface ISnippetDetailsProps {
  openForm: Function;
}

const SnippetDetails = ({ openForm }: ISnippetDetailsProps) => {
  const dispatch = useDispatch();
  const { selectedSnippet, folders, tags } = useSelector(
    (state: RootState) => state.snippets
  );
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const [showRestoreModal, setShowRestoreModal] = useState<boolean>(false);

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
          <div className="action-buttons">
            {selectedSnippet.deleted_at ? (
              <OutlineButton
                style={{
                  height: "25px",
                  color: "red",
                  border: "1px solid red",
                }}
                title="Restore"
                onClick={() => {
                  setShowRestoreModal(true);
                }}
              />
            ) : (
              <OutlineButton
                style={{
                  height: "25px",
                  color: "red",
                  border: "1px solid red",
                }}
                title="Remove"
                onClick={() => {
                  setShowDeleteModal(true);
                }}
              />
            )}

            <OutlineButton
              style={{ height: "25px" }}
              title="Edit"
              onClick={() => {
                openForm();
              }}
            />
          </div>
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

      {showDeleteModal && (
        <SimpleAlert
          description={`Do you want to delete ${selectedSnippet.name}?`}
          acceptAction={async () => {
            dispatch(deleteOrRestoreSnippet(selectedSnippet));
            setShowDeleteModal(false);
          }}
          cancelAction={() => {
            setShowDeleteModal(false);
          }}
        />
      )}

      {showRestoreModal && (
        <SimpleAlert
          description={`Do you want to restore ${selectedSnippet.name}?`}
          acceptAction={async () => {
            dispatch(deleteOrRestoreSnippet(selectedSnippet));
            setShowRestoreModal(false);
          }}
          cancelAction={() => {
            setShowRestoreModal(false);
          }}
        />
      )}
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
