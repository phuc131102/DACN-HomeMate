import axios from "axios";

// GET ALL JOBS
export const allJob = async () => {
  try {
    const response = await axios.get(`https://homemateapi.onrender.com/job`);
    return response.data.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

// CREATE NEW JOB
export const create_job = async (data) => {
  try {
    const response = await axios.post(
      "https://homemateapi.onrender.com/create_job",
      data
    );
    return response.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

// GET JOB INFORMATION
export const get_job_info = async (data) => {
  try {
    const response = await axios.get(
      `https://homemateapi.onrender.com/get_job_info/${data}`
    );
    return response.data.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

// UPDATE JOB
export const update_job = async (data) => {
  try {
    const response = await axios.put(
      "https://homemateapi.onrender.com/update_job",
      data
    );
    return response.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

//DELETE JOBS
export const deleteJob = async (data) => {
  try {
    const response = await axios.delete(
      `https://homemateapi.onrender.com/delete_job/${data}`
    );
    return response.data.message;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

// GET MY JOBS
export const myJob = async (data) => {
  try {
    const response = await axios.get(
      `https://homemateapi.onrender.com/my_job/${data}`
    );
    return response.data.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

//HIRE WORKER
export const hire_worker = async (data) => {
  try {
    const response = await axios.post(
      "https://homemateapi.onrender.com/hire_worker",
      data
    );
    return response.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

//RATING WORKER
export const return_worker = async (data) => {
  try {
    const response = await axios.post(
      "https://homemateapi.onrender.com/return_worker",
      data
    );
    return response.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};
