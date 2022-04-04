import {
  useReducer,
  useState,
  useEffect,
  createContext,
  useContext,
} from "react";
import { SET_NOTES } from "../constants";
import { notesReducer } from "../reducers";
import { getNotesService } from "../services";
import { useAuth } from "./auth-context";

const NotesContext = createContext();

const NotesProvider = ({ children }) => {
  const [notes, dispatchNotes] = useReducer(notesReducer, []);

  const pinnedNotes = notes.filter((note) => note.isPinned && !note.isInTrash);
  const otherNotes = notes.filter((note) => !note.isPinned && !note.isInTrash);
  const trashedNotes = notes.filter((note) => note.isInTrash);

  const [uniqueTags, setUniqueTags] = useState([]);
  console.log(uniqueTags);

  const { auth } = useAuth();

  useEffect(() => {
    if (auth.status) {
      (async () => {
        const response = await getNotesService(auth.token);
        if (response !== undefined) {
          dispatchNotes({ type: SET_NOTES, payload: response });
          setUniqueTags([
            ...new Set(response.reduce((a, b) => [...a, ...b.tags], [])),
          ]);
        }
      })();
    } else {
      dispatchNotes({ type: SET_NOTES, payload: [] });
      setUniqueTags([]);
    }
  }, [auth]);

  return (
    <NotesContext.Provider
      value={{
        notes,
        dispatchNotes,
        pinnedNotes,
        otherNotes,
        trashedNotes,
        uniqueTags,
        setUniqueTags,
      }}
    >
      {children}
    </NotesContext.Provider>
  );
};

const useNotes = () => {
  const context = useContext(NotesContext);

  if (context === undefined) {
    throw new Error("useNotes must be used within a NotesProvider");
  }

  return context;
};

export { NotesProvider, useNotes };
