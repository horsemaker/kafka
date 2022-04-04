import React, { useRef } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  KAFKA_AUTH_USER_DATA,
  KAFKA_AUTH_USER_TOKEN,
  LOGO_DARK,
  LOGO_LIGHT,
} from "../../constants";
import {
  useAuth,
  useExpandedSidebar,
  useNotes,
  useTheme,
} from "../../contexts";
import {
  useLockBodyScroll,
  useOnClickOutside,
  useWindowSize,
} from "../../hooks";
import "./ExpandedSidebar.css";

export const ExpandedSidebar = () => {
  const expandedSidebar = useRef();

  const navigate = useNavigate();

  const { theme } = useTheme();
  const { auth, setAuth } = useAuth();
  const { setShowExpandedSidebar } = useExpandedSidebar();

  const size = useWindowSize();

  const { uniqueTags } = useNotes();

  useLockBodyScroll();

  useOnClickOutside(expandedSidebar, () => {
    if (size.width <= 700) {
      setShowExpandedSidebar(false);
    }
  });

  const linkClickHandler = () => {
    if (size.width <= 700) {
      setShowExpandedSidebar(false);
    }
  };

  const signOutHandler = () => {
    localStorage.removeItem(KAFKA_AUTH_USER_TOKEN);
    localStorage.removeItem(KAFKA_AUTH_USER_DATA);
    setShowExpandedSidebar(false);
    setAuth({
      status: false,
      token: null,
      user: null,
    });
    navigate("/");
  };

  return (
    <div ref={expandedSidebar} className="expanded-sidebar">
      <header className="sidebar-header">
        <section>
          <button
            className="nav-menu"
            onClick={() => setShowExpandedSidebar(false)}
          >
            <span className="material-icons nav-menu-icon">close</span>
          </button>
        </section>
        <section className="nav-brand">
          <NavLink className="nav-brand-link" to="/" onClick={linkClickHandler}>
            <img
              src={theme === "light" ? LOGO_LIGHT : LOGO_DARK}
              className="nav-brand-logo"
              alt="Kafka"
            />
            <h1 className="nav-brand-name">Kafka</h1>
          </NavLink>
        </section>
      </header>
      <NavLink
        to="/search"
        className={({ isActive }) =>
          isActive
            ? "expanded-sidebar-link search-link active-link"
            : "expanded-sidebar-link search-link"
        }
        onClick={linkClickHandler}
      >
        <span className="material-icons-outlined sidebar-icon">search</span>
        <span className="sidebar-option">Search</span>
      </NavLink>
      <NavLink
        to="/notes"
        className={({ isActive }) =>
          isActive
            ? "expanded-sidebar-link active-link"
            : "expanded-sidebar-link"
        }
        onClick={linkClickHandler}
      >
        <span className="material-icons-outlined sidebar-icon">
          description
        </span>
        <span className="sidebar-option">Notes</span>
      </NavLink>
      <NavLink
        to="/archives"
        className={({ isActive }) =>
          isActive
            ? "expanded-sidebar-link active-link"
            : "expanded-sidebar-link"
        }
        onClick={linkClickHandler}
      >
        <span className="material-icons-outlined sidebar-icon">archive</span>
        <span className="sidebar-option">Archives</span>
      </NavLink>
      {uniqueTags.map((tag) => (
        <NavLink
          key={tag}
          to={`/tags/${tag}`}
          className={({ isActive }) =>
            isActive
              ? "expanded-sidebar-link active-link"
              : "expanded-sidebar-link"
          }
          onClick={linkClickHandler}
        >
          <span className="material-icons-outlined sidebar-icon">label</span>
          <span className="sidebar-option">{tag}</span>
        </NavLink>
      ))}
      <NavLink
        to="/trash"
        className={({ isActive }) =>
          isActive
            ? "expanded-sidebar-link active-link"
            : "expanded-sidebar-link"
        }
        onClick={linkClickHandler}
      >
        <span className="material-icons-outlined sidebar-icon">delete</span>
        <span className="sidebar-option">Trash</span>
      </NavLink>
      <div className="expanded-sidebar-link" onClick={linkClickHandler}>
        <span className="material-icons-outlined sidebar-icon">settings</span>
        <span className="sidebar-option">Settings</span>
      </div>
      <div className="expanded-sidebar-account">
        <div>
          <span className="nav-account-name">Hi, {auth.user?.firstName}</span>
          <div className="nav-account-list">
            <span>Account</span>
            <span className="material-icons nav-account-dropdown-icon">
              arrow_drop_up
            </span>
          </div>
        </div>
        <button onClick={signOutHandler}>
          <span className="material-icons-outlined sidebar-icon">logout</span>
        </button>
      </div>
    </div>
  );
};
