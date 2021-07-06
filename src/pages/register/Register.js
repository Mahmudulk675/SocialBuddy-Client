import axios from "axios";
import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router";
import "./Register.css";

const Register = () => {
  const email = useRef();
  const password = useRef();
  const passwordAgain = useRef();
  const username = useRef();
  const history = useHistory();

  const handleClick = async (e) => {
    e.preventDefault();
    if (passwordAgain.current.value !== password.current.value) {
      passwordAgain.current.setCustomValidity("Passwords don't match!");
    } else {
      const user = {
        username: username.current.value,
        email: email.current.value,
        password: password.current.value,
      };
      try {
        await axios.post(
          "https://frozen-bastion-16792.herokuapp.com/api/auth/register",
          user
        );
        history.push("/login");
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">SocialBuddy</h3>
          <span className="loginDesc">
            Connect with friends and the world around you on SocialBuddy.
          </span>
        </div>
        <div className="loginRight">
          <form onSubmit={handleClick} className="loginBox">
            <input
              placeholder="Username"
              type="text"
              className="loginInput"
              ref={username}
              required
            />
            <input
              placeholder="Email"
              type="email"
              className="loginInput"
              ref={email}
              required
            />
            <input
              placeholder="Password"
              type="password"
              className="loginInput"
              ref={password}
              required
              minLength="5"
            />
            <input
              placeholder="Password Again"
              type="password"
              className="loginInput"
              ref={passwordAgain}
              required
            />
            <button className="loginButton" type="submit">
              Sign Up
            </button>
            {/* <button className="loginRegisterButton">Log into Account</button> */}
            <Link className="loginBtnLink" to="/login">
              <button className="loginRegisterButton">Demo Login</button>
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
