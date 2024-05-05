const { createValidator } = require('express-joi-validation');
const userController = require("../controllers/userController")

const validator = createValidator({});

const {
    // userParamsSchema,
    userDefaultBodySchema,
    userLoginSchema,
} = require("../middleware/userValidator");
const userjwt = require('../middleware/userjwt');

const router = require("express").Router();

router.post(
    "/register",
    validator.body(userDefaultBodySchema),
	userController.createUser
);

router.post(
    "/login",
    validator.body(userLoginSchema),
    userController.loginUser
);

router.get(
    "/me", 
    userjwt,
    userController.getMe
);

// router.get(
//     "/user/:id", 
//     //validator.params(userParamsSchema),
//     userController.getUser
// );

// router.put(
//     "/user",
//     validator.body(userDefaultBodySchema),
//     userController.updateUser
// )


// router.delete(
//     "/user/:id",
//     validator.params(userParamsSchema),
//     userController.deleteUser
// );

module.exports = router;