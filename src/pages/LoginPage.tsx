import { useState, useCallback } from "react";
import { useFirebaseAuth } from "../hooks/useFirebaseAuth";

const LoginPage = () => {
  const { login, signup } = useFirebaseAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isregister, setRegister] = useState(true);

  const handelClick = useCallback(
    () => (isregister ? handleLogin : handleSignUp),
    [isregister]
  );

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleLogin = () => {
    login(email, password);
    console.log("loggIn");
  };

  const handleSignUp = () => {
    signup(email, password);
    console.log("signUp");
  };

  const handelClickLink = () => {
    if (isregister) {
      return setRegister(false);
    }
    return setRegister(true);
  };

  return (
    <div className="form-login">
      <h1>{isregister ? "Login" : "Register"}</h1>
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

        {!isregister && (
          <div className="InputPassword">
            <label htmlFor="InputPassword">Repeat Password</label>
            <input
              type="password"
              name="repeat-password"
              className="password"
              value={password}
              onChange={handlePasswordChange}
              placeholder="Type your password"
            />
          </div>
        )}

        <div className="buttons">
          <button type="submit" onClick={handelClick}>
            {isregister ? "Sign in" : "Sign up"}
          </button>
        </div>
      </form>
      <div className="link-signup">
        <h3>Or {isregister ? "Sign Up" : "Sign In"} Using</h3>
        <a href="#" onClick={handelClickLink}>
          {isregister ? "SIGN UP" : "SIGN IN"}
        </a>
      </div>
    </div>
  );
};

export { LoginPage };
