import React from "react";
import PropTypes from "prop-types";
import { IDropdownItem } from "../../../data/models";
import { MdClose } from "react-icons/md";

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
    <div className="outline-multiselect">
      <div className="selected-item">
        {selectedItems.map((item) => (
          <SelectedItem
            key={item.key}
            item={item}
            onRemove={(key: string) => {
              const updatedItem = selectedItems.filter(
                (item) => String(item.key) !== String(key)
              );
              onItemChange(updatedItem);
            }}
          />
        ))}

        <select
          onChange={(e) => {
            const newItem = items.find(
              (item) => String(item.key) === e.target.value
            );
            onItemChange([...selectedItems, newItem as IDropdownItem]);
          }}>
          <option>Select</option>
          {items
            .filter((item) => !selectedItems.some((sItem) => sItem.key === item.key))
            .map((item) => (
              <option key={item.key} value={item.key}>
                {item.value}
              </option>
            ))}
        </select>
      </div>
    </div>
  );
};

interface ISelectedItemProp {
  item: IDropdownItem;
  onRemove: Function;
}

const SelectedItem = ({ item, onRemove }: ISelectedItemProp) => {
  return (
    <div className="multiselect-item__selected">
      <span>{item.value}</span>
      <MdClose className="icon" onClick={() => onRemove(item.key)} />
    </div>
  );
};

OutlineMultiselect.protoTypes = {
  items: PropTypes.array.isRequired,
  selectedItems: PropTypes.array.isRequired,
  onItemChange: PropTypes.func.isRequired,
};

export default OutlineMultiselect;
