import { useState } from "react";
import { useForm } from "react-hook-form";
import { useFirebaseAuth, useToast } from "../../../hooks";

const LoginForm = ({ isSignInForm }: IProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const { login, signup } = useFirebaseAuth();
  const { showToast } = useToast();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

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

  const onSubmit = () => {
    if (isSignInForm) {
      login(email, password);
      showToast("success", "Successfully logged in");
    } else if (!isSignInForm) {
      if (password !== passwordConfirmation) {
        showToast("error", "Passwords do not match");
        return;
      }
      signup(email, password);
    }
  };

  const onError = () => {
    if (isSignInForm) {
      login(email, password);
    } else if (!isSignInForm) {
      if (password !== passwordConfirmation) {
        showToast("error", "Passwords do not match");
        return;
      }
      signup(email, password);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit, onError)} className="login-form">
      <div className="form-field">
        <label htmlFor="email">Email</label>
        <input
          {...register("email", { required: true })}
          id="email"
          type="email"
          name="email"
          className="email"
          value={email}
          onChange={handleEmailChange}
          placeholder="Type your email"
        />
        {errors.email && <p className="form-field">Email required.</p>}
      </div>
      <div className="form-field">
        <label htmlFor="password">Password</label>
        <input
          {...register("password", { required: true, minLength: 7 })}
          id="password"
          type="password"
          name="password"
          className="password"
          value={password}
          onChange={handlePasswordChange}
          placeholder="Type your password"
        />
        {errors.password && (
          <p className="form-field">
            Password required and length must be at least 7 or more.
          </p>
        )}
      </div>
      {!isSignInForm && (
        <div className="form-field">
          <label htmlFor="repeatPassword">Confirm Password</label>
          <input
            {...register("repeatPassword", { required: true, minLength: 7 })}
            id="repeatPassword"
            type="password"
            name="repeat-password"
            className="password"
            value={passwordConfirmation}
            onChange={handlePasswordConfirmationChange}
            placeholder="Type your password"
          />
          {errors.password && (
            <p className="form-field">
              Password required, length must be at least 7 or more and must
              match password field.
            </p>
          )}
        </div>
      )}

      <div className="form-buttons">
        <button type="submit">{isSignInForm ? "Sign in" : "Sign up"}</button>
      </div>
    </form>
  );
};

type IProps = {
  isSignInForm: boolean;
};

export { LoginForm };
