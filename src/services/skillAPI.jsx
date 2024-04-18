import axios from "axios";

export const get_skill = async (data) => {
  try {
    const response = await axios.get(`http://127.0.0.1:8000/skill`);
    return response.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};
