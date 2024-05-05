const Joi = require("joi")

const userParamsSchema = Joi.object({
	id: Joi.number().required(),
});

const userDefaultBodySchema = Joi.object({
	name: Joi.string().required(),
	email: Joi.string().email().required(),
	password: Joi.string().required()
});

const userLoginSchema = Joi.object({
	email: Joi.string().email().required(),
	password: Joi.string().required()
});


module.exports = {
	userParamsSchema,
	userDefaultBodySchema,
	userLoginSchema
};
