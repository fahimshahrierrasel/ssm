import React from "react";
import { useSelector } from "react-redux";
import { navigationsPath } from "../data/constants";
import { RootState } from "../data/state/reducers/root";
import SignIn from "../views/pages/sign-in";
import SnippetApp from "../views/pages/snippet-app";
import "./App.scss";

function App() {
  const { location } = useSelector((state: RootState) => state.navigation);
  const getPage = (location: string) => {
    switch (location) {
      case navigationsPath.SIGN_IN:
        return <SignIn />;
      case navigationsPath.APP:
        return <SnippetApp />;
    }
  };
  return <div className="app">{ getPage(location) }</div>;
}

export default App;
