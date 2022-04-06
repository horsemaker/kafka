export const getPrioritizedNotes = (notes, priorities) => {
  if (priorities.length !== 0) {
    return notes.filter((note) => priorities.includes(note.priority));
  }
  return notes;
};
