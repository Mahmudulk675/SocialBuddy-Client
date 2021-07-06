import React, { useContext, useRef } from "react";
import { AuthContext } from "../../context/AuthContext";
import { loginCall } from "../ApiCalls";
import { CircularProgress } from "@material-ui/core";
import "./Login.css";

const Login = () => {
  const email = useRef();
  const password = useRef();
  const { user, isFetching, dispatch } = useContext(AuthContext);

  const handleClick = (e) => {
    e.preventDefault();
    loginCall(
      { email: email.current.value, password: password.current.value },
      dispatch
    );
  };
  console.log(user);
  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">SocialBuddy</h3>
          <span className="loginDesc">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ut,
            suscipit!
          </span>
        </div>
        <div className="loginRight">
          <form onSubmit={handleClick} className="loginBox">
            <input
              placeholder="Email"
              type="email"
              className="loginInput"
              ref={email}
              required
              defaultValue="test@gmail.com"
            />
            <input
              placeholder="Password"
              type="password"
              className="loginInput"
              ref={password}
              minLength="5"
              required
              defaultValue="123456"
            />
            <button className="loginButton" type="submit" disabled={isFetching}>
              {isFetching ? (
                <CircularProgress color="while" size="20px" />
              ) : (
                "Log In"
              )}{" "}
            </button>
            <span className="loginForgot">Forgot Password?</span>
            <button className="loginRegisterButton">
              {isFetching ? (
                <CircularProgress color="while" size="20px" />
              ) : (
                "Create a New Account"
              )}{" "}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
