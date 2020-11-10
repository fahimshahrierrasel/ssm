import React from "react";
import PropTypes from "prop-types";
import "./outline-input.scss";

interface IOutlineInputProps {
  placeholder: string;
  value: any;
  onChange: Function;
  style: object | null;
}

const OutlineInput = ({
  placeholder,
  value,
  onChange,
  style,
}: IOutlineInputProps) => {
  return (
    <input
      className="outline-input"
      style={{ ...style }}
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
};

OutlineInput.propTypes = {
  placeholder: PropTypes.string,
  value: PropTypes.any.isRequired,
  onChange: PropTypes.func.isRequired,
  style: PropTypes.object,
};

OutlineInput.defaultProps = {
	style: {}
};

export default OutlineInput;
