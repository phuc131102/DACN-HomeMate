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

//VERIFY USERS
export const verify_code = async (data) => {
  try {
    const response = await axios.post(
      `https://projectapi-g9ba.onrender.com/verify_code`,
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

// RESET PASSWORD
export const reset_password = async (data) => {
  try {
    const response = await axios.post(
      `https://projectapi-g9ba.onrender.com/reset_password/${data}`
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

// GET NUMBER OF OWNERS
export const count_owner = async () => {
  try {
    const response = await axios.get(
      `https://projectapi-g9ba.onrender.com/count_owner`
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

//BLOCK USERS
export const block_user = async (data) => {
  try {
    const response = await axios.post(
      `https://projectapi-g9ba.onrender.com/block_user/${data}`
    );
    return response.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

//UNBLOCK USERS
export const unblock_user = async (data) => {
  try {
    const response = await axios.post(
      `https://projectapi-g9ba.onrender.com/unblock_user/${data}`
    );
    return response.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};
