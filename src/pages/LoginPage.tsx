import { useState } from "react";

import { useFirebaseAuth } from "../hooks/useFirebaseAuth";

const LoginPage = () => {
  const { login, signup } = useFirebaseAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleLogin = () => {
    login(email, password);
  };

  const handleSignUp = () => {
    signup(email, password);
  };

  return (
    <div className="form-login">
      <h1>Login</h1>
      <form action="">
        <div className="InputEmail">
          <label htmlFor="InputEmail">Email</label>
          <input
            type="email"
            name="email"
            className="email"
            value={email}
            onChange={handleEmailChange}
            placeholder="Type your email"
          />
        </div>
        <div className="InputPassword">
          <label htmlFor="InputPassword">Password</label>
          <input
            type="password"
            name="password"
            className="password"
            value={password}
            onChange={handlePasswordChange}
            placeholder="Type your password"
          />
        </div>
        <div className="buttons">
          <button type="submit" onClick={handleLogin}>
            Sign in
          </button>
          <button onClick={handleSignUp}>Sign up</button>
        </div>
      </form>
    </div>
  );
};

export { LoginPage };
