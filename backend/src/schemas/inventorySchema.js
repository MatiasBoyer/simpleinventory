import Joi from 'joi';
import itemsSchema from '#schemas/itemsSchema.js';

const paramsSchema = Joi.object({
  inventoryId: Joi.number().required(),
});

const createInventorySchema = Joi.object({
  inventory_name: Joi.string().required().min(3).max(20),
});

const updateInventorySchema = Joi.object({
  inventory_name: Joi.string().optional(),
  items: Joi.array().items(itemsSchema.modifyItemsSchema).optional().min(1),
}).or('inventory_name', 'items');

export default {
  createInventorySchema,
  updateInventorySchema,
  paramsSchema,
};
