import React from "react";
import PropTypes from "prop-types";
import { ISnippet } from "../../../data/models";
import assets from "../../../assets";

interface ISnippetProps {
  snippet: ISnippet
  onClick: Function
}

const Snippet = ({ snippet, onClick }: ISnippetProps) => {
  return (
    <div className="snippet" onClick={(e) => onClick()}>
      <div className="snippet-title">
        <span>{snippet.name}</span>
        { snippet.is_favourite && <img src={assets.FAVOURITE} alt="favourite"/>}
      </div>
      <span className="snippet-lang">{snippet.language}</span>
    </div>
  );
};

Snippet.propTypes = {
  snippet: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default Snippet;
