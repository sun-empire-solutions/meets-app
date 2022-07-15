import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useFirebaseAuth } from "../../../hooks";

const LoginForm = ({ isSignInForm }: IProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const { login, signup } = useFirebaseAuth();

  const diffToast = () => {
    toast.error("Password must match!", {
      position: "top-right",
    });
  };

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

  const handleLogin = (e) => {
    e.preventDefault();
    login(email, password);
  };

  const handleSignUp = (e) => {
    e.preventDefault();
    if (password !== passwordConfirmation) {
      diffToast();
      // alert("Password must match!");
      return;
    }
    signup(email, password);
  };

  return (
    <form className="login-form">
      <ToastContainer />
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
      {!isSignInForm && (
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
        <button onClick={isSignInForm ? handleLogin : handleSignUp}>
          {isSignInForm ? "Sign in" : "Sign up"}
        </button>
      </div>
    </form>
  );
};

type IProps = {
  isSignInForm: boolean;
};

export { LoginForm };
