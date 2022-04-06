export const getSortedNotes = (notes, sortBy) => {
  if (sortBy === "old-to-new") {
    return [...notes].sort(
      (a, b) => Date.parse(a.createdAt) - Date.parse(b.createdAt)
    );
  } else if (sortBy === "new-to-old") {
    return [...notes].sort(
      (a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt)
    );
  }
  return notes;
};
