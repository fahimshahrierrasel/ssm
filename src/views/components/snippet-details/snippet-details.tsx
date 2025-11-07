import { useState } from "react";
import { useSnippetStore } from "../../../data/state/snippetStore";
import { Prism as SyntaxHighlighterBase } from "react-syntax-highlighter";
import OutlineButton from "../outline-button";
import assets from "../../../assets";
import SimpleAlert from "../simple-alert";

// Type-safe wrapper for SyntaxHighlighter
const SyntaxHighlighter = SyntaxHighlighterBase as any;

interface ISnippetDetailsProps {
  openForm: () => void;
}

const SnippetDetails = ({ openForm }: ISnippetDetailsProps) => {
  const selectedSnippet = useSnippetStore((state) => state.selectedSnippet);
  const folders = useSnippetStore((state) => state.folders);
  const tags = useSnippetStore((state) => state.tags);
  const createOrUpdateSnippet = useSnippetStore((state) => state.createOrUpdateSnippet);
  const deleteOrRestoreSnippet = useSnippetStore((state) => state.deleteOrRestoreSnippet);

  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const [showRestoreModal, setShowRestoreModal] = useState<boolean>(false);

  return !selectedSnippet ? (
    <EmptySnippet />
  ) : (
    <div className="h-screen grid grid-rows-[auto_1fr] flex-1">
      <div className="grid p-2.5 grid-rows-[auto_auto_auto_auto]">
        <div className="grid grid-cols-[auto_1fr_auto] items-center gap-2.5">
          <img
            src={
              selectedSnippet.is_favourite
                ? assets.FAVOURITE
                : assets.YET_FAVOURITE
            }
            alt="is_favourite"
            className="h-5 w-5 hover:scale-110 hover:transition-all hover:duration-200 cursor-pointer"
            onClick={() => {
              createOrUpdateSnippet({
                ...selectedSnippet,
                is_favourite: !selectedSnippet.is_favourite,
              });
            }}
          />
          <span className="text-xl font-bold">{selectedSnippet.name}</span>
          <div className="grid grid-cols-2 gap-1.5">
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
          <span className="pr-1.5">Folder:</span>
          <span>
            {
              folders.find((folder) => folder.id === selectedSnippet.folder)
                ?.name
            }
          </span>
        </div>

        <div className="tags">
          <span className="pr-1.5">Tags:</span>
          {selectedSnippet.tags
            ?.map((sTag) => tags.find((tag) => tag.id === sTag)?.name)
            .join(", ")}
        </div>
      </div>
      <div className="overflow-y-auto">
        <SyntaxHighlighter
          showLineNumbers={true}
          wrapLongLines={true}
          language={selectedSnippet.language}
          children={selectedSnippet.snippet}
        />
      </div>

      {showDeleteModal && (
        <SimpleAlert
          description={`Do you want to delete ${selectedSnippet.name}?`}
          acceptAction={async () => {
            await deleteOrRestoreSnippet(selectedSnippet);
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
            await deleteOrRestoreSnippet(selectedSnippet);
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
    <div className="relative flex-1">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-2.5 border border-border text-center hover:bg-foreground hover:text-background hover:cursor-help transition-colors">
        <p>No Snippet Selected!</p>
        <p>Select Snippet from snippet list</p>
      </div>
    </div>
  );
};

export default SnippetDetails;
