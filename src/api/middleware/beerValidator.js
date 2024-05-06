const Joi = require("joi");

const beerParamsSchema = Joi.object({
  id: Joi.number().required(),
});

const beerDefaultBodySchema = Joi.object({
  id: Joi.number().required(),
  name: Joi.string().required(),
  price: Joi.number().required()
});

module.exports = {
  beerParamsSchema,
  beerDefaultBodySchema,
};
