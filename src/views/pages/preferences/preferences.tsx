import React from "react";
import assets from "../../../assets";
import pb from "../../../data/pocketbase";
import { useNavigationStore } from "../../../data/state/navigationStore";
import OutlineButton from "../../components/outline-button";

const Preferences = () => {
  const snippetHome = useNavigationStore((state) => state.snippetHome);

  const logoutUser = async () => {
    pb.authStore.clear();
  };

  return (
    <div className="preferences">
      <div className="perferences-header">
        <OutlineButton
          title="BACK"
          onClick={() => {
            snippetHome();
          }}
        />
        <h1>Preferences</h1>
      </div>
      <div className="sections">
        <div className="section-profile">
          <h2>Account</h2>
          <p>
            <span>Name: </span>
            <span>{pb.authStore.model?.name || pb.authStore.model?.username}</span>
          </p>
          <p>
            <span>Email: </span>
            <span>{pb.authStore.model?.email}</span>
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
