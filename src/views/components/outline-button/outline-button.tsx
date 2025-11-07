import React from "react";
import PropTypes from "prop-types";

interface IOutlineButtonProps {
  title: string;
  onClick: Function;
  style?: object;
}

const OutlineButton = ({ title, onClick, style = {} }: IOutlineButtonProps) => {
  return (
    <button
      className="outline-button"
      style={{ ...style }}
      onClick={(e) => onClick()}>
      {title}
    </button>
  );
};

OutlineButton.propTypes = {
  title: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  style: PropTypes.object,
};

export default OutlineButton;
