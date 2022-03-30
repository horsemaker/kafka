import React, { useRef } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { PrivateRoute } from "../../components";
import { useAuth, useExpandedSidebar } from "../../contexts";
import { useWindowSize } from "../../hooks";
import {
  HomeScreen,
  NotesScreen,
  SignInScreen,
  SignUpScreen,
} from "../../screens";
import { ExpandedSidebar } from "../ExpandedSidebar/ExpandedSidebar";
import { ShrinkedSidebar } from "../ShrinkedSidebar/ShrinkedSidebar";
import "./Main.css";

export const Main = () => {
  const expandedSidebarRef = useRef();

  const { auth } = useAuth();
  const { showExpandedSidebar } = useExpandedSidebar();

  const size = useWindowSize();

  const sidebarForbiddenPaths = ["/", "/signin", "/signup"];
  const { pathname } = useLocation();

  return (
    <div className="main">
      {!sidebarForbiddenPaths.includes(pathname) &&
        !showExpandedSidebar &&
        size.width > 700 && (
          <div className="sidebar">
            <ShrinkedSidebar />
          </div>
        )}
      {!sidebarForbiddenPaths.includes(pathname) && showExpandedSidebar && (
        <div ref={expandedSidebarRef} className="sidebar">
          <ExpandedSidebar />
        </div>
      )}
      <div className="screen">
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
                <NotesScreen />
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
          <Route
            path="/labels"
            element={
              <PrivateRoute>
                <></>
              </PrivateRoute>
            }
          />
          <Route
            path="/trash"
            element={
              <PrivateRoute>
                <></>
              </PrivateRoute>
            }
          />
          <Route
            path="/search"
            element={
              <PrivateRoute>
                <></>
              </PrivateRoute>
            }
          />
          <Route path="/*" element={<Navigate replace to="/" />} />
        </Routes>
      </div>
    </div>
  );
};
