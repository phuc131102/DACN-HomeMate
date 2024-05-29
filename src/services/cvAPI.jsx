import axios from "axios";

// SIGN UP
export const create_cv = async (data) => {
  try {
    const response = await axios.post(
      "https://projectapi-72at.onrender.com/create_cv",
      data
    );
    return response.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const update_cv = async (data) => {
  try {
    const response = await axios.put(
      "https://projectapi-72at.onrender.com/update_cv",
      data
    );
    return response.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const get_cv_info = async (data) => {
  try {
    const response = await axios.get(
      `https://projectapi-72at.onrender.com/get_cv_info/${data}`
    );
    return response.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const delete_cv = async (data) => {
  try {
    const response = await axios.delete(
      `https://projectapi-72at.onrender.com/delete_cv/${data}`
    );
    return response.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};
