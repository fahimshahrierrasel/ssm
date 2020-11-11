import React from "react";
import PropTypes from "prop-types";
import "./outline-item.scss";

interface IOutlineItemProps {
  title: string;
  onItemClick: Function;
  wrapped: boolean;
}

const OutlineItem = ({ title, onItemClick, wrapped }: IOutlineItemProps) => {
  return (
    <div
      className={`${wrapped ? "outline-item__wrap" : "outline-item"}`}
      onClick={() => onItemClick()}>
      {title}
    </div>
  );
};

OutlineItem.propTypes = {
  title: PropTypes.string.isRequired,
  onItemClick: PropTypes.func.isRequired,
  wrapped: PropTypes.bool,
};

OutlineItem.defaultProps = {
  wrapped: false,
};

export default OutlineItem;
