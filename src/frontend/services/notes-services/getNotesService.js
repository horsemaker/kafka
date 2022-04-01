import axios from "axios";

export const getNotesService = async (token) => {
  try {
    const { data } = await axios.get("/api/notes", {
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
