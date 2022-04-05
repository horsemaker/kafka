export const getFilteredWithTagsNotes = (notes, tags) => {
  if (tags.length !== 0) {
    return notes.filter(
      (note) => note.tags.filter((tag) => tags.includes(tag)).length > 0
    );
  }
  return notes;
};
