import axios from "axios";

export const updateNoteService = async (token, note) => {
  try {
    const { data } = await axios.post(
      `/api/notes/${note._id}`,
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
