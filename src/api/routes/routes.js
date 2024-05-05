const recipeController = require("../controllers/recipeController");

const routes = require("express").Router();

routes.use("/recipe", recipeController);

//todo: pegar a carteira do user que tá comprando, retirar os tokens e bot
//todo: agrupar

// apiRouter.get("/recipe/buy", (req, res) => {
//   const { beerName, quantity } = req.body;
//   const message = `You have bought ${quantity} of ${beerName}`;
//   try {
//     res.status(200).send(message);
//   } catch (error) {
//     message = error;
//     res.status(400).send();
//   }
// });

module.exports = routes;
