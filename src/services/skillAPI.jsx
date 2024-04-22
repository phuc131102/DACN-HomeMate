import axios from "axios";

export const get_skill = async (data) => {
  try {
    const response = await axios.get(
      `https://projectapi-g9ba.onrender.com/skill`
    );
    return response.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};
