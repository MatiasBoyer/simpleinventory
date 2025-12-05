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

    const result = await service.createInventory(
      value.inventoryName,
      req.user.id
    );
    res.status(201).json({ id: result });
  } catch (err) {
    next(err);
  }
}

async function deleteInventory(req, res, next) {
  try {
    const { error, value } = schemas.paramsSchema.validate(req.params);
    if (error) {
      const err = new Error(error);
      err.status = 400;
      throw err;
    }

    const result = await service.deleteInventory(
      value.inventoryId,
      req.user.id
    );

    res.status(result ? 204 : 404).send();
  } catch (err) {
    next(err);
  }
}

async function getInventories(req, res, next) {
  try {
    const result = await service.getInventories(req.user.id);
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
}

async function updateInventory(req, res, next) {
  try {
    const { error: paramsError, value: paramsValue } =
      schemas.paramsSchema.validate(req.params);
    if (paramsError) {
      const err = new Error(paramsError);
      err.status = 400;
      throw err;
    }

    const { error, value } = schemas.updateInventorySchema.validate(req.body);
    if (error) {
      const err = new Error(error);
      err.status = 400;
      throw err;
    }

    const result = await service.updateInventory(
      paramsValue.inventoryId,
      req.user.id,
      value
    );
    res.status(result ? 200 : 404).send();
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
