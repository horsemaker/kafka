import React from "react";
import { NavLink } from "react-router-dom";
import "./ShrinkedSidebar.css";

export const ShrinkedSidebar = () => {
  return (
    <div className="shrinked-sidebar">
      <NavLink
        to="/search"
        className={({ isActive }) =>
          isActive
            ? "shrinked-sidebar-link search-link active-link"
            : "shrinked-sidebar-link search-link"
        }
      >
        <span className="material-icons-outlined sidebar-icon">search</span>
      </NavLink>
      <NavLink
        to="/notes"
        className={({ isActive }) =>
          isActive
            ? "shrinked-sidebar-link active-link"
            : "shrinked-sidebar-link"
        }
      >
        <span className="material-icons-outlined sidebar-icon">
          description
        </span>
      </NavLink>
      <NavLink
        to="/archives"
        className={({ isActive }) =>
          isActive
            ? "shrinked-sidebar-link active-link"
            : "shrinked-sidebar-link"
        }
      >
        <span className="material-icons-outlined sidebar-icon">archive</span>
      </NavLink>
      <NavLink
        to="/labels"
        className={({ isActive }) =>
          isActive
            ? "shrinked-sidebar-link active-link"
            : "shrinked-sidebar-link"
        }
      >
        <span className="material-icons-outlined sidebar-icon">label</span>
      </NavLink>
      <NavLink
        to="/trash"
        className={({ isActive }) =>
          isActive
            ? "shrinked-sidebar-link active-link"
            : "shrinked-sidebar-link"
        }
      >
        <span className="material-icons-outlined sidebar-icon">delete</span>
      </NavLink>
      <span className="material-icons-outlined shrinked-sidebar-link sidebar-icon">
        settings
      </span>
    </div>
  );
};
