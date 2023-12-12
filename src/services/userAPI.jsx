import axios from "axios";

// SIGN UP
export const sign_up = async (data) => {
  try {
    const response = await axios.post(
      "https://homemateapi.onrender.com/sign_up",
      data
    );
    return response.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

// SIGN IN
export const sign_in = async (data) => {
  try {
    const response = await axios.post(
      "https://homemateapi.onrender.com/sign_in",
      data
    );
    return response.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};
