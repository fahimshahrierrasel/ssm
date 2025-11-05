import { useEffect, useState } from "react";
import { User, onAuthStateChanged } from "firebase/auth";
import { navigationsPath } from "../data/constants";
import firebaseApp from "../data/firebase";
import { useNavigationStore } from "../data/state/navigationStore";
import Loader from "../views/components/loader";
import Preferences from "../views/pages/preferences";
import SignIn from "../views/pages/sign-in";
import SnippetApp from "../views/pages/snippet-app";

function App() {
  const location = useNavigationStore((state) => state.location);
  const [user, setUser] = useState<User | null>(null);
  const [waiting, setWaiting] = useState<boolean>(false);

  useEffect(() => {
    setWaiting(true);
    const unsubscribe = onAuthStateChanged(
      firebaseApp.auth,
      (user) => {
        setUser(user);
        setWaiting(false);
      },
      (error) => {
        setWaiting(false);
        console.error(error);
      }
    );

    return () => unsubscribe();
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
