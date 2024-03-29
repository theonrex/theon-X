const PORT = 8000;
const axios = require("axios").default;
const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
app.use(cors());

app.get("/news", (req, res) => {
  const options = {
    method: "GET",
    url: `https://cryptopanic.com/api/v1/posts/?auth_token=${process.env.CRYPTOPANIC_API_KEY}&filter=important&kind=news`,

    headers: {
      accept: "application/json",
    },
  };
  axios
    .request(options)
    .then(function (response) {
      console.log(response.data);
      res.json(response.data);

      // res.json(response.data.slice(0, 6));
    })
    .catch(function (error) {
      console.error(error);
    });
});

// fetch market chart
app.get("/coins", (req, res) => {
      const { query } = req;

  const options = {
    method: "GET",
    url: `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=30&page=${query.page}&sparkline=true&price_change_percentage=1h%2C24h%2C7d%2C14d%2C30d%2C1y`,

    headers: {
      accept: "application/json",
    },
  };
  axios
    .request(options)
    .then(function (response) {
      console.log(response.data);
      res.json(response.data);

      // res.json(response.data.slice(0, 6));
    })
    .catch(function (error) {
      console.error(error);
    });
});

app.listen(PORT, () => console.log("running on PORT " + PORT));

// Export the Express API
module.exports = app;

//    https://github.com/
// git clone git@github.com:MoralisWeb3/Moralis-JS-SDK/tree/main/demos/supabase-auth
