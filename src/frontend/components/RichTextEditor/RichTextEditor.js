import React, { useState, useReducer } from "react";
import { noteDetailsReducer } from "../../reducers";
import {
  CLEAR_EDITOR,
  COLOR,
  PIN_STATUS,
  SET_NOTES,
  TAGS,
  TITLE,
} from "../../constants";
import "./RichTextEditor.css";
import { addNoteService } from "../../services";
import { useAuth, useNotes } from "../../contexts";
import { ColorPalette } from "../ColorPalette/ColorPalette";
import { ReactQuillEditor } from "../ReactQuillEditor/ReactQuillEditor";
import { TagsField } from "../TagsField/TagsField";

const initialNoteDetails = {
  title: "",
  isPinned: false,
  color: "color-note-bg",
  tags: [],
};

export const RichTextEditor = () => {
  const [noteDetails, dispatchNoteDetails] = useReducer(
    noteDetailsReducer,
    initialNoteDetails
  );
  const { title, isPinned, color, tags } = noteDetails;

  const [note, setNote] = useState("");

  const { auth } = useAuth();
  const { dispatchNotes } = useNotes();

  const addNoteHandler = async () => {
    const response = await addNoteService(auth.token, {
      ...noteDetails,
      note,
      isInTrash: false,
    });
    if (response !== undefined) {
      dispatchNotes({ type: SET_NOTES, payload: response });
      dispatchNoteDetails({ type: CLEAR_EDITOR, payload: initialNoteDetails });
      setNote("");
    }
  };

  return (
    <div className={`rich-text-editor ${color}`}>
      <div className="note-title-and-pin">
        <input
          className="note-title"
          type="text"
          name="note-title"
          id="note-title"
          placeholder="Title"
          value={title}
          onChange={(e) =>
            dispatchNoteDetails({ type: TITLE, payload: e.target.value })
          }
        />
        <button
          className="note-pin"
          onClick={() => dispatchNoteDetails({ type: PIN_STATUS })}
        >
          <span
            className={isPinned ? "material-icons" : "material-icons-outlined"}
          >
            push_pin
          </span>
        </button>
      </div>
      <ReactQuillEditor value={note} setValue={setNote} />
      <div className="labels">
        {tags.map((tag) => (
          <div key={tag} className="label">
            <span>{tag}</span>
            <span
              role="button"
              className="material-icons-outlined label-delete"
              onClick={() => dispatchNoteDetails({ type: TAGS, payload: tag })}
            >
              highlight_off
            </span>
          </div>
        ))}
      </div>
      <div className="note-actions">
        <div className="note-color">
          <ColorPalette
            color={color}
            changeColor={(newColor) =>
              dispatchNoteDetails({ type: COLOR, payload: newColor })
            }
          />
        </div>
        <div className="note-label">
          <TagsField
            tags={tags}
            toggleTag={(tag) =>
              dispatchNoteDetails({
                type: TAGS,
                payload: tag,
              })
            }
          />
        </div>
        <button className="btn btn-primary" onClick={addNoteHandler}>
          Add
        </button>
      </div>
    </div>
  );
};
