import { useState } from "react";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";

import { useFirebaseAuth, useToast } from "@/hooks";

const LoginForm = ({ isSignInForm }: IProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const { login, signup } = useFirebaseAuth();
  const { showToast } = useToast();
  const {
    register,
    handleSubmit,
    clearErrors,
    getValues,
    setValue,
    formState: { errors },
  } = useForm({ defaultValues: { email, password, passwordConfirmation } });

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handlePasswordConfirmationChange = (event) => {
    setPasswordConfirmation(event.target.value);
  };

  const onSubmit = () => {
    if (isSignInForm) {
      login(email, password);
      showToast("success", "Successfully logged in");
      return;
    }
    if (password !== passwordConfirmation) {
      showToast("error", "Passwords do not match");
      return;
    }
    signup(email, password);
  };

  const onError = (error) => {
    console.log(error);

    setTimeout(() => {
      clearErrors();
    }, 3000);
  };

  const renderErrorMessage = ({ message }) => (
    <p className="error-message">{message}</p>
  );

  return (
    <form onSubmit={handleSubmit(onSubmit, onError)} className="login-form">
      <div className="form-field">
        <label htmlFor="email">Email</label>
        <input
          {...register("email", { required: "This field is required" })}
          id="email"
          type="email"
          name="email"
          className="email"
          value={email}
          onChange={handleEmailChange}
          placeholder="Type your email"
        />
        <ErrorMessage
          errors={errors}
          name="email"
          render={renderErrorMessage}
        />
      </div>
      <div className="form-field">
        <label htmlFor="password">Password</label>
        <input
          {...register("password", {
            required: "This field is required",
            minLength: 7,
          })}
          id="password"
          type="password"
          name="password"
          className="password"
          value={password}
          onChange={handlePasswordChange}
          placeholder="Type your password"
        />
        <ErrorMessage
          errors={errors}
          name="password"
          render={renderErrorMessage}
        />
      </div>
      {!isSignInForm && (
        <div className="form-field">
          <label htmlFor="repeatPassword">Confirm Password</label>
          <input
            {...register("passwordConfirmation", {
              required: "This field is required",
              minLength: 7,
            })}
            id="repeatPassword"
            type="password"
            name="passwordConfirmation"
            className="password"
            value={passwordConfirmation}
            onChange={handlePasswordConfirmationChange}
            placeholder="Type your password"
          />
          <ErrorMessage
            errors={errors}
            name="passwordConfirmation"
            render={renderErrorMessage}
          />
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
