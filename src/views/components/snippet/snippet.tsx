import React from "react";
import PropTypes from "prop-types";
import "./snippet.scss";
import { ISnippet } from "../../../data/models";

interface ISnippetProps {
  snippet: ISnippet
  onClick: Function
}

const Snippet = ({ snippet, onClick }: ISnippetProps) => {
  return (
    <div className="snippet" onClick={(e) => onClick()}>
      <span className="snippet-title">{snippet.name}</span>
      <span className="snippet-lang">{snippet.language}</span>
    </div>
  );
};

Snippet.propTypes = {
  snippet: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default Snippet;
