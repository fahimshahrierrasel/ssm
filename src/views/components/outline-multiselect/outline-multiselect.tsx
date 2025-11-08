import React from "react";
import { IDropdownItem } from "../../../data/models";
import { X } from "lucide-react";
import { Badge } from "../../../components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/select";

interface IOutlineMultiselectProps {
  items: IDropdownItem[];
  selectedItems: IDropdownItem[];
  onItemChange: Function;
}

const OutlineMultiselect = ({
  items,
  selectedItems,
  onItemChange,
}: IOutlineMultiselectProps) => {
  return (
    <div className="space-y-2">
      {/* Selected items as badges */}
      {selectedItems.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {selectedItems.map((item) => (
            <Badge
              key={item.key}
              variant="secondary"
              className="pl-2 pr-1 py-1 flex items-center gap-1"
            >
              <span>{item.value}</span>
              <button
                type="button"
                onClick={() => {
                  const updatedItem = selectedItems.filter(
                    (i) => String(i.key) !== String(item.key)
                  );
                  onItemChange(updatedItem);
                }}
                className="ml-1 rounded-full hover:bg-muted p-0.5 transition-colors"
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          ))}
        </div>
      )}

      {/* Select dropdown */}
      <Select
        value=""
        onValueChange={(value) => {
          const newItem = items.find((item) => String(item.key) === value);
          if (newItem && !selectedItems.some((i) => i.key === newItem.key)) {
            onItemChange([...selectedItems, newItem]);
          }
        }}
      >
        <SelectTrigger>
          <SelectValue placeholder="Add tags..." />
        </SelectTrigger>
        <SelectContent>
          {items
            .filter((item) => !selectedItems.some((sItem) => sItem.key === item.key))
            .map((item) => (
              <SelectItem key={item.key} value={String(item.key)}>
                {item.value}
              </SelectItem>
            ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default OutlineMultiselect;
