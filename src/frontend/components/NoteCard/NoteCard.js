import React from "react";
import { useLocation } from "react-router-dom";
import "./NoteCard.css";

export const NoteCard = ({ note }) => {
  const { pathname } = useLocation();
  return (
    <div className={`${note.color} note-card`}>
      <div className="note-card-title-and-pin">
        <h2 className="note-card-title">{note.title}</h2>
        {note.isPinned ? (
          <button className=" note-card-pin">
            <span role="button" className="material-icons">
              push_pin
            </span>
          </button>
        ) : (
          <button className="note-card-pin">
            <span role="button" className="material-icons-outlined">
              push_pin
            </span>
          </button>
        )}
      </div>
      <div
        className="note-card-details"
        dangerouslySetInnerHTML={{ __html: note.note }}
      />
      <div className="note-card-actions">
        <button>
          <span className="material-icons-outlined">palette</span>
        </button>
        {pathname === "/archives" ? (
          <button>
            <span className="material-icons">archive</span>
          </button>
        ) : (
          <button>
            <span className="material-icons-outlined">archive</span>
          </button>
        )}
        {pathname === "/trash" ? (
          <button>
            <span className="material-icons">delete_forever</span>
          </button>
        ) : (
          <button>
            <span className="material-icons-outlined">delete</span>
          </button>
        )}
      </div>
    </div>
  );
};
