import axios from "axios";

export const addNoteService = async (token, note) => {
  try {
    const { data } = await axios.post(
      "/api/notes",
      { note },
      {
        headers: {
          authorization: token,
        },
      }
    );
    return data.notes;
  } catch (error) {
    console.error(error);
    return;
  }
};
