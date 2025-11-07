import { useState } from "react";
import { useSnippetStore } from "../../../data/state/snippetStore";
import { Prism as SyntaxHighlighterBase } from "react-syntax-highlighter";
import SimpleAlert from "../simple-alert";
import { Button } from "../../../components/ui/button";
import { Badge } from "../../../components/ui/badge";
import { Heart, Pencil, Trash2, RotateCcw } from "lucide-react";

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
      <div className="border-b bg-card">
        <div className="p-4 space-y-4">
          {/* Title and Actions */}
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3 flex-1 min-w-0">
              <Button
                variant="ghost"
                size="icon"
                className={selectedSnippet.is_favourite ? "text-red-500 hover:text-red-600" : "text-muted-foreground hover:text-foreground"}
                onClick={() => {
                  createOrUpdateSnippet({
                    ...selectedSnippet,
                    is_favourite: !selectedSnippet.is_favourite,
                  });
                }}
              >
                <Heart className={selectedSnippet.is_favourite ? "fill-current" : ""} />
              </Button>
              <h2 className="text-xl font-bold truncate">{selectedSnippet.name}</h2>
            </div>
            <div className="flex items-center gap-2">
              {selectedSnippet.deleted_at ? (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setShowRestoreModal(true);
                  }}
                >
                  <RotateCcw className="mr-2 h-4 w-4" />
                  Restore
                </Button>
              ) : (
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => {
                    setShowDeleteModal(true);
                  }}
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Remove
                </Button>
              )}

              <Button
                variant="default"
                size="sm"
                onClick={() => {
                  openForm();
                }}
              >
                <Pencil className="mr-2 h-4 w-4" />
                Edit
              </Button>
            </div>
          </div>

          {/* Metadata */}
          <div className="flex flex-wrap items-center gap-4 text-sm">
            <div className="flex items-center gap-2">
              <span className="text-muted-foreground">Language:</span>
              <Badge variant="secondary">{selectedSnippet.language}</Badge>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-muted-foreground">Folder:</span>
              <Badge variant="outline">
                {
                  folders.find((folder) => folder.id === selectedSnippet.folder)
                    ?.name
                }
              </Badge>
            </div>
            {selectedSnippet.tags && selectedSnippet.tags.length > 0 && (
              <div className="flex items-center gap-2">
                <span className="text-muted-foreground">Tags:</span>
                <div className="flex flex-wrap gap-1">
                  {selectedSnippet.tags.map((sTag) => {
                    const tag = tags.find((tag) => tag.id === sTag);
                    return tag ? (
                      <Badge key={sTag} variant="outline" className="text-xs">
                        {tag.name}
                      </Badge>
                    ) : null;
                  })}
                </div>
              </div>
            )}
          </div>
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
