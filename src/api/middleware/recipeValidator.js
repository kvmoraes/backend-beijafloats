const Joi = require("joi");

const recipeParamsSchema = Joi.object({
  id: Joi.number().required(),
});

const recipeDefaultBodySchema = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().required(),
  price: Joi.number().required(),
  ingredients: Joi.string().required()
});

module.exports = {
  recipeParamsSchema,
  recipeDefaultBodySchema,
};
