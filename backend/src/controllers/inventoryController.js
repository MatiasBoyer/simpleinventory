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

async function deleteInventory(req, res, next) {
  try {
    const { error, value } = schemas.deleteInventorySchema.validate(req.params);
    if (error) {
      const err = new Error(error);
      err.status = 400;
      throw err;
    }

    const result = await service.deleteInventory(value.inventoryId, undefined);
    res.status(result ? 200 : 404);
  } catch (err) {
    next(err);
  }
}

async function getInventories(req, res, next) {
  try {
    const result = await service.getInventories(undefined);
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
}

async function updateInventory(req, res, next) {
  try {
    const { error, value } = schemas.updateInventorySchema.validate(req.body);
    if (error) {
      const err = new Error(error);
      err.status = 400;
      throw err;
    }

    const result = await service.updateInventory(undefined, undefined, value);
    res.status(result ? 200 : 404);
  } catch (err) {
    next(err);
  }
}

export default {
  createInventory,
  deleteInventory,
  updateInventory,
  getInventories,
};
