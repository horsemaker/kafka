import { getFilteredWithTagsNotes } from "./getFilteredWithTagsNotes";
import { getPrioritizedNotes } from "./getPrioritizedNotes";
import { getSortedNotes } from "./getSortedNotes";

export const getFinalNotes = (notes, filters) => {
  const { sortBy, priorities, tags } = filters;

  const sortedNotes = getSortedNotes(notes, sortBy);
  const prioritizedNotes = getPrioritizedNotes(sortedNotes, priorities);
  const filteredWithTagsNotes = getFilteredWithTagsNotes(
    prioritizedNotes,
    tags
  );

  return filteredWithTagsNotes;
};
