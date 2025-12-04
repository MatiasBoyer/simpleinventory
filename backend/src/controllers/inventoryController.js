import schemas from '#schemas/inventorySchema.js';
import service from '#services/inventoryService.js';

async function createInventory(req, res, next) {
  try {
    const { error, value } = schemas.createInventorySchema.validate(req.body);
    if (error) {
      const err = new Error(error);
      err.status = 400;
      throw err;
    }

    const result = await service.createInventory(value.name, value.user);
    res.status(200).json({ id: result });
  } catch (err) {
    next(err);
  }
}

export { createInventory };
