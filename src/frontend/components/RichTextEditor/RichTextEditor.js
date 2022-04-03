import React, { useReducer } from "react";
import {
  CLEAR_EDITOR,
  COLOR,
  NOTE,
  PIN_STATUS,
  SET_NOTES,
  TAGS,
  TITLE,
} from "../../constants";
import "./RichTextEditor.css";
import { addNoteService, updateNoteService } from "../../services";
import { useAuth, useNotes } from "../../contexts";
import { ColorPalette } from "../ColorPalette/ColorPalette";
import { ReactQuillEditor } from "../ReactQuillEditor/ReactQuillEditor";
import { TagsField } from "../TagsField/TagsField";
import { matchPath, useLocation, useNavigate } from "react-router-dom";
import { editorReducer } from "../../reducers";

export const RichTextEditor = ({ editorState }) => {
  const [editor, dispatchEditor] = useReducer(editorReducer, editorState);

  const { title, isPinned, color, tags, note } = editor;

  const { pathname } = useLocation();
  const navigate = useNavigate();

  const { auth } = useAuth();
  const { dispatchNotes } = useNotes();

  const addNoteHandler = async () => {
    const response = await addNoteService(auth.token, {
      ...editor,
      isInTrash: false,
    });
    if (response !== undefined) {
      dispatchNotes({ type: SET_NOTES, payload: response });
      dispatchEditor({ type: CLEAR_EDITOR });
    }
  };

  const editNoteHandler = async () => {
    const response = await updateNoteService(auth.token, {
      ...editor,
      isInTrash: false,
    });
    if (response !== undefined) {
      dispatchNotes({ type: SET_NOTES, payload: response });
      navigate("/notes");
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
            dispatchEditor({ type: TITLE, payload: e.target.value })
          }
        />
        <button
          className="note-pin btn-hover"
          onClick={() => dispatchEditor({ type: PIN_STATUS })}
        >
          <span
            className={isPinned ? "material-icons" : "material-icons-outlined"}
          >
            push_pin
          </span>
        </button>
      </div>
      <ReactQuillEditor
        value={note}
        setValue={(event) => dispatchEditor({ type: NOTE, payload: event })}
      />
      <div className="labels">
        {tags.map((tag) => (
          <div key={tag} className="label">
            <span>{tag}</span>
            <span
              role="button"
              className="material-icons-outlined label-delete"
              onClick={() => dispatchEditor({ type: TAGS, payload: tag })}
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
              dispatchEditor({ type: COLOR, payload: newColor })
            }
          />
        </div>
        <div className="note-label">
          <TagsField
            tags={tags}
            toggleTag={(tag) =>
              dispatchEditor({
                type: TAGS,
                payload: tag,
              })
            }
          />
        </div>
        {matchPath("/notes", pathname) ? (
          <button className="btn btn-primary" onClick={addNoteHandler}>
            Add
          </button>
        ) : (
          <button className="btn btn-primary" onClick={editNoteHandler}>
            Edit
          </button>
        )}
      </div>
    </div>
  );
};
