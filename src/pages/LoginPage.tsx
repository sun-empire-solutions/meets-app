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
      <form action="">
        <div className="InputEmail">
          <label htmlFor="InputEmail">Email</label>
          <input
            type="email"
            name="email"
            className="email"
            value={email}
            onChange={handleEmailChange}
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
          />
        </div>
        <button type="submit" onClick={handleLogin}>
          Login
        </button>
        <button onClick={handleSignUp}>Registrarse</button>
      </form>
    </div>
  );
};

export { LoginPage };
