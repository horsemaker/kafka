import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import {
  AuthProvider,
  ExpandedSidebarProvider,
  NotesProvider,
  ThemeProvider,
} from "./frontend/contexts";
import { makeServer } from "./server";

// Call make Server
makeServer();

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <AuthProvider>
          <ExpandedSidebarProvider>
            <NotesProvider>
              <App />
            </NotesProvider>
          </ExpandedSidebarProvider>
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
