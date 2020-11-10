import React from "react";
import PropTypes from "prop-types";
import "./snippet.scss";

interface ISnippetProps {
  title: string;
  language: string;
}

const Snippet = ({ title, language }: ISnippetProps) => {
  return (
    <div className="snippet">
      <span className="snippet-title">{title}</span>
      <span className="snippet-lang">{language}</span>
    </div>
  );
};

Snippet.propTypes = {
  title: PropTypes.string.isRequired,
  language: PropTypes.string.isRequired,
};

export default Snippet;
