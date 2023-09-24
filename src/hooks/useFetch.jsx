import axios from "axios";

export const fetchOrdinals = async (address) => {
  try {
    const response = await axios.get(`https://api.hiro.so/ordinals/v1/inscriptions?address=${address}`, {
      headers: {
        'Accept': 'application/json'
      }
    });

    return JSON.stringify(response.data);
  } catch (error) {
    console.error(error);
    throw error; // Re-throw the error to propagate it up the call stack if needed
  }
}
