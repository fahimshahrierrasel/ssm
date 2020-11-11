import React from "react";
import "./loader.scss";

const Loader = () => {
  return (
    <div className="loader-modal">
      <div className="dbl-spinner"></div>
      <div className="dbl-spinner"></div>
    </div>
  );
};

export default Loader;
