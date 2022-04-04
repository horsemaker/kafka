import React from "react";
import { Outlet } from "react-router-dom";
import { NotesListing, RichTextEditor } from "../../components";
import { useNotes } from "../../contexts";
import "./NotesScreen.css";

export const NotesScreen = () => {
  const { pinnedNotes, otherNotes } = useNotes();

  return (
    <div className="notes-screen">
      <RichTextEditor
        key="create"
        editorState={{
          title: "",
          isPinned: "",
          color: "color-note-bg",
          tags: [],
          priority: "Low",
          note: "",
        }}
      />
      <div className="notes">
        {pinnedNotes.length !== 0 && (
          <div className="notes-pinned notes-display">
            {otherNotes.length !== 0 && <h6>Pinned</h6>}
            <NotesListing notes={pinnedNotes} />
          </div>
        )}
        {otherNotes.length !== 0 && (
          <div className="notes-other notes-display">
            {pinnedNotes.length !== 0 && <h6>Others</h6>}
            <NotesListing notes={otherNotes} />
          </div>
        )}
      </div>
      <Outlet />
    </div>
  );
};
