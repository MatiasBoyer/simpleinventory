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
  id: Joi.number(),
  item_text: Joi.string(),
  quantity: Joi.number().min(0).max(999),
}).custom((value, helpers) => {
  const { id, item_text, quantity } = value;

  // If quantity is present → require id or item_text
  if (quantity !== undefined && id === undefined && item_text === undefined) {
    return helpers.message(
      'If quantity is present, either id or item_text must be present'
    );
  }

  // If id is present → require item_text or quantity
  if (id !== undefined && item_text === undefined && quantity === undefined) {
    return helpers.message(
      'If id is present, either item_text or quantity must be present'
    );
  }

  return value;
});

export default {
  creationSchema,
  updateSchema,
  addItemSchema,
  modifyItemsSchema,
};
