import React from "react";
import Masonry from "react-masonry-css";
import "./MasonryLayout.css";

const breakpointColumnsObj = {
  default: 4,
  1500: 3,
  1000: 2,
  600: 1,
};

export const MasonryLayout = ({ children }) => {
  return (
    <Masonry
      breakpointCols={breakpointColumnsObj}
      className="my-masonry-grid"
      columnClassName="my-masonry-grid_column"
    >
      {children}
    </Masonry>
  );
};
