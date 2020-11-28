import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../data/state/reducers";
import Sidebar from "../../components/sidebar";
import SnippetDetails from "../../components/snippet-details";
import SnippetForm from "../../components/snippet-form";
import SnippetList from "../../components/snippet-list";
import "./snippet-app.scss";

const SnippetApp = () => {
  const { location } = useSelector((state: RootState) => state.navigation);
  return (
    <div className="snippet-app">
      <Sidebar />
      <SnippetList />
      {location === "new" ? <SnippetForm /> : <SnippetDetails />}
    </div>
  );
};

export default SnippetApp;
