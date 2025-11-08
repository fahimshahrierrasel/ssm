import { useState, useEffect } from "react";
import { Plus, Search, Heart } from "lucide-react";
import { useSnippetStore } from "../../../data/state/snippetStore";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { Card } from "../../../components/ui/card";
import { Badge } from "../../../components/ui/badge";
import { cn } from "../../../lib/utils";

interface ISnippetListProps {
  openForm: () => void;
}

const SnippetList = ({ openForm }: ISnippetListProps) => {
  const snippets = useSnippetStore((state) => state.snippets);
  const getSnippets = useSnippetStore((state) => state.getSnippets);
  const setSelectedSnippet = useSnippetStore((state) => state.setSelectedSnippet);
  const selectedSnippet = useSnippetStore((state) => state.selectedSnippet);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    getSnippets();
  }, [getSnippets]);

  const filteredSnippets = snippets.filter((snippet) =>
    snippet.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex w-80 flex-col border-r bg-background">
      {/* Header */}
      <div className="border-b p-4">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-semibold">
            Snippets ({snippets.length})
          </h2>
          <Button size="sm" onClick={openForm}>
            <Plus className="h-4 w-4 mr-1" />
            New
          </Button>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search snippets..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
      </div>

      {/* Snippet List */}
      <div className="flex-1 overflow-y-auto p-2">
        {filteredSnippets.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center p-4">
            <p className="text-muted-foreground">No snippets found</p>
            <Button variant="outline" size="sm" className="mt-4" onClick={openForm}>
              <Plus className="h-4 w-4 mr-1" />
              Create First Snippet
            </Button>
          </div>
        ) : (
          <div className="space-y-2">
            {filteredSnippets.map((snippet) => (
              <Card
                key={snippet.id}
                className={cn(
                  "p-3 cursor-pointer transition-colors hover:bg-accent",
                  selectedSnippet?.id === snippet.id && "ring-2 ring-primary bg-accent"
                )}
                onClick={() => setSelectedSnippet(snippet.id)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium truncate">{snippet.name}</h3>
                    <p className="text-xs text-muted-foreground mt-1">
                      {snippet.language}
                    </p>
                  </div>
                  {snippet.is_favourite && (
                    <Heart className="h-4 w-4 text-red-500 fill-current ml-2 flex-shrink-0" />
                  )}
                </div>
                {snippet.deleted_at && (
                  <Badge variant="destructive" className="mt-2 text-xs">
                    Deleted
                  </Badge>
                )}
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SnippetList;
