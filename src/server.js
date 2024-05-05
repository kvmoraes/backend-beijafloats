const express = require("express");
const cors = require("cors");

const healthchecker = require("./api/routes/healthcheck");
const routes = require("./api/routes/routes");

require("dotenv").config();

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
app.use("/api/v1", routes);

app.listen(PORT, () => {
  console.log(`🚀 Server is up and running on port:${PORT}`);
});
