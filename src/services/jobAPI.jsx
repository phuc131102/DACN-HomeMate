import axios from "axios";

// GET ALL JOBS
export const allJob = async () => {
  try {
    const response = await axios.get(
      `https://projectapi-g9ba.onrender.com/job`
    );
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
      "https://projectapi-g9ba.onrender.com/create_job",
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
      `https://projectapi-g9ba.onrender.com/get_job_info/${data}`
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
      "https://projectapi-g9ba.onrender.com/update_job",
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
      `https://projectapi-g9ba.onrender.com/delete_job/${data}`
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
      `https://projectapi-g9ba.onrender.com/my_job/${data}`
    );
    return response.data.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

//HIRE WORKER
// export const hire_worker = async (data) => {
//   try {
//     const response = await axios.post(
//       "https://projectapi-g9ba.onrender.com/hire_worker",
//       data
//     );
//     return response.data;
//   } catch (err) {
//     console.error(err);
//     throw err;
//   }
// };

//RATING WORKER
// export const return_worker = async (data) => {
//   try {
//     const response = await axios.post(
//       "https://projectapi-g9ba.onrender.com/return_worker",
//       data
//     );
//     return response.data;
//   } catch (err) {
//     console.error(err);
//     throw err;
//   }
// };

//APPLY JOB
export const apply_job = async (data) => {
  try {
    const response = await axios.post(
      "https://projectapi-g9ba.onrender.com/apply_job",
      data
    );
    return response.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

//CANCEL APPLY
export const cancel_apply = async (data) => {
  try {
    const response = await axios.post(
      "https://projectapi-g9ba.onrender.com/cancel_apply",
      data
    );
    return response.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

//WORKING LIST
export const working_info = async () => {
  try {
    const response = await axios.get(
      `https://projectapi-g9ba.onrender.com/working_info`
    );
    return response.data.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

//WAITING LIST
export const waiting_list = async (data) => {
  try {
    const response = await axios.get(
      `https://projectapi-g9ba.onrender.com/waiting_list/${data}`
    );
    return response.data.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

//ACCEPT APPLY
export const accept_apply = async (data) => {
  try {
    const response = await axios.post(
      "https://projectapi-g9ba.onrender.com/accept_apply",
      data
    );
    return response.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

//ACCEPT LIST
export const accept_list = async (data) => {
  try {
    const response = await axios.get(
      `https://projectapi-g9ba.onrender.com/accept_list/${data}`
    );
    return response.data.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

//REJECT APPLY
export const reject_apply = async (data) => {
  try {
    const response = await axios.post(
      "https://projectapi-g9ba.onrender.com/reject_apply",
      data
    );
    return response.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

//MY WORKER LIST (homeowner)
export const my_worker = async (data) => {
  try {
    const response = await axios.get(
      `https://projectapi-g9ba.onrender.com/my_worker/${data}`
    );
    return response.data.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

//MY WORKING HISTORY (worker)
export const working_history = async (data) => {
  try {
    const response = await axios.get(
      `https://projectapi-g9ba.onrender.com/working_history/${data}`
    );
    return response.data.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

//MY APPLY HISTORY (worker)
export const apply_history = async (data) => {
  try {
    const response = await axios.get(
      `https://projectapi-g9ba.onrender.com/apply_history/${data}`
    );
    return response.data.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

//START JOB WITHOUT ACCEPT LIMIT
export const start_job = async (data) => {
  try {
    const response = await axios.post(
      "https://projectapi-g9ba.onrender.com/start_job",
      data
    );
    return response.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

//END JOB
export const end_job = async (data) => {
  try {
    const response = await axios.post(
      "https://projectapi-g9ba.onrender.com/end_job",
      data
    );
    return response.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

//RATING WORKER
export const rating_worker = async (data) => {
  try {
    const response = await axios.post(
      "https://projectapi-g9ba.onrender.com/rating_worker",
      data
    );
    return response.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};
