import Joi from 'joi';

const creationSchema = Joi.object({
  inventoryId: Joi.string().required(),
});

const updateSchema = Joi.object({
  inventoryId: Joi.string().required(),
  itemId: Joi.number().required(),
});

const addItemSchema = Joi.object({
  item_text: Joi.string().required(),
  quantity: Joi.number().optional().default(0),
});

const modifyItemsSchema = Joi.object({
  quantity: Joi.string().optional(),
  item_text: Joi.string().optional(),
}).or('quantity', 'item_text');

export default {
  creationSchema,
  updateSchema,
  addItemSchema,
  modifyItemsSchema,
};
