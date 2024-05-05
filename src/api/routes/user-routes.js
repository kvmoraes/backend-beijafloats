const { createValidator } = require('express-joi-validation');
const userController = require("../controllers/userController")

const validator = createValidator({});

const {
    userParamsSchema,
    userDefaultBodySchema,
} = require("../middleware/user-validator");

const router = require("express").Router();

router.post(
    "/user",
    validator.body(userDefaultBodySchema),
	userController.create_user
);

router.get(
    "/user/:id", 
    validator.params(userParamsSchema),
    userController.get_user
);

router.put(
    "/user",
    validator.body(userDefaultBodySchema),
    userController.update_user
)


router.delete(
    "/user/:id",
    validator.params(userParamsSchema),
    userController.delete_user
);

module.exports = router;