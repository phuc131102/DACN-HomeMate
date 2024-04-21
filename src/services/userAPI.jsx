import axios from "axios";

// SIGN UP
export const sign_up = async (data) => {
  try {
    const response = await axios.post(
      "https://projectapi-g9ba.onrender.com/sign_up",
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
      "https://projectapi-g9ba.onrender.com/sign_in",
      data
    );
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
      `https://projectapi-g9ba.onrender.com/get_user_info/${data}`
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
      "https://projectapi-g9ba.onrender.com/update_user_info",
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
    const response = await axios.get(
      `https://projectapi-g9ba.onrender.com/worker`
    );
    return response.data.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

// GET ALL USERS
export const allUser = async () => {
  try {
    const response = await axios.get(
      `https://projectapi-g9ba.onrender.com/user`
    );
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
      `https://projectapi-g9ba.onrender.com/delete_user/${data}`
    );
    return response.data.message;
  } catch (err) {
    console.error(err);
    throw err;
  }
};
