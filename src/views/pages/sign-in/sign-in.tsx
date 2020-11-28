import React, { useState } from "react";
import OutlineButton from "../../components/outline-button";
import OutlineInput from "../../components/outline-input";
import "./sign-in.scss";

const SignIn = () => {
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
        title="Sign In"
        style={{ fontSize: "16px", fontWeight: "600" }}
        onClick={() => {}}
      />
    </div>
  );
};

export default SignIn;
