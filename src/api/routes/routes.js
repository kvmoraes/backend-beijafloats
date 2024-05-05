const recipeController = require("../controllers/recipeController");

const routes = require("express").Router();

routes.use("/recipe", recipeController);

module.exports = routes;
