import React from "react";
import { Link } from "react-router-dom";

export const SignUpScreen = () => {
  return (
    <div className="auth-screen">
      <div className="form-wrapper">
        <form className="form">
          <h1 className="form-heading">Sign Up</h1>
          <div className="input-group input-text">
            <label htmlFor="for-first-name">First Name*</label>
            <input
              className="input"
              type="text"
              name="form-first-name"
              id="form-first-name"
              placeholder="Adarsh"
              required
            />
          </div>
          <div className="input-group input-text">
            <label htmlFor="for-last-name">Last Name*</label>
            <input
              className="input"
              type="text"
              name="form-last-name"
              id="form-last-name"
              placeholder="Balika"
              required
            />
          </div>
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
          <div className="input-group input-password">
            <label htmlFor="form-confirmPassword">Confirm Password*</label>
            <input
              className="input"
              type="password"
              name="form-confirmPassword"
              id="form-confirmPassword"
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
