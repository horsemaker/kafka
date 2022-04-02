import React from "react";
import { NotesListing } from "../../components";
import { useArchives } from "../../contexts";
import "./ArchivesScreen.css";

export const ArchivesScreen = () => {
  const { archives } = useArchives();
  return (
    <div className="archives-screen">
      {archives.length !== 0 && <NotesListing notes={archives} />}
    </div>
  );
};
