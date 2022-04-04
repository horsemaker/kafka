import React, { useState, useRef } from "react";
import { useNotes } from "../../contexts";
import "./TagsField.css";
import { useOnClickOutside } from "../../hooks";

export const TagsField = ({ tags, toggleTag }) => {
  const tagsFieldRef = useRef();

  const { uniqueTags, setUniqueTags } = useNotes();

  const [showTagsField, setShowTagsField] = useState(false);

  useOnClickOutside(tagsFieldRef, () => setShowTagsField(false));

  const [newTag, setNewTag] = useState("");

  return (
    <div
      ref={tagsFieldRef}
      className="labels-field"
      onClick={(e) => e.stopPropagation()}
    >
      <button className="btn-label btn-hover">
        <span
          className="material-icons-outlined"
          onClick={() => setShowTagsField(!showTagsField)}
        >
          label
        </span>
      </button>
      {showTagsField && (
        <div className="labels-field-labels">
          <div className="labels-field-add-label">
            <input
              type="text"
              name="add-label"
              id="add-label"
              value={newTag}
              onChange={(e) => setNewTag(e.target.value)}
            />
            <button
              onClick={() => {
                if (!uniqueTags.find((tag) => tag === newTag)) {
                  setUniqueTags([...uniqueTags, newTag]);
                }
                setNewTag("");
              }}
            >
              Add
            </button>
          </div>
          <div>
            {uniqueTags.length !== 0 &&
              uniqueTags.map((tag) => (
                <label key={tag} className="input-checkbox" htmlFor={tag}>
                  <input
                    className="kafka-input"
                    type="checkbox"
                    name="labels"
                    id={tag}
                    checked={tags.includes(tag)}
                    onChange={() => toggleTag(tag)}
                  />
                  {tag}
                </label>
              ))}
          </div>
        </div>
      )}
    </div>
  );
};
