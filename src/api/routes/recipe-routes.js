const { createValidator } = require("express-joi-validation");
const recipeController = require("../controllers/recipeController");

const validator = createValidator({});

const {
  recipeQuerySchema,
  recipeDefaultBodySchema,
} = require("../middleware/recipeValidator");

const router = require("express").Router();

router.post(
  "/recipe",
  validator.body(recipeDefaultBodySchema),
  recipeController.createRecipe
);

router.get(
  "/recipe/:id",
  //validator.query(recipeQuerySchema),
  recipeController.getRecipe
);

router.delete(
  "/recipe/:id",
  validator.query(recipeQuerySchema),
  recipeController.deleteRecipe
);

module.exports = router;
