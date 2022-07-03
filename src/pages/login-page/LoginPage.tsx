import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";

import { useFirebaseAuth } from "../../hooks/useFirebaseAuth";
import { LoginForm } from "./LoginForm";

const LoginPage = () => {
  const { loginWithGoogle, loginWithFacebook } = useFirebaseAuth();
  const [isSignInShowing, setIsSignInShowing] = useState(true);

  return (
    <div className="login-page">
      <h1 className="login-page_title">
        {isSignInShowing ? "Sign in" : "Sign up"}
      </h1>
      <LoginForm isSignInForm={isSignInShowing} />
      {isSignInShowing && (
        <div className="login-page_providers">
          <h3>Or Sign in Using</h3>
          <div className="buttons">
            <div className="icon google-icon">
              <FcGoogle size={45} onClick={loginWithGoogle} />
            </div>
            <div className="icon facebook-icon">
              <FaFacebook size={45} onClick={loginWithFacebook} />
            </div>
          </div>
        </div>
      )}
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
