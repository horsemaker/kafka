import React from "react";
import { Route, Routes } from "react-router-dom";
import { HomeScreen } from "../../screens";
import "./Main.css";

export const Main = () => {
  return (
    <Routes>
      <Route path="/" element={<HomeScreen />} />
      <Route path="/signup" element={<></>} />
      <Route path="/signip" element={<></>} />
    </Routes>
  );
};
