import axios from "axios";

// SIGN UP
export const sign_up = async (data) => {
  try {
    const response = await axios.post("http://127.0.0.1:8000/sign_up", data);
    return response.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

// SIGN IN
export const sign_in = async (data) => {
  try {
    const response = await axios.post("http://127.0.0.1:8000/sign_in", data);
    return response.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

// GET USER INFORMATION
export const get_user_info = async (data) => {
  try {
    const response = await axios.get(
      `http://127.0.0.1:8000/get_user_info/${data}`
    );
    return response.data.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

// UPDATE USER INFORMATION
export const update_user_info = async (data) => {
  try {
    const response = await axios.post(
      "http://127.0.0.1:8000/update_user_info",
      data
    );
    return response.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

// GET ALL WORKERS
export const allWorker = async () => {
  try {
    const response = await axios.get(`http://127.0.0.1:8000/worker`);
    return response.data.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

// GET ALL USERS
export const allUser = async () => {
  try {
    const response = await axios.get(`http://127.0.0.1:8000/user`);
    return response.data.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

//DELETE USERS
export const deleteUser = async (data) => {
  try {
    const response = await axios.delete(
      `http://127.0.0.1:8000/delete_user/${data}`
    );
    return response.data.message;
  } catch (err) {
    console.error(err);
    throw err;
  }
};
