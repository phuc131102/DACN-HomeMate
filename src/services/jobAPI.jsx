import axios from "axios";

// GET ALL WORKERS
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
