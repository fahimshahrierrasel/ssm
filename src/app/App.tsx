import firebase from "firebase";
import React, { useEffect, useState } from "react";
import firebaseApp from "../data/firebase";
import Loader from "../views/components/loader";
import SignIn from "../views/pages/sign-in";
import SnippetApp from "../views/pages/snippet-app";
import Portal from "../views/portal";
import "./App.scss";

function App() {
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
      return <SnippetApp />;
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
