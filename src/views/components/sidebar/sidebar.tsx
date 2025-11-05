import { useState, useEffect } from "react";
import { capitalize } from "lodash";
import {
  FileText,
  Heart,
  Trash2,
  Folder,
  Plus,
  Tag,
  Code2,
  Settings,
  FolderOpen
} from "lucide-react";
import { useSnippetStore } from "../../../data/state/snippetStore";
import { useNavigationStore } from "../../../data/state/navigationStore";
import { IFolder, ISearchTerm, ITag } from "../../../data/models";
import { Button } from "../../../components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../../../components/ui/dialog";
import { Input } from "../../../components/ui/input";
import { Label } from "../../../components/ui/label";
import { Badge } from "../../../components/ui/badge";
import { cn } from "../../../lib/utils";

const Sidebar = () => {
  const [showCreateFolderModal, setShowCreateFolderModal] = useState(false);
  const [showCreateTagModal, setShowCreateTagModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState<string>();
  const [folderName, setFolderName] = useState("");
  const [tagName, setTagName] = useState("");

  const folders = useSnippetStore((state) => state.folders);
  const tags = useSnippetStore((state) => state.tags);
  const languages = useSnippetStore((state) => state.languages);
  const getFolders = useSnippetStore((state) => state.getFolders);
  const getTags = useSnippetStore((state) => state.getTags);
  const getSnippets = useSnippetStore((state) => state.getSnippets);
  const getFavouriteSnippets = useSnippetStore((state) => state.getFavouriteSnippets);
  const getDeletedSnippets = useSnippetStore((state) => state.getDeletedSnippets);
  const searchSnippets = useSnippetStore((state) => state.searchSnippets);
  const searchSnippetsByTag = useSnippetStore((state) => state.searchSnippetsByTag);
  const createFolder = useSnippetStore((state) => state.createFolder);
  const createTag = useSnippetStore((state) => state.createTag);
  const preferences = useNavigationStore((state) => state.preferences);

  useEffect(() => {
    setSelectedItem("all");
    getFolders();
    getTags();
    getSnippets();
  }, [getFolders, getTags, getSnippets]);

  const handleCreateFolder = () => {
    if (folderName.trim()) {
      createFolder({ name: folderName.trim() } as IFolder);
      setFolderName("");
      setShowCreateFolderModal(false);
    }
  };

  const handleCreateTag = () => {
    if (tagName.trim()) {
      createTag({ name: tagName.trim() } as ITag);
      setTagName("");
      setShowCreateTagModal(false);
    }
  };

  return (
    <div className="flex w-64 flex-col border-r bg-card">
      {/* Header */}
      <div className="border-b p-4">
        <div className="flex items-center gap-2">
          <Code2 className="h-6 w-6 text-primary" />
          <h2 className="text-xl font-bold">Snippets</h2>
        </div>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {/* Library Section */}
        <div className="space-y-1">
          <h3 className="mb-2 px-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Library
          </h3>
          <NavItem
            icon={<FileText className="h-4 w-4" />}
            label="All Snippets"
            selected={selectedItem === "all"}
            onClick={() => {
              setSelectedItem("all");
              getSnippets();
            }}
          />
          <NavItem
            icon={<Heart className="h-4 w-4" />}
            label="Favourites"
            selected={selectedItem === "favourite"}
            onClick={() => {
              setSelectedItem("favourite");
              getFavouriteSnippets();
            }}
          />
          <NavItem
            icon={<Trash2 className="h-4 w-4" />}
            label="Trash"
            selected={selectedItem === "trash"}
            onClick={() => {
              setSelectedItem("trash");
              getDeletedSnippets();
            }}
          />
        </div>

        {/* Folders Section */}
        <div className="space-y-1">
          <div className="mb-2 flex items-center justify-between">
            <h3 className="px-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Folders
            </h3>
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6"
              onClick={() => setShowCreateFolderModal(true)}
            >
              <Plus className="h-3 w-3" />
            </Button>
          </div>
          {folders.length === 0 ? (
            <p className="px-2 text-xs text-muted-foreground">No folders yet</p>
          ) : (
            folders.map((folder) => (
              <NavItem
                key={folder.id}
                icon={<FolderOpen className="h-4 w-4" />}
                label={folder.name}
                selected={selectedItem === folder.id}
                onClick={() => {
                  setSelectedItem(folder.id);
                  searchSnippets({
                    propertyName: "folder",
                    operator: "==",
                    value: folder.id,
                  } as ISearchTerm);
                }}
              />
            ))
          )}
        </div>

        {/* Tags Section */}
        <div className="space-y-1">
          <div className="mb-2 flex items-center justify-between">
            <h3 className="px-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Tags
            </h3>
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6"
              onClick={() => setShowCreateTagModal(true)}
            >
              <Plus className="h-3 w-3" />
            </Button>
          </div>
          {tags.length === 0 ? (
            <p className="px-2 text-xs text-muted-foreground">No tags yet</p>
          ) : (
            <div className="flex flex-wrap gap-1 px-2">
              {tags.map((tag) => (
                <Badge
                  key={tag.id}
                  variant={selectedItem === tag.id ? "default" : "outline"}
                  className="cursor-pointer"
                  onClick={() => {
                    setSelectedItem(tag.id);
                    searchSnippetsByTag(tag.id);
                  }}
                >
                  {tag.name}
                </Badge>
              ))}
            </div>
          )}
        </div>

        {/* Languages Section */}
        <div className="space-y-1">
          <h3 className="mb-2 px-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Languages
          </h3>
          <div className="flex flex-wrap gap-1 px-2">
            {languages.slice(0, 20).map((lang) => (
              <Badge
                key={lang}
                variant={selectedItem === lang ? "default" : "secondary"}
                className="cursor-pointer text-xs"
                onClick={() => {
                  setSelectedItem(lang);
                  searchSnippets({
                    propertyName: "language",
                    operator: "==",
                    value: lang,
                  } as ISearchTerm);
                }}
              >
                {capitalize(lang)}
              </Badge>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="border-t p-4">
        <Button
          variant="outline"
          className="w-full"
          onClick={preferences}
        >
          <Settings className="mr-2 h-4 w-4" />
          Preferences
        </Button>
      </div>

      {/* Create Folder Dialog */}
      <Dialog open={showCreateFolderModal} onOpenChange={setShowCreateFolderModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create Folder</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="folderName">Folder Name</Label>
              <Input
                id="folderName"
                value={folderName}
                onChange={(e) => setFolderName(e.target.value)}
                placeholder="Enter folder name"
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleCreateFolder();
                }}
              />
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setShowCreateFolderModal(false)}>
                Cancel
              </Button>
              <Button onClick={handleCreateFolder}>Create</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Create Tag Dialog */}
      <Dialog open={showCreateTagModal} onOpenChange={setShowCreateTagModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create Tag</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="tagName">Tag Name</Label>
              <Input
                id="tagName"
                value={tagName}
                onChange={(e) => setTagName(e.target.value)}
                placeholder="Enter tag name"
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleCreateTag();
                }}
              />
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setShowCreateTagModal(false)}>
                Cancel
              </Button>
              <Button onClick={handleCreateTag}>Create</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

// Navigation Item Component
const NavItem = ({
  icon,
  label,
  selected,
  onClick,
}: {
  icon: React.ReactNode;
  label: string;
  selected: boolean;
  onClick: () => void;
}) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
        selected
          ? "bg-primary text-primary-foreground"
          : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
      )}
    >
      {icon}
      <span>{label}</span>
    </button>
  );
};

export default Sidebar;
