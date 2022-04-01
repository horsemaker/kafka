import React from "react";
import { MasonryLayout } from "../MasonryLayout/MasonryLayout";
import { NoteCard } from "../NoteCard/NoteCard";
import "./NotesListing.css";

export const NotesListing = ({ notes }) => {
  return (
    <div className="notes-listing">
      <MasonryLayout>
        {notes.map((note) => (
          <NoteCard note={note} />
        ))}
      </MasonryLayout>
    </div>
  );
};
