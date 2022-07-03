import { useState } from "react";

import { LoginForm } from "./components/LoginForm";
import { LoginProviders } from "./components/LoginProviders";

const LoginPage = () => {
  const [isSignInShowing, setIsSignInShowing] = useState(true);

  return (
    <div className="login-page">
      <h1 className="login-page_title">
        {isSignInShowing ? "Sign in" : "Sign up"}
      </h1>
      <LoginForm isSignInForm={isSignInShowing} />
      {isSignInShowing && <LoginProviders />}
      <div className="login-page_switcher">
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
