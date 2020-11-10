import React from "react";
import PropTypes from "prop-types";
import "./outline-button.scss";

interface IOutlineButtonProps {
  title: string;
  onClick: Function;
}

const OutlineButton = ({ title, onClick }: IOutlineButtonProps) => {
  return (
    <button className="outline-button" onClick={(e) => onClick()}>
      {title}
    </button>
  );
};

OutlineButton.propTypes = {
  title: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default OutlineButton;
