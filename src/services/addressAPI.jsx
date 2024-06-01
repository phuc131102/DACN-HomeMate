import axios from "axios";

export const addressTinh = async (data) => {
  try {
    const response = await axios.get(
      `https://esgoo.net/api-tinhthanh/1/0.htm`
    );
    // console.log(response.data.data)
    return response.data.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};


export const addressQuan = async (data) => {
    try {
      const response = await axios.get(
        `https://esgoo.net/api-tinhthanh/2/${data}.htm`
      );
      console.log(response.data.data)
      return response.data.data;
    } catch (err) {
      console.error(err);
      throw err;
    }
  };


