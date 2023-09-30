import axios from "axios";
import convertTimestamp from "../utils/convertTimestamp";

export const fetchOrdinals = async (address) => {
  try {
    const response = await axios.get(
      `https://api.hiro.so/ordinals/v1/inscriptions?address=${address}`,
      {
        headers: {
          Accept: "application/json",
        },
      },
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getContent = async (id) => {
  try {
    const response = await axios.get(
      `https://api.hiro.so/ordinals/v1/inscriptions/${id}/content`,
      {
        headers: {
          Accept: "application/json",
        },
      },
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const fetchInscriptionDetail = async (id) => {
  try {
    const response = await axios.get(
      `https://api.hiro.so/ordinals/v1/inscriptions/${id}`,
      {
        headers: {
          Accept: "application/json",
        },
      },
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const fetchInscriptionTransfer = async (id) => {
  try {
    const response = await axios.get(
      `https://api.hiro.so/ordinals/v1/inscriptions/${id}/transfers`,
      {
        headers: {
          Accept: "application/json",
        },
      },
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const fetchFees = async (id) => {
  try {
    const response = await axios.get(`https://mempool.space/api/tx/${id}`, {
      headers: {
        Accept: "application/json",
      },
    });
    return response.data.fee;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getUsdEquivalent = async (timestamp) => {
  try {
    const response = await axios.get(
      `http://api.coinlayer.com/${convertTimestamp(
        timestamp,
      )}?access_key=2cb598c57d1f70d0f8229a44882cc6a7&symbols=BTC`,
    );
    return response;
  } catch (error) {
    throw new Error(`Unable to get usd equivalent${error.message}`);
  }
};

export const getWholeTransfers = async (address) => {
  try {
    const response = await axios.get(
      `https://mempool.space/api/address/${address}/txs/chain`,
    );
    return response;
  } catch (error) {
    throw new Error(`Unable to get usd equivalent${error.message}`);
  }
};
