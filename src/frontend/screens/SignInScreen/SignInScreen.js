import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { KAFKA_AUTH_USER_DATA, KAFKA_AUTH_USER_TOKEN } from "../../constants";
import { useAuth } from "../../contexts";
import { signInService } from "../../services";
import "./SignInScreen.css";

export const SignInScreen = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [showCredentialsError, setShowCredentialsError] = useState(false);

  const { setAuth } = useAuth();
  const navigate = useNavigate();

  const signInHandler = async (user) => {
    const userInformation = await signInService(user);
    if (
      userInformation !== undefined &&
      userInformation.userToken !== undefined
    ) {
      setShowCredentialsError(false);
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
    } else {
      setShowCredentialsError(true);
    }
  };

  return (
    <div className="auth-screen">
      <div className="form-wrapper">
        <form
          className="form"
          onSubmit={(e) => {
            e.preventDefault();
            signInHandler(user);
          }}
        >
          <h1 className="form-heading">Sign In</h1>
          <div className="input-group input-email">
            <label htmlFor="form-email">Email*</label>
            <input
              className="input"
              type="email"
              name="form-email"
              id="form-email"
              placeholder="iamhorsemaker@gmail.com"
              required
              value={user.email}
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
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
            />
          </div>
          {showCredentialsError && (
            <small className="error-message">Wrong Credentials!</small>
          )}
          <div className="input-group input-checkbox">
            <input
              className="kafka-input"
              type="checkbox"
              name="signin"
              id="signin-remember-me"
            />
            <label htmlFor="signin-remember-me">Remember Me</label>
          </div>
          <div className="input-submit">
            <button type="submit" className="btn btn-auth btn-primary">
              Sign In
            </button>
          </div>
          <div className="input-submit">
            <button
              type="button"
              className="btn btn-auth btn-secondary"
              onClick={(e) => {
                e.preventDefault();
                setUser({
                  email: "iamhorsemaker@gmail.com",
                  password: "horsemaker123",
                });
                signInHandler({
                  email: "iamhorsemaker@gmail.com",
                  password: "horsemaker123",
                });
              }}
            >
              Sign In as a Guest
            </button>
          </div>
          <span className="auth-link-message">
            New here?{" "}
            <Link to="/signup" className="auth-link">
              Create an account!
            </Link>
          </span>
        </form>
      </div>
    </div>
  );
};
