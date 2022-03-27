import axios from "axios";

export const signInService = async (user) => {
  try {
    const { data } = await axios.post("/api/auth/login", user);
    return {
      userToken: data.encodedToken,
      userData: {
        firstName: data.foundUser?.firstName,
        lastName: data.foundUser?.lastName,
        email: data.foundUser?.email,
      },
    };
  } catch (error) {
    console.error(error.message);
    return;
  }
};
