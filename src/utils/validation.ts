import Joi from 'joi';

export const cartSchema = Joi.object({
  userId: Joi.string().uuid().required(),
  isDeleted: Joi.boolean().required(),
  items: Joi.array().items(
    Joi.object({
      product: Joi.object().required(),
      count: Joi.number().integer().min(0).required(),
    })
  ),
});
