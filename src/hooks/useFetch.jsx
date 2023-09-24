import axios from "axios";

export const fetchOrdinals = async (address) => {
  const response = await axios.request({
    method: 'get',
    maxBodyLength: Infinity,
    url: 'https://api.hiro.so/ordinals/v1/inscriptions?address=' + address,
    headers: {
      'Accept': 'application/json'
    }
  })
    .then((response) => {
      return JSON.stringify(response.data);
    })
    .catch((error) => {
      console.log(error);
    });

  return response;
}