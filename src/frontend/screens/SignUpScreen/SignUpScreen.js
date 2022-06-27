import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { KAFKA_AUTH_USER_DATA, KAFKA_AUTH_USER_TOKEN } from "../../constants";
import { useAuth } from "../../contexts";
import { signUpService } from "../../services";

export const SignUpScreen = () => {
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const { firstName, lastName, email, password, confirmPassword } = user;

  const { setAuth } = useAuth();
  const navigate = useNavigate();

  const signUpHandler = async (user) => {
    const userInformation = await signUpService(user);
    if (
      userInformation !== undefined &&
      userInformation.userToken !== undefined
    ) {
      localStorage.setItem(KAFKA_AUTH_USER_TOKEN, userInformation.userToken);
      localStorage.setItem(
        KAFKA_AUTH_USER_DATA,
        JSON.stringify(userInformation.userData)
      );
      setAuth({
        status: true,
        token: userInformation.userToken,
        user: userInformation.userData,
      });
      navigate(-1);
    }
  };

  return (
    <div className="auth-screen">
      <div className="form-wrapper">
        <form
          className="form"
          onSubmit={(e) => {
            e.preventDefault();
            signUpHandler(user);
          }}
        >
          <h1 className="form-heading">Sign Up</h1>
          <div className="input-group input-text">
            <label htmlFor="for-first-name">First Name*</label>
            <input
              className="input"
              type="text"
              name="form-first-name"
              id="form-first-name"
              placeholder="Yash"
              required
              value={firstName}
              onChange={(e) =>
                setUser({
                  ...user,
                  firstName: e.target.value,
                })
              }
            />
          </div>
          <div className="input-group input-text">
            <label htmlFor="for-last-name">Last Name*</label>
            <input
              className="input"
              type="text"
              name="form-last-name"
              id="form-last-name"
              placeholder="Ghodekar"
              required
              value={lastName}
              onChange={(e) => setUser({ ...user, lastName: e.target.value })}
            />
          </div>
          <div className="input-group input-email">
            <label htmlFor="form-email">Email*</label>
            <input
              className="input"
              type="email"
              name="form-email"
              id="form-email"
              placeholder="iamhorsemaker@gmail.com"
              required
              value={email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
            />
          </div>
          <div className="input-group input-password">
            <label htmlFor="form-password">Password*</label>
            <input
              className="input"
              type="password"
              name="form-password"
              id="form-password"
              required
              value={password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
            />
          </div>
          <div className="input-group input-password">
            <label htmlFor="form-confirmPassword">Confirm Password*</label>
            <input
              className="input"
              type="password"
              name="form-confirmPassword"
              id="form-confirmPassword"
              required
              value={confirmPassword}
              onChange={(e) =>
                setUser({
                  ...user,
                  confirmPassword: e.target.value,
                })
              }
            />
          </div>
          {password !== "" &&
            confirmPassword !== "" &&
            password !== confirmPassword && (
              <small className="error-message">Passwords don't match!</small>
            )}
          <div className="input-submit">
            <button type="submit" className="btn btn-auth btn-primary">
              Sign Up
            </button>
          </div>
          <span className="auth-link-message">
            Existing user?{" "}
            <Link to="/signin" className="auth-link">
              Login here!
            </Link>
          </span>
        </form>
      </div>
    </div>
  );
};
