import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { PrivateRoute } from "../../components/PrivateRoute/PrivateRoute";
import { useAuth } from "../../contexts";
import { HomeScreen, SignInScreen, SignUpScreen } from "../../screens";
import "./Main.css";

export const Main = () => {
  const { auth } = useAuth();

  return (
    <div className="main">
      <Routes>
        <Route path="/" element={<HomeScreen />} />
        {!auth.status && (
          <>
            <Route path="/signin" element={<SignInScreen />} />
            <Route path="/signup" element={<SignUpScreen />} />
          </>
        )}
        <Route
          path="/notes"
          element={
            <PrivateRoute>
              <></>
            </PrivateRoute>
          }
        />
        <Route
          path="/archives"
          element={
            <PrivateRoute>
              <></>
            </PrivateRoute>
          }
        />
        <Route path="/*" element={<Navigate replace to="/" />} />
      </Routes>
    </div>
  );
};
