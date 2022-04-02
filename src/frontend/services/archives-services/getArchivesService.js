import axios from "axios";

export const getArchivesService = async (token) => {
  try {
    const { data } = await axios.get("/api/archives", {
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
