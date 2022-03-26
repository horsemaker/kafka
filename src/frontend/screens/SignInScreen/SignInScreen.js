import React from "react";
import { Link } from "react-router-dom";
import "./SignInScreen.css";

export const SignInScreen = () => {
  return (
    <div className="auth-screen">
      <div className="form-wrapper">
        <form className="form">
          <h1 className="form-heading">Sign In</h1>
          <div className="input-group input-email">
            <label htmlFor="form-email">Email*</label>
            <input
              className="input"
              type="email"
              name="form-email"
              id="form-email"
              placeholder="adarshbalika@gmail.com"
              required
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
            />
          </div>
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
            <button type="button" className="btn btn-auth btn-secondary">
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
