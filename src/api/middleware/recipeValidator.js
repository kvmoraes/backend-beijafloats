const Joi = require("joi");

const recipeQuerySchema = Joi.object({
  id: Joi.string().required(),
});

const recipeDefaultBodySchema = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().required(),
  price: Joi.number().required(),
  ingredients: Joi.string().required(),
  // authorId: Joi.number().required()
});

module.exports = {
  recipeQuerySchema,
  recipeDefaultBodySchema,
};
