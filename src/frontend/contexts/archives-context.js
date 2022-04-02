import { useReducer, useEffect, createContext, useContext } from "react";
import { SET_ARCHIVES } from "../constants";
import { archivesReducer } from "../reducers";
import { getArchivesService } from "../services";
import { useAuth } from "./auth-context";

const ArchivesContext = createContext();

const ArchivesProvider = ({ children }) => {
  const [archives, dispatchArchives] = useReducer(archivesReducer, []);

  const { auth } = useAuth();

  useEffect(() => {
    if (auth.status) {
      (async () => {
        const response = await getArchivesService(auth.token);
        if (response !== undefined) {
          dispatchArchives({ type: SET_ARCHIVES, payload: response });
        }
      })();
    } else {
      dispatchArchives({ type: SET_ARCHIVES, payload: [] });
    }
  }, [auth]);

  return (
    <ArchivesContext.Provider value={{ archives, dispatchArchives }}>
      {children}
    </ArchivesContext.Provider>
  );
};

const useArchives = () => {
  const context = useContext(ArchivesContext);

  if (context === undefined) {
    throw new Error("useArchives must be used within a ArchivesProvider");
  }

  return context;
};

export { ArchivesProvider, useArchives };
