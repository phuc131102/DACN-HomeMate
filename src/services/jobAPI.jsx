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
