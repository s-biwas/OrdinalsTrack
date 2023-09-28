const cryptoSymbol = 'bitcoin';
const ofDate = '2022-12-31';

// CoinGecko API URL to get historical price data
const apiUrl = `https://api.coingecko.com/api/v3/coins/bitcoin/history?&date=${ofDate}`;

fetch(apiUrl)
  .then((response) => {
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
  })
  .then((data) => {
    // The data will contain historical price and volume information for Bitcoin
    console.log(data);
  })
  .catch((error) => {
    console.error('API Request Error:', error);
  });
