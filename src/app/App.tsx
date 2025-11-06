import { useEffect, useState } from "react";
import { navigationsPath } from "../data/constants";
import pb from "../data/pocketbase";
import { useNavigationStore } from "../data/state/navigationStore";
import Loader from "../views/components/loader";
import Preferences from "../views/pages/preferences";
import SignIn from "../views/pages/sign-in";
import SnippetApp from "../views/pages/snippet-app";

function App() {
  const location = useNavigationStore((state) => state.location);
  const [user, setUser] = useState<any>(null);
  const [waiting, setWaiting] = useState<boolean>(false);

  useEffect(() => {
    setWaiting(true);

    // Check initial auth state
    setUser(pb.authStore.model);
    setWaiting(false);

    // Subscribe to auth state changes
    const unsubscribe = pb.authStore.onChange((token, model) => {
      setUser(model);
    });

    return () => {
      unsubscribe();
    };
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
    <div className="h-screen w-screen overflow-hidden bg-background">
      {getPage()}
      {waiting && <Loader />}
    </div>
  );
}

export default App;
