import React from "react";
import "./snippet-details.scss";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";

const value = `class Person {
    constructor(firstName, lastName) {
        this._firstName = firstName;
        this._lastName = lastName;
    }

    log() {
        console.log('I am', this._firstName, this._lastName);
    }

    // setters
    set profession(val) {
        this._profession = val;
    }
    // getters
    get profession() {
        console.log(this._firstName, this._lastName, 'is a', this._profession);
    }
// With the above code, even though we can access the properties outside the function to change their content what if we don't want that.
// Symbols come to rescue.
let s_firstname  = new Symbol();

class Person {
    constructor(firstName, lastName) {
        this[s_firstName] = firstName;
        this._lastName = lastName;
    }

    log() {
        console.log('I am', this._firstName, this._lastName);
    }

    // setters
    set profession(val) {
        this._profession = val;
    }
    // getters
    get profession() {
        console.log(this[s_firstName], this._lastName, 'is a', this._profession);
	}
	function serverRequest(query, callback){
		setTimeout(function(){
		  var response = query + "full!";
		  callback(response);
		},5000);
	  }
	  
	  function getResults(results){
		console.log("Response from the server: " + results);
	  }
	  
	  serverRequest("The glass is half ", getResults);
	  
	  // Result in console after 5 second delay:
	  // Response from the server: The glass is half full!
	`;

const SnippetDetails = () => {
  return (
    <div className="snippet-details">
      <div className="info">
        <span className="title">Snippet Number #1</span>
        <span className="language">JavaScript</span>
        <div className="folder">
          <span>Folder:</span>
          <span>{"JavaScript"}</span>
        </div>

        <div className="tags">
          <span>Tags:</span>
          {"C#"}
        </div>
      </div>
      <div className="editor">
        <SyntaxHighlighter
          showLineNumbers={true}
          wrapLongLines={true}
          language="javascript"
        >
          {value}
        </SyntaxHighlighter>
      </div>
    </div>
  );
};

export default SnippetDetails;
