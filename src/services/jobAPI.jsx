import axios from "axios";

// GET ALL JOBS
export const allJob = async () => {
  try {
    const response = await axios.get(`http://127.0.0.1:8000/job`);
    return response.data.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

// CREATE NEW JOB
export const create_job = async (data) => {
  try {
    const response = await axios.post("http://127.0.0.1:8000/create_job", data);
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
      `http://127.0.0.1:8000/get_job_info/${data}`
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
    const response = await axios.put("http://127.0.0.1:8000/update_job", data);
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
      `http://127.0.0.1:8000/delete_job/${data}`
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
    const response = await axios.get(`http://127.0.0.1:8000/my_job/${data}`);
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
      "http://127.0.0.1:8000/hire_worker",
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
      "http://127.0.0.1:8000/return_worker",
      data
    );
    return response.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};
