import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../data/state/reducers/root";
import Sidebar from "../views/components/sidebar";
import SnippetDetails from "../views/components/snippet-details";
import SnippetForm from "../views/components/snippet-form";
import SnippetList from "../views/components/snippet-list";
import "./App.scss";

function App() {
  const { location } = useSelector((state: RootState) => state.navigation);
  return (
    <div className="app">
      <Sidebar />
      <SnippetList />
      {location === "new" ? <SnippetForm /> : <SnippetDetails />}
    </div>
  );
}

export default App;
