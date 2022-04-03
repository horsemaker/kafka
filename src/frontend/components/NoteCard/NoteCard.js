import React from "react";
import { matchPath, useLocation, useNavigate } from "react-router-dom";
import { SET_ARCHIVES, SET_NOTES } from "../../constants";
import { useArchives, useAuth, useNotes } from "../../contexts";
import {
  updateNoteService,
  addNoteToArchivesServices,
  restoreNoteFromArchivesService,
  removeNoteFromArchivesService,
  deleteNoteService,
} from "../../services/";
import { ColorPalette } from "../ColorPalette/ColorPalette";
import { TagsField } from "../TagsField/TagsField";
import "./NoteCard.css";

export const NoteCard = ({ note }) => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const { auth } = useAuth();
  const { dispatchNotes } = useNotes();
  const { dispatchArchives } = useArchives();

  const togglePinStatus = async () => {
    const response = await updateNoteService(auth.token, {
      ...note,
      isPinned: !note.isPinned,
    });
    if (response !== undefined) {
      dispatchNotes({ type: SET_NOTES, payload: response });
    }
  };

  const changeNoteColor = async (newColor) => {
    const response = await updateNoteService(auth.token, {
      ...note,
      color: newColor,
    });
    if (response !== undefined) {
      dispatchNotes({ type: SET_NOTES, payload: response });
    }
  };

  const toggleNoteTag = async (tag) => {
    const newTags = note.tags.find((noteTag) => noteTag === tag)
      ? note.tags.filter((noteTag) => noteTag !== tag)
      : [...note.tags, tag];
    const response = await updateNoteService(auth.token, {
      ...note,
      tags: newTags,
    });
    if (response !== undefined) {
      dispatchNotes({ type: SET_NOTES, payload: response });
    }
  };

  const addToArchives = async () => {
    if (note.isPinned) {
      togglePinStatus();
    }
    const response = await addNoteToArchivesServices(auth.token, note);
    if (response !== undefined) {
      dispatchNotes({ type: SET_NOTES, payload: response.notes });
      dispatchArchives({ type: SET_ARCHIVES, payload: response.archives });
    }
  };

  const restoreFromArchives = async (pinNote = false) => {
    const response = await restoreNoteFromArchivesService(auth.token, note._id);
    if (response !== undefined) {
      dispatchNotes({ type: SET_NOTES, payload: response.notes });
      dispatchArchives({ type: SET_ARCHIVES, payload: response.archives });
    }
    if (pinNote) {
      togglePinStatus();
    }
  };

  const removeFromArchives = async () => {
    const response = await removeNoteFromArchivesService(auth.token, note._id);
    if (response !== undefined) {
      dispatchArchives({ type: SET_ARCHIVES, payload: response });
    }
  };

  const moveToTrash = async () => {
    if (note.isPinned) {
      const response = await updateNoteService(auth.token, {
        ...note,
        isPinned: false,
        isInTrash: true,
      });
      if (response !== undefined) {
        dispatchNotes({ type: SET_NOTES, payload: response });
      }
    } else {
      const response = await updateNoteService(auth.token, {
        ...note,
        isInTrash: true,
      });
      if (response !== undefined) {
        dispatchNotes({ type: SET_NOTES, payload: response });
      }
    }
  };

  const restoreFromTrash = async () => {
    const response = await updateNoteService(auth.token, {
      ...note,
      isInTrash: false,
    });
    if (response !== undefined) {
      dispatchNotes({ type: SET_NOTES, payload: response });
    }
  };

  const removeFromTrash = async () => {
    const response = await deleteNoteService(auth.token, note._id);
    if (response !== undefined) {
      dispatchNotes({ type: SET_NOTES, payload: response });
    }
  };

  return (
    <div
      className={`${note.color} note-card`}
      onClick={() => {
        if (pathname === "/notes") {
          navigate(`/notes/${note._id}`);
        }
      }}
    >
      <div className="note-card-title-and-pin">
        <h2 className="note-card-title">{note.title}</h2>
        {pathname !== "/trash" && (
          <button
            className=" note-card-pin btn-hover"
            onClick={(e) => {
              e.stopPropagation();
              if (pathname === "/archives") {
                restoreFromArchives(true);
              } else {
                togglePinStatus();
              }
            }}
          >
            {note.isPinned ? (
              <span role="button" className="material-icons">
                push_pin
              </span>
            ) : (
              <span role="button" className="material-icons-outlined">
                push_pin
              </span>
            )}
          </button>
        )}
      </div>
      <div
        className="note-card-details"
        dangerouslySetInnerHTML={{ __html: note.note }}
      />
      <div className="note-card-tags">
        {note.tags.map((tag) => (
          <div key={tag} className="label">
            <span>{tag}</span>
            {pathname === "/notes" && (
              <span
                role="button"
                className="material-icons-outlined label-delete"
                onClick={(e) => {
                  e.stopPropagation();
                  toggleNoteTag(tag);
                }}
              >
                highlight_off
              </span>
            )}
          </div>
        ))}
      </div>
      <div className="note-card-actions">
        {matchPath("/notes/*", pathname) && (
          <>
            <ColorPalette color={note.color} changeColor={changeNoteColor} />
            <TagsField tags={note.tags} toggleTag={toggleNoteTag} />
          </>
        )}
        {pathname !== "/trash" &&
          (pathname === "/archives" ? (
            <button className="btn-hover" onClick={() => restoreFromArchives()}>
              <span className="material-icons-outlined">unarchive</span>
            </button>
          ) : (
            <button
              className="btn-hover"
              onClick={(e) => {
                e.stopPropagation();
                addToArchives();
              }}
            >
              <span className="material-icons-outlined">archive</span>
            </button>
          ))}
        {pathname === "/trash" && (
          <button className="btn-hover" onClick={restoreFromTrash}>
            <span className="material-icons">restore_from_trash</span>
          </button>
        )}
        {matchPath("/notes/*", pathname) && (
          <button
            className="btn-hover"
            onClick={(e) => {
              e.stopPropagation();
              moveToTrash();
            }}
          >
            <span className="material-icons-outlined">delete</span>
          </button>
        )}
        {(pathname === "/archives" || pathname === "/trash") && (
          <button
            className="btn-hover"
            onClick={
              pathname === "/archives" ? removeFromArchives : removeFromTrash
            }
          >
            <span className="material-icons">delete_forever</span>
          </button>
        )}
      </div>
    </div>
  );
};
