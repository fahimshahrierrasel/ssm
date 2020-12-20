import React from "react";
import { useDispatch } from "react-redux";
import assets from "../../../assets";
import firebaseApp from "../../../data/firebase";
import { snippetHome } from "../../../data/state/reducers";
import OutlineButton from "../../components/outline-button";
import "./preferences.scss";

const Preferences = () => {
  const dispatch = useDispatch();
  const logoutUser = async () => {
    await firebaseApp.auth.signOut();
  };

  return (
    <div className="preferences">
      <div className="perferences-header">
        <OutlineButton
          title="BACK"
          onClick={() => {
            dispatch(snippetHome());
          }}
        />
        <h1>Preferences</h1>
      </div>
      <div className="sections">
        <div className="section-profile">
          <h2>Account</h2>
          <p>
            <span>Name: </span>
            <span>{firebaseApp.auth.currentUser?.displayName}</span>
          </p>
          <p>
            <span>Email: </span>
            <span>{firebaseApp.auth.currentUser?.email}</span>
          </p>
          <br />
          <OutlineButton title="LOG OUT" onClick={logoutUser} />
        </div>
        <div className="section-meta">
          <h2>Meta</h2>
        </div>
        <div className="section-editor-settings">
          <h2>Editor Settings</h2>
          <p>No idea when will come!</p>
        </div>
      </div>
      <div className="preferences-footer">
        <h1>Simple Snippet Manager</h1>
        <div className="application-icon">
          <img src={assets.LOGO} alt="App Logo" />
          <span>
            Icons made by{" "}
            <a href="http://www.freepik.com/" title="Freepik">
              Freepik
            </a>{" "}
            from{" "}
            <a href="https://www.flaticon.com/" title="Flaticon">
              {" "}
              www.flaticon.com
            </a>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Preferences;
