const express = require("express");
const cors = require("cors");

const userRouter = require("./api/routes/user-routes");
const recipeRouter = require("./api/routes/recipe-routes");
const healthchecker = require("./api/routes/healthcheck");
// const routes = require("./api/routes/routes");

const app = express();
const PORT = 3000;

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
// app.use("/api/v1", routes) ;

app.listen(PORT, () => {
  console.log(`🚀 Server is up and running on port:${PORT}`);
});
