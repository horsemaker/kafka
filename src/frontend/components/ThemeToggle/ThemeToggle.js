import React from "react";
import { useTheme } from "../../contexts";
import "./ThemeToggle.css";

export const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="theme-toggle">
      <span className="material-icons theme-mode">wb_sunny</span>
      <label htmlFor="theme-toggle" className="theme-toggle-label">
        <input
          type="checkbox"
          name="theme-toggle"
          id="theme-toggle"
          className="theme-toggle-input"
          checked={theme && theme === "dark"}
          onChange={toggleTheme}
        />
        <span className="theme-toggle-slider"></span>
      </label>
      <span className="material-icons theme-mode">dark_mode</span>
    </div>
  );
};
