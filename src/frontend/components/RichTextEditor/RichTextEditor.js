import React, { useState, useReducer } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { noteDetailsReducer } from "../../reducers";
import {
  CLEAR_EDITOR,
  COLOR,
  LABELS,
  PIN_STATUS,
  TITLE,
} from "../../constants";
import "./RichTextEditor.css";

const modules = {
  toolbar: [
    ["bold", "italic", "underline", "strike"],
    [{ list: "ordered" }, { list: "bullet" }],
    ["blockquote", "code-block"],
    ["link", "image", "video"],
  ],
};

const initialNoteDetails = {
  title: "",
  isPinned: false,
  color: "",
  labels: [],
};

export const RichTextEditor = () => {
  const [noteDetails, dispatchNoteDetails] = useReducer(
    noteDetailsReducer,
    initialNoteDetails
  );
  const { title, isPinned, color, labels } = noteDetails;

  const [note, setNote] = useState("");

  const [showColors, setShowColors] = useState(false);
  const [showLabels, setShowLabels] = useState(false);

  const addNoteHandler = () => {
    setShowColors(false);
    setShowLabels(false);
    dispatchNoteDetails({ type: CLEAR_EDITOR, payload: initialNoteDetails });
    setNote("");
  };

  return (
    <div className="rich-text-editor">
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
      <ReactQuill
        modules={modules}
        value={note}
        placeholder="Take a note..."
        onChange={setNote}
      />
      <div className="labels">
        {labels.map((label) => (
          <div key={label} className="label">
            <span>{label}</span>
            <span
              role="button"
              className="material-icons-outlined label-delete"
              onClick={() =>
                dispatchNoteDetails({ type: LABELS, payload: label })
              }
            >
              highlight_off
            </span>
          </div>
        ))}
      </div>
      <div className="note-actions">
        <div className="note-color">
          <button
            className="btn-color"
            onClick={() => {
              setShowLabels(false);
              setShowColors(!showColors);
            }}
          >
            <span className="material-icons-outlined">palette</span>
          </button>
          {showColors && (
            <div className="note-colors">
              <span
                className={color === "" ? "color-outline" : "color-border"}
                onClick={() =>
                  dispatchNoteDetails({ type: COLOR, payload: "" })
                }
              ></span>
              <span
                className={
                  color === "color-1" ? "color-1 color-outline" : "color-1 "
                }
                onClick={() =>
                  dispatchNoteDetails({ type: COLOR, payload: "color-1" })
                }
              ></span>
              <span
                className={
                  color === "color-2" ? "color-2 color-outline" : "color-2 "
                }
                onClick={() =>
                  dispatchNoteDetails({ type: COLOR, payload: "color-2" })
                }
              ></span>
              <span
                className={
                  color === "color-3" ? "color-3 color-outline" : "color-3 "
                }
                onClick={() =>
                  dispatchNoteDetails({ type: COLOR, payload: "color-3" })
                }
              ></span>
              <span
                className={
                  color === "color-4" ? "color-4 color-outline" : "color-4 "
                }
                onClick={() =>
                  dispatchNoteDetails({ type: COLOR, payload: "color-4" })
                }
              ></span>
              <span
                className={
                  color === "color-5" ? "color-5 color-outline" : "color-5 "
                }
                onClick={() =>
                  dispatchNoteDetails({ type: COLOR, payload: "color-5" })
                }
              ></span>
              <span
                className={
                  color === "color-6" ? "color-6 color-outline" : "color-6 "
                }
                onClick={() =>
                  dispatchNoteDetails({ type: COLOR, payload: "color-6" })
                }
              ></span>
              <span
                className={
                  color === "color-7" ? "color-7 color-outline" : "color-7 "
                }
                onClick={() =>
                  dispatchNoteDetails({ type: COLOR, payload: "color-7" })
                }
              ></span>
            </div>
          )}
        </div>
        <div className="note-label">
          <button
            className="btn-label"
            onClick={() => {
              setShowColors(false);
              setShowLabels(!showLabels);
            }}
          >
            <span className="material-icons-outlined">label</span>
          </button>
          {showLabels && (
            <div className="note-labels">
              <div className="note-add-label">
                <input type="text" name="add-label" id="add-label" />
                <button>Add</button>
              </div>
              <div className="note-option-labels">
                <label className="input-checkbox" htmlFor="label-1">
                  <input
                    className="kafka-input"
                    type="checkbox"
                    name="label-1"
                    id="label-1"
                    checked={labels.includes("Label 1")}
                    onChange={() =>
                      dispatchNoteDetails({ type: LABELS, payload: "Label 1" })
                    }
                  />
                  Label 1
                </label>
                <label className="input-checkbox" htmlFor="label-2">
                  <input
                    className="kafka-input"
                    type="checkbox"
                    name="label-2"
                    id="label-2"
                    checked={labels.includes("Label 2")}
                    onChange={() =>
                      dispatchNoteDetails({ type: LABELS, payload: "Label 2" })
                    }
                  />
                  Label 2
                </label>
              </div>
            </div>
          )}
        </div>
        <button className="btn btn-primary" onClick={addNoteHandler}>
          Add
        </button>
      </div>
    </div>
  );
};
