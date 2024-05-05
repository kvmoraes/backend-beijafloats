const beerController = require("../controllers/beerController.js");
const recipeController = require("../controllers/recipeController.js");

const routes = require("express").Router();

routes.use("/recipe", recipeController);
routes.use("/beer", beerController);

module.exports = routes;
