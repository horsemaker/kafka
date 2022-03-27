import axios from "axios";

export const signUpService = async (user) => {
  try {
    const { data } = await axios.post("/api/auth/signup", user);
    return {
      userToken: data.encodedToken,
      userData: {
        firstName: data.createdUser?.firstName,
        lastName: data.createdUser?.lastName,
        email: data.createdUser?.email,
      },
    };
  } catch (error) {
    console.error(error.message);
    return;
  }
};
