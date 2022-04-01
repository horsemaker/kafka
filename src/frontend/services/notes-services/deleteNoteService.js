import axios from "axios";

export const deleteNoteService = async (token, noteId) => {
  try {
    const { data } = await axios.delete(`/api/notes/${noteId}`, {
      headers: {
        authorization: token,
      },
    });
    return data.notes;
  } catch (error) {
    console.error(error);
    return;
  }
};
