import axios from "axios";

export const fetchOrdinals = async (address) => {
  try {
    const response = await axios.get(`https://api.hiro.so/ordinals/v1/inscriptions?address=${address}`, {
      headers: {
        'Accept': 'application/json'
      }
    });

    console.log(response.data)
    return response.data;
  } catch (error) {
    console.error(error);
    throw error; // Re-throw the error to propagate it up the call stack if needed
  }
}

export const getContent = async (id) => {
  try {
    const response = await axios.get(`https://api.hiro.so/ordinals/v1/inscriptions/${id}/content`, {
      headers: {
        'Accept': 'application/json'
      }
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error; // Re-throw the error to propagate it up the call stack if needed
  }
}
