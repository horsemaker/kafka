import axios from "axios";

export const removeNoteFromArchivesService = async (token, noteId) => {
  try {
    const { data } = await axios.delete(`/api/archives/delete/${noteId}`, {
      headers: {
        authorization: token,
      },
    });
    return data.archives;
  } catch (error) {
    console.error(error);
    return;
  }
};
