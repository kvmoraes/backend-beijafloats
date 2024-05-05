const { createValidator } = require('express-joi-validation');
const recipeController = require("../controllers/recipeController")

const validator = createValidator({});

const {
    recipeQuerySchema,
    recipeDefaultBodySchema,
} = require("../middleware/recipe-validator");

const router = require("express").Router();

router.post(
    "/recipe",
    validator.body(recipeDefaultBodySchema),
	recipeController.create_recipe
);

router.get(
    "/recipe/:id", 
    validator.query(recipeQuerySchema),
    recipeController.get_recipe
);


router.delete(
    "/recipe/:id",
    validator.query(recipeQuerySchema),
    recipeController.delete_recipe
);

module.exports = router;