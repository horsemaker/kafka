import React from "react";
import { NotesListing, SearchAndFilter } from "../../components";
import { useFilters, useNotes } from "../../contexts";
import { useWindowSize } from "../../hooks";
import { getFinalNotes } from "../../utils";
import "./SearchScreen.css";

export const SearchScreen = () => {
  const { notes } = useNotes();
  const { filters } = useFilters();

  const finalNotes = getFinalNotes(notes, filters);

  const size = useWindowSize();

  return (
    <div className="search-screen">
      {size.width <= 1250 && (
        <div className="search-bar">
          <SearchAndFilter />
        </div>
      )}
      <div className="searched-notes">
        <NotesListing notes={finalNotes} />
      </div>
    </div>
  );
};
