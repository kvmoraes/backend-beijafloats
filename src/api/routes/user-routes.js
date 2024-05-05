const { createValidator } = require('express-joi-validation');
const userController = require("../controllers/userController")

const validator = createValidator({});

const {
    // userParamsSchema,
    userDefaultBodySchema,
    userLoginSchema,
} = require("../middleware/user-validator");
const userjwt = require('../middleware/userjwt');

const router = require("express").Router();

router.post(
    "/register",
    validator.body(userDefaultBodySchema),
	userController.create_user
);

router.post(
    "/login",
    validator.body(userLoginSchema),
    userController.login_user
);

router.get(
    "/me", 
    userjwt,
    userController.get_me
);

// router.get(
//     "/user/:id", 
//     //validator.params(userParamsSchema),
//     userController.get_user
// );

// router.put(
//     "/user",
//     validator.body(userDefaultBodySchema),
//     userController.update_user
// )


// router.delete(
//     "/user/:id",
//     validator.params(userParamsSchema),
//     userController.delete_user
// );

module.exports = router;