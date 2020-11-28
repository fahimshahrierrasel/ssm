import React, { useState } from "react";
import { useDispatch } from "react-redux";
import OutlineButton from "../../components/outline-button";
import OutlineInput from "../../components/outline-input";
import { snippetHome } from "../../../data/state/reducers";
import "./sign-in.scss";

const SignIn = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  return (
    <div className="sign-in">
      <h1>Simple Snippet Manager</h1>
      <OutlineInput
        placeholder="Email"
        value={email}
        onChange={(val: string) => setEmail(val)}
      />
      <OutlineInput
        placeholder="Password"
        value={password}
        isPassword
        onChange={(val: string) => setPassword(val)}
      />
      <OutlineButton
        title="SIGN IN"
        style={{ fontSize: "16px", fontWeight: "600" }}
        onClick={() => {
          dispatch(snippetHome());
        }}
      />
    </div>
  );
};

export default SignIn;
