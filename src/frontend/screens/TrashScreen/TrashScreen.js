import React from "react";
import { NotesListing } from "../../components";
import { useNotes } from "../../contexts";
import "./TrashScreen.css";

export const TrashScreen = () => {
  const { trashedNotes } = useNotes();
  return (
    <div className="trash-screen">
      <NotesListing notes={trashedNotes} />
    </div>
  );
};
