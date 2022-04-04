import React from "react";
import { NavLink } from "react-router-dom";
import { useNotes } from "../../contexts";
import "./ShrinkedSidebar.css";

export const ShrinkedSidebar = () => {
  const { uniqueTags } = useNotes();

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
      {uniqueTags.map((tag) => (
        <NavLink
          key={tag}
          to={`/tags/${tag}`}
          className={({ isActive }) =>
            isActive
              ? "shrinked-sidebar-link active-link"
              : "shrinked-sidebar-link"
          }
        >
          <span className="material-icons-outlined sidebar-icon">label</span>
        </NavLink>
      ))}
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
