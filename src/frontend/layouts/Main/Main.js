import React from "react";
import { Route, Routes } from "react-router-dom";
import { HomeScreen, SignInScreen, SignUpScreen } from "../../screens";
import "./Main.css";

export const Main = () => {
  return (
    <div className="main">
      <Routes>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/signin" element={<SignInScreen />} />
        <Route path="/signup" element={<SignUpScreen />} />
      </Routes>
    </div>
  );
};
