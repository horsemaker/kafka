import React from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { LOGO_DARK, LOGO_LIGHT } from "../../constants";
import { useAuth, useTheme } from "../../contexts";
import "./Header.css";
import { ThemeToggle } from "./../../components";

export const Header = () => {
  const { theme } = useTheme();
  const { auth } = useAuth();

  const navMenuForbiddenPaths = ["/", "/signin", "/signup"];
  const { pathname } = useLocation();

  const navigate = useNavigate();

  return (
    <header className="header">
      <nav className="nav">
        {!navMenuForbiddenPaths.includes(pathname) && (
          <section>
            <button className="nav-menu">
              <span className="material-icons nav-menu-icon">menu</span>
            </button>
          </section>
        )}
        <section className="nav-brand">
          <NavLink className="nav-brand-link" to="/">
            <img
              src={theme === "light" ? LOGO_LIGHT : LOGO_DARK}
              className="nav-brand-logo"
              alt="Kafka"
            />
            <h1 className="nav-brand-name">Kafka</h1>
          </NavLink>
        </section>
        {auth.status && (
          <section className="nav-search">
            <NavLink className="nav-search-link" to="/search">
              <span className="material-icons nav-search-icon nav-icon">
                search
              </span>
              <input
                className="nav-search-input"
                type="text"
                placeholder="Search"
                name="nav-search-input"
                id="nav-search-input"
              />
            </NavLink>
          </section>
        )}
        <section className="nav-theme-toggle">
          <ThemeToggle />
        </section>
        {navMenuForbiddenPaths.includes(pathname) && !auth.status && (
          <section className="nav-authorization">
            <button className="btn" onClick={() => navigate("/signin")}>
              Sign In
            </button>
            <button
              className="btn btn-primary"
              onClick={() => navigate("/signup")}
            >
              Sign Up
            </button>
          </section>
        )}
        {auth.status && (
          <section className="nav-account">
            <span className="nav-account-name">Hi, {auth.user.firstName}</span>
            <div className="nav-account-list">
              <span>Account</span>
              <span className="material-icons nav-account-dropdown-icon">
                arrow_drop_down
              </span>
            </div>
          </section>
        )}
      </nav>
    </header>
  );
};
