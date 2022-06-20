import { useState, useCallback } from "react";
import { useFirebaseAuth } from "../hooks/useFirebaseAuth";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";

const LoginPage = () => {
  const { login, signup, loginWithGoogle, loginWithFacebook } =
    useFirebaseAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [isSignInShowing, setIsSignInShowing] = useState(true);

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };
  const handlePasswordConfirmationChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPasswordConfirmation(event.target.value);
  };

  const handleLogin = () => {
    login(email, password);
  };

  const handleSignUp = () => {
    if (password !== passwordConfirmation) {
      alert("Password must match!");
      return;
    }
    signup(email, password);
  };

  const handleGoogleLogin = () => {
    loginWithGoogle();
  };

  const handleFacebookLogin = () => {
    loginWithFacebook();
  };

  return (
    <div className="login-page">
      <h1 className="login-page_title">
        {isSignInShowing ? "Sign in" : "Sign up"}
      </h1>
      <div className="login-page_form">
        <div className="form-field">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            name="email"
            className="email"
            value={email}
            onChange={handleEmailChange}
            placeholder="Type your email"
          />
        </div>
        <div className="form-field">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            name="password"
            className="password"
            value={password}
            onChange={handlePasswordChange}
            placeholder="Type your password"
          />
        </div>

        {!isSignInShowing && (
          <div className="form-field">
            <label htmlFor="repeatPassword">Confirm Password</label>
            <input
              id="repeatPassword"
              type="password"
              name="repeat-password"
              className="password"
              value={passwordConfirmation}
              onChange={handlePasswordConfirmationChange}
              placeholder="Type your password"
            />
          </div>
        )}

        <div className="form-buttons">
          <button onClick={isSignInShowing ? handleLogin : handleSignUp}>
            {isSignInShowing ? "Sign in" : "Sign up"}
          </button>
        </div>
      </div>
      {isSignInShowing && (
        <div className="form-buttons">
          <h3>Or Sign in Using</h3>
          <div className="buttons">
            <div className="icon google-icon">
              <FcGoogle size={45} onClick={handleGoogleLogin} />
            </div>
            <div className="icon facebook-icon">
              <FaFacebook size={45} onClick={handleFacebookLogin} />
            </div>
          </div>
        </div>
      )}
      <div className="form-bottom">
        <h3>
          {isSignInShowing
            ? "Don't you have an account?"
            : "Already have an account?"}
        </h3>
        <a
          href="#"
          role="button"
          onClick={() => {
            setIsSignInShowing((isSignInShowing) => !isSignInShowing);
          }}
        >
          {isSignInShowing ? "SIGN UP" : "SIGN IN"}
        </a>
      </div>
    </div>
  );
};

export { LoginPage };
