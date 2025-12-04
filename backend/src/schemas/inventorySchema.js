import Joi from 'joi';

const createInventorySchema = Joi.object({
  name: Joi.string().required().min(3).max(20),
  user: Joi.string().required().min(3).max(20),
});

export default { createInventorySchema };
