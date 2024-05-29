import axios from "axios";

export const get_skill = async (data) => {
  try {
    const response = await axios.get(
      `https://projectapi-72at.onrender.com/skill`
    );
    return response.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};
export const create_skill = async (data) => {
  try {
    const response = await axios.post(
      "https://projectapi-72at.onrender.com/create_skill",
      data
    );
    return response.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};
export const delete_Skill = async (data) => {
  try {
    const response = await axios.delete(
      `https://projectapi-72at.onrender.com/delete_skill/${data}`
    );
    return response.data.message;
  } catch (err) {
    console.error(err);
    throw err;
  }
};
