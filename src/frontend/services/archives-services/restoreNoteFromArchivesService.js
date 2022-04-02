import axios from "axios";

export const restoreNoteFromArchivesService = async (token, noteId) => {
  try {
    const { data } = await axios.post(
      `/api/archives/restore/${noteId}`,
      {},
      {
        headers: {
          authorization: token,
        },
      }
    );
    return data;
  } catch (error) {
    console.error(error);
    return;
  }
};
