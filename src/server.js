const dotenv = require('dotenv').config();
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const userRouter = require("./api/routes/user-routes");
const recipeRouter = require("./api/routes/recipe-routes");
const beerRouter = require("./api/routes/beer-routes");
const healthchecker = require("./api/routes/healthcheck");

const PORT = process.env.APP_PORT || 3000;

const app = express();

app.use(
  cors({
    origin: "*",
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", healthchecker);
app.use("/api", userRouter);
app.use("/api", recipeRouter);
app.use("/api", beerRouter);

app.listen(PORT, () => {
  console.log(`🚀 Server is up and running on port:${PORT}`);
});
