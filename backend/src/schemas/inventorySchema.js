import Joi from 'joi';

const paramsSchema = Joi.object({
  inventoryId: Joi.number().required(),
});

const createInventorySchema = Joi.object({
  inventory_name: Joi.string().required().min(3).max(20),
});

const updateInventorySchema = Joi.object({
  inventory_name: Joi.string().required(),
});

export default {
  createInventorySchema,
  updateInventorySchema,
  paramsSchema,
};
