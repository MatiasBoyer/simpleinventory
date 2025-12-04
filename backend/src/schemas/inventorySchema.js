import Joi from 'joi';

const createInventorySchema = Joi.object({
  name: Joi.string().required().min(3).max(20),
  user: Joi.string().required().min(3).max(20),
});

const deleteInventorySchema = Joi.object({
  inventoryId: Joi.number().required(),
  ownerId: Joi.string().required(),
});

const getInventoriesSchema = Joi.object({
  ownerId: Joi.string().required(),
});

const updateInventorySchema = Joi.object({
  inventoryId: Joi.number().required(),
  ownerId: Joi.string().required(),
  inventory_name: Joi.string().required(),
});

export default {
  createInventorySchema,
  deleteInventorySchema,
  getInventoriesSchema,
  updateInventorySchema,
};
