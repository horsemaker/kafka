import React, { useRef, useState } from "react";
import { KAFKA_AUTH_USER_DATA, KAFKA_AUTH_USER_TOKEN } from "../../constants";
import { useAuth } from "../../contexts";
import { useOnClickOutside } from "./../../hooks";
import "./AccountDropdownMenu.css";

export const AccountDropdownMenu = () => {
  const dropdownMenuRef = useRef();

  const [isDropdownMenuOpen, setIsDropdownMenuOpen] = useState(false);
  const toggleDropdown = () =>
    setIsDropdownMenuOpen((isDropdownMenuOpen) => !isDropdownMenuOpen);

  useOnClickOutside(dropdownMenuRef, () => setIsDropdownMenuOpen(false));

  const { auth, setAuth } = useAuth();

  const signOutHandler = () => {
    localStorage.removeItem(KAFKA_AUTH_USER_TOKEN);
    localStorage.removeItem(KAFKA_AUTH_USER_DATA);
    setAuth({
      status: false,
      token: null,
      user: null,
    });
  };

  return (
    <section
      ref={dropdownMenuRef}
      className="nav-account"
      onClick={toggleDropdown}
    >
      <div>
        <span className="nav-account-name">Hi, {auth.user.firstName}</span>
        <div className="nav-account-list">
          <span>Account</span>
          <span className="material-icons nav-account-dropdown-icon">
            arrow_drop_down
          </span>
        </div>
      </div>
      {isDropdownMenuOpen && (
        <div className="dropdown-menu">
          <ul className="list-simple list-cursor-pointer list-style-none">
            <li>Profile</li>
            <li onClick={signOutHandler}>Sign Out</li>
          </ul>
        </div>
      )}
    </section>
  );
};
