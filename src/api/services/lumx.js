const { default: axios } = require("axios");
require('dotenv').config();

const lumxApi = axios.create({
  baseURL: "https://protocol-sandbox.lumx.io/v2",
  headers: {
    Authorization: `Bearer ${process.env.LUMX_APIKEY}`
  }
});

module.exports = lumxApi;