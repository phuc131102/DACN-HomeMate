import axios from "axios";

export const get_skill = async (data) => {
    try {
      const response = await axios.get(
        `https://homemateapi.onrender.com/skill`
      );
      return response.data;
    } catch (err) {
      console.error(err);
      throw err;
    }
  };