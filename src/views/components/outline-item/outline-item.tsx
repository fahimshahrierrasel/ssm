import React from "react";
import PropTypes from "prop-types";

interface IOutlineItemProps {
  title: string;
  onItemClick: Function;
  wrapped: boolean;
  selected: boolean;
}

const OutlineItem = ({
  title,
  onItemClick,
  wrapped,
  selected,
}: IOutlineItemProps) => {
  return (
    <div
      className={`${wrapped ? "outline-item__wrap" : "outline-item"} ${
        selected ? "outline-item__selected" : ""
      }`}
      onClick={() => onItemClick()}>
      {title}
    </div>
  );
};

OutlineItem.propTypes = {
  title: PropTypes.string.isRequired,
  onItemClick: PropTypes.func.isRequired,
  wrapped: PropTypes.bool,
  selected: PropTypes.bool,
};

OutlineItem.defaultProps = {
  wrapped: false,
  selected: false,
};

export default OutlineItem;
