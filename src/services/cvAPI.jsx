import axios from "axios";

// SIGN UP
export const create_cv = async (data) => {
  try {
    const response = await axios.post("http://127.0.0.1:8000/create_cv", data);
    return response.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const update_cv = async (data) => {
  try {
    const response = await axios.put("http://127.0.0.1:8000/update_cv", data);
    return response.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const get_cv_info = async (data) => {
  try {
    const response = await axios.get(
      `http://127.0.0.1:8000/get_cv_info/${data}`
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
      `http://127.0.0.1:8000/delete_cv/${data}`
    );
    return response.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};
