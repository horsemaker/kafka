import React, { useRef, useState } from "react";
import { useOnClickOutside } from "../../hooks";
import "./PriorityField.css";

export const PriorityField = ({ priority, changePriority }) => {
  const priorityFieldRef = useRef();

  const [showPriorityField, setShowPriorityField] = useState(false);

  useOnClickOutside(priorityFieldRef, () => setShowPriorityField(false));

  return (
    <div
      ref={priorityFieldRef}
      className="priority-field"
      onClick={(e) => e.stopPropagation()}
    >
      <button
        className="btn-hover"
        onClick={() => setShowPriorityField(!showPriorityField)}
      >
        <span className="material-icons-outlined">leaderboard</span>
      </button>
      {showPriorityField && (
        <div className="priority-field-priorities">
          <div className="input-group input-radio">
            <input
              className="kafka-input"
              type="radio"
              name="priority"
              id="priority-high"
              checked={priority && priority === "High"}
              onChange={() => changePriority("High")}
            />
            <label htmlFor="priority-high">High</label>
          </div>
          <div className="input-group input-radio">
            <input
              className="kafka-input"
              type="radio"
              name="priority"
              id="priority-medium"
              checked={priority && priority === "Medium"}
              onChange={() => changePriority("Medium")}
            />
            <label htmlFor="priority-medium">Medium</label>
          </div>
          <div className="input-group input-radio">
            <input
              className="kafka-input"
              type="radio"
              name="priority"
              id="priority-low"
              checked={priority && priority === "Low"}
              onChange={() => changePriority("Low")}
            />
            <label htmlFor="priority-low">Low</label>
          </div>
        </div>
      )}
    </div>
  );
};
