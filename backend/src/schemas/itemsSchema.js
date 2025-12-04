import Joi from 'joi';

const addItemSchema = Joi.object({
  inventoryId: Joi.number().required(),
  item_text: Joi.string().required(),
  quantity: Joi.number().optional().default(0),
});

const getItemsSchema = Joi.object({
  inventoryId: Joi.number().required(),
  ownerId: Joi.string().required(),
});

const modifyItemsSchema = Joi.object({
  inventoryId: Joi.string().required(),
  itemId: Joi.number().required(),
  quantity: Joi.string().optional(),
  item_text: Joi.string().optional(),
}).or('quantity', 'item_text');

const deleteItemsSchema = Joi.object({
  inventoryId: Joi.string().required(),
  itemId: Joi.number().required(),
});

export default {
  addItemSchema,
  getItemsSchema,
  modifyItemsSchema,
  deleteItemsSchema,
};
