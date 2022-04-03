import React, { useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useNotes } from "../../contexts";
import { useLockBodyScroll, useOnClickOutside } from "../../hooks";
import { RichTextEditor } from "./../RichTextEditor/RichTextEditor";
import "./EditorModal.css";

export const EditorModal = () => {
  const textEditorRef = useRef();
  const navigate = useNavigate();
  const { noteId } = useParams();

  const { notes } = useNotes();
  const note = notes.find((note) => note._id === noteId);

  useOnClickOutside(textEditorRef, () => navigate("/notes"));
  useLockBodyScroll(true);

  return (
    <div className="editor-modal">
      <div ref={textEditorRef}>
        <RichTextEditor key="edit" editorState={note} />
      </div>
    </div>
  );
};
