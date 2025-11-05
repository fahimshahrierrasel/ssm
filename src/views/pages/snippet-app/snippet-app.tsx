import { useState } from "react";
import { useSnippetStore } from "../../../data/state/snippetStore";
import Sidebar from "../../components/sidebar";
import SnippetDetails from "../../components/snippet-details";
import SnippetForm from "../../components/snippet-form";
import SnippetList from "../../components/snippet-list";

enum FormState {
  New,
  Update,
  None,
}

const SnippetApp = () => {
  const [formState, setFormState] = useState<FormState>(FormState.None);
  const selectedSnippet = useSnippetStore((state) => state.selectedSnippet);

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-background">
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
