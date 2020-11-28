import React from "react";
import PropTypes from "prop-types";
import "./outline-input.scss";

interface IOutlineInputProps {
  placeholder: string;
  value: any;
  onChange: Function;
  style: object | null;
  isPassword: boolean;
}

const OutlineInput = ({
  placeholder,
  value,
  onChange,
  style,
  isPassword,
}: IOutlineInputProps) => {
  return (
    <input
      className="outline-input"
      style={{ ...style }}
      type={isPassword ? "password" : "text"}
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
  isPassword: PropTypes.bool,
};

OutlineInput.defaultProps = {
  style: {},
  isPassword: false,
};

export default OutlineInput;
