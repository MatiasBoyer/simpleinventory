import Joi from 'joi';

const creationSchema = Joi.object({
  inventoryId: Joi.string().required(),
});

const updateSchema = Joi.object({
  inventoryId: Joi.string().required(),
  itemId: Joi.number().required(),
});

const itemSchema = Joi.object({
  item_text: Joi.string().required(),
  quantity: Joi.number().optional().default(0).min(0).max(999),
});

const addItemSchema = Joi.alternatives()
  .try(itemSchema, Joi.array().items(itemSchema))
  .custom((value) => (Array.isArray(value) ? value : [value]));

const modifyItemsSchema = Joi.object({
  item_text: Joi.string().optional(),
  quantity: Joi.number().optional().default(0).min(0).max(999),
}).or('quantity', 'item_text');

export default {
  creationSchema,
  updateSchema,
  addItemSchema,
  modifyItemsSchema,
};
