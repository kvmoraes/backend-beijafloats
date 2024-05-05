const { default: axios } = require("axios");

const lumxApi = axios.create({
  baseURL: "https://protocol-sandbox.lumx.io/v2/",
});

module.exports = lumxApi;
