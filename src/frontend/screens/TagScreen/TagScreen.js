import React from "react";
import "./TagScreen.css";
import { useParams } from "react-router-dom";
import { useNotes } from "../../contexts";
import { NotesListing } from "../../components";

export const TagScreen = () => {
  const { label } = useParams();

  const { notes } = useNotes();
  const labelledNotes = notes.filter((note) => note.tags.includes(label));

  return (
    <div className="tag-screen">
      <NotesListing notes={labelledNotes} />
    </div>
  );
};
