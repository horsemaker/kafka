import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./ReactQuillEditor.css";

const modules = {
  toolbar: [
    ["bold", "italic", "underline", "strike"],
    [{ list: "ordered" }, { list: "bullet" }],
    ["blockquote", "code-block"],
    ["link", "image", "video"],
  ],
};

export const ReactQuillEditor = ({ value, setValue }) => {
  return (
    <ReactQuill
      modules={modules}
      placeholder="Take a note..."
      value={value}
      onChange={setValue}
    />
  );
};
