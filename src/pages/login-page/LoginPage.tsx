import { useState } from "react";

import { LoginForm, LoginProviders } from "./components";

import loginSvg from "./../../assets/svg/for_login.svg";

const LoginPage = () => {
  const [isSignInShowing, setIsSignInShowing] = useState(true);

  return (
    <div className="login-page">
      <div className="left">
        <img src={loginSvg} alt="login-svg" />
      </div>
      <div className="right">
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
    </div>
  );
};

export { LoginPage };
