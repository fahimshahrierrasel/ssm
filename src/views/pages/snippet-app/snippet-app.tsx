import React, { useState } from "react";
import Sidebar from "../../components/sidebar";
import SnippetDetails from "../../components/snippet-details";
import SnippetForm from "../../components/snippet-form";
import SnippetList from "../../components/snippet-list";
import "./snippet-app.scss";

const SnippetApp = () => {
  const [isFormOpen, setIsFormOpen] = useState<boolean>(false);

  return (
    <div className="snippet-app">
      <Sidebar />
      <SnippetList openForm={() => setIsFormOpen(true)} />
      {isFormOpen ? (
        <SnippetForm closeForm={() => setIsFormOpen(false)} />
      ) : (
        <SnippetDetails />
      )}
    </div>
  );
};

export default SnippetApp;
