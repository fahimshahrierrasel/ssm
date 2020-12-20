import firebase from "firebase";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { navigationsPath } from "../data/constants";
import firebaseApp from "../data/firebase";
import { RootState } from "../data/state/reducers";
import Loader from "../views/components/loader";
import Preferences from "../views/pages/preferences";
import SignIn from "../views/pages/sign-in";
import SnippetApp from "../views/pages/snippet-app";
import Portal from "../views/portal";
import "./App.scss";

function App() {
  const { location } = useSelector((state: RootState) => state.navigation);
  const [user, setUser] = useState<firebase.User | null>(null);
  const [waiting, setWaiting] = useState<boolean>(false);

  useEffect(() => {
    setWaiting(true);
    firebaseApp.auth.onAuthStateChanged(
      (user) => {
        setUser(user);
        setWaiting(false);
      },
      (error: firebase.auth.Error) => {
        setWaiting(false);
        console.error(error);
      }
    );
  }, []);

  const getPage = () => {
    if (user) {
      if (location === navigationsPath.APP) return <SnippetApp />;
      else if (location === navigationsPath.PREFERENCES) return <Preferences />;
    } else {
      return <SignIn />;
    }
  };

  return (
    <div className="app">
      {getPage()}
      {waiting && (
        <Portal>
          <Loader />
        </Portal>
      )}
    </div>
  );
}

export default App;
