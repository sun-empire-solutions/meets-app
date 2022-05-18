import React, { Component } from "react";
import fire from "../FirebaseConfig/firebase";

const Login = () => {
  user = React.createRef();
  password = React.createRef();

  const constructor = (props) => {
    super(props);
    this.login = this.login.bind(this);
    this.signup = this.signup.bind(this);
  };
  const login = (e) => {
    e.preventDefault();
    var myuser = this.user.current.value;
    var mypassword = this.password.current.value;

    fire
      .auth()
      .signInWithEmailAndPassword(myuser, mypassword)
      .then((u) => {})
      .catch(function (error) {
        console.log(error);
      });
  };
  const signup = (e) => {
    e.preventDefault();
    var myuser = this.user.current.value;
    var mypassword = this.password.current.value;

    fire
      .auth()
      .createUserWithEmailAndPassword(myuser, mypassword)
      .then((u) => {})
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <div className="form-login">
      <form action="">
        <div className="InputEmail">
          <label htmlFor="InputEmail">Email</label>
          <input type="email" name="email" className="email" ref={this.user} />
        </div>
        <div className="InputPassword">
          <label htmlFor="InputPassword">Email</label>
          <input
            type="password"
            name="password"
            className="password"
            ref={this.password}
          />
        </div>
        <button type="submit" onClick={this.login}>
          Login
        </button>
        <button onClick={this.signup}>Registrarse</button>
      </form>
    </div>
  );
};

export { Login };
