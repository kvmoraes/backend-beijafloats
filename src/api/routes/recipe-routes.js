const { createValidator } = require("express-joi-validation");
const recipeController = require("../controllers/recipeController");
const userjwt = require("../middleware/userjwt");

const validator = createValidator({});

const {
  // recipeQuerySchema,
  recipeDefaultBodySchema,
} = require("../middleware/recipeValidator");

const router = require("express").Router();

router.post(
  "/recipe",
  userjwt,
  validator.body(recipeDefaultBodySchema),
  recipeController.createRecipe
);

router.get("/recipe", recipeController.get_recipes);


router.get(
  "/recipe/:id",
  //validator.query(recipeQuerySchema),
  recipeController.getRecipe
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
