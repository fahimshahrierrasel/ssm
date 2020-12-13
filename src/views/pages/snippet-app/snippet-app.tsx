import React, { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../data/state/reducers";
import Sidebar from "../../components/sidebar";
import SnippetDetails from "../../components/snippet-details";
import SnippetForm from "../../components/snippet-form";
import SnippetList from "../../components/snippet-list";
import "./snippet-app.scss";

enum FormState {
  New,
  Update,
  None,
}

const SnippetApp = () => {
  const [formState, setFormState] = useState<FormState>(FormState.None);

  const { selectedSnippet } = useSelector((state: RootState) => state.snippets);

  return (
    <div className="snippet-app">
      <Sidebar />
      <SnippetList openForm={() => setFormState(FormState.New)} />
      {formState !== FormState.None ? (
        <SnippetForm
          snippet={formState === FormState.Update ? selectedSnippet : null}
          closeForm={() => setFormState(FormState.None)}
        />
      ) : (
        <SnippetDetails openForm={() => setFormState(FormState.Update)} />
      )}
    </div>
  );
};

export default SnippetApp;
