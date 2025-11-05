import React, { useState, useRef, useEffect } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import firebaseApp from "../../../data/firebase";
import Loader from "../../components/loader";
import OutlineButton from "../../components/outline-button";
import OutlineInput from "../../components/outline-input";
import Portal from "../../portal";
import "./sign-in.scss";

const SignIn = () => {
  const [waiting, setWaiting] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const isMounted = useRef<boolean>(false);

  const loginUser = async () => {
    if (email.length < 3 || password.length < 3) {
      alert("Email and Password too short");
      return;
    }
    setWaiting(true);
    try {
      await signInWithEmailAndPassword(firebaseApp.auth, email, password);
      if (!isMounted.current) {
        setWaiting(false);
      }
    } catch (err) {
      if (!isMounted.current) {
        setWaiting(false);
      }
      console.error("Error on sign in", err);
    }
  };

  useEffect(() => {
    return () => {
      isMounted.current = true;
    };
  }, []);

  return (
    <div className="sign-in">
      <h1>Simple Snippet Manager</h1>
      <OutlineInput
        placeholder="Email"
        style={{ border: "1px solid black" }}
        value={email}
        onChange={(val: string) => setEmail(val)}
      />
      <OutlineInput
        placeholder="Password"
        value={password}
        style={{ border: "1px solid black" }}
        isPassword
        onChange={(val: string) => setPassword(val)}
      />
      <OutlineButton
        title="SIGN IN"
        style={{ fontSize: "16px", fontWeight: "600" }}
        onClick={loginUser}
      />
      {waiting && (
        <Portal>
          <Loader />
        </Portal>
      )}
    </div>
  );
};

export default SignIn;
