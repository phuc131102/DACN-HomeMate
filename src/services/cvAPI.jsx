import axios from "axios";

// SIGN UP
export const create_cv = async (data) => {
  try {
    const response = await axios.post(
      "https://homemateapi.onrender.com/create_cv",
      data
    );
    return response.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};