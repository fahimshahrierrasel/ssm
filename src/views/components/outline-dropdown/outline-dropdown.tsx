import React from "react";
import "./outline-dropdown.scss";
import PropTypes from "prop-types";
import { capitalize } from "lodash";
import { IDropdownItem } from "../../../data/models";

interface IOutlineDropdownProps {
  items: IDropdownItem[];
  selected: IDropdownItem | null;
  onChange: Function;
  style: object;
}

const OutlineDropdown = ({
  items,
  selected,
  onChange,
  style,
}: IOutlineDropdownProps) => {
  return (
    <select
      className="outline-dropdown"
      style={{ ...style }}
      value={selected?.key}
      onChange={(e) => {
        onChange(items.find((item) => String(item.key) === e.target.value));
      }}>
      <option>Select</option>
      {items.map((item) => (
        <option
          className={`${item.key === selected?.key ? "selected" : ""}`}
          key={item.key}
          value={item.key}>
          {capitalize(item.value)}
        </option>
      ))}
    </select>
  );
};

OutlineDropdown.propTypes = {
  items: PropTypes.array.isRequired,
  selected: PropTypes.object,
  onChange: PropTypes.func.isRequired,
  style: PropTypes.object,
};

OutlineDropdown.defaultProps = {
  style: {},
};

export default OutlineDropdown;
