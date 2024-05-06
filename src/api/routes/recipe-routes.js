const { createValidator } = require("express-joi-validation");
const recipeController = require("../controllers/recipeController");
const userjwt = require("../middleware/userjwt");

const validator = createValidator({});

const {
  recipeParamsSchema,
  recipeDefaultBodySchema,
} = require("../middleware/recipeValidator");

const router = require("express").Router();

router.post(
  "/recipe",
  userjwt,
  validator.body(recipeDefaultBodySchema),
  recipeController.createRecipe
);

router.get(
  "/recipe/buy/:id",
  userjwt,
  validator.params(recipeParamsSchema),
  recipeController.buyRecipe
);

router.get(
  "/recipe",
  validator.body(recipeDefaultBodySchema),
  recipeController.getRecipes
);

router.get(
  "/recipe/:id",
  validator.params(recipeParamsSchema),
  recipeController.getRecipe
);

router.get(
  ["/recipe/erc1155/:id", "/recipe/erc1155/:id.json"],
  //validator.query(recipeQuerySchema),
  recipeController.sendJsonERC1155Data
);

/*
router.delete(
  "/recipe/:id",
  userjwt,
  validator.query(recipeQuerySchema),
  recipeController.deleteRecipe
);
*/

module.exports = router;
