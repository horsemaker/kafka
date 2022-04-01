import React, { useState, useRef } from "react";
import "./ColorPalette.css";
import { useOnClickOutside } from "./../../hooks/useOnClickOutside";

const colors = [
  "color-note-bg",
  "color-note-1",
  "color-note-2",
  "color-note-3",
  "color-note-4",
  "color-note-5",
  "color-note-6",
  "color-note-7",
];

export const ColorPalette = ({ color, changeColor }) => {
  const colorPaletteRef = useRef();
  const [showColors, setShowColors] = useState(false);

  useOnClickOutside(colorPaletteRef, () => setShowColors(false));

  return (
    <div ref={colorPaletteRef} className="color-palette">
      <button className="btn-color" onClick={() => setShowColors(!showColors)}>
        <span className="material-icons-outlined">palette</span>
      </button>
      {showColors && (
        <div className="color-palette-colors">
          {colors.map((eachColor) => (
            <span
              key={eachColor}
              className={
                eachColor === color
                  ? `${eachColor} color-highlight`
                  : `${eachColor} color-outline`
              }
              onClick={() => changeColor(eachColor)}
            ></span>
          ))}
        </div>
      )}
    </div>
  );
};
