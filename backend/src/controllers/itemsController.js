import schemas from '#schemas/itemsSchema.js';
import service from '#services/itemService.js';

async function addItem(req, res, next) {
  try {
    const { paramsError, paramsValue } = schemas.creationSchema.validate(
      req.params
    );
    if (error) {
      const err = new Error(paramsError);
      err.status = 400;
      throw err;
    }

    const { bodyError, bodyValue } = schemas.addItemSchema.validate(req.body);
    if (error) {
      const err = new Error(bodyError);
      err.status = 400;
      throw err;
    }

    const result = await service.addItem(
      paramsValue.inventoryId,
      bodyValue.item_text,
      bodyValue.quantity
    );
    res.status(200).json({ id: result });
  } catch (err) {
    next(err);
  }
}

async function getItems(req, res, next) {
  try {
    const { paramsError, paramsValue } = schemas.creationSchema.validate(
      req.params
    );
    if (error) {
      const err = new Error(paramsError);
      err.status = 400;
      throw err;
    }

    const result = await service.getItems(paramsValue.inventoryId, undefined);
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
}

async function modifyItem(req, res, next) {
  try {
    const { paramsError, paramsValue } = schemas.updateSchema.validate(
      req.params
    );
    if (error) {
      const err = new Error(paramsError);
      err.status = 400;
      throw err;
    }

    const { bodyError, bodyValue } = schemas.modifyItemsSchema.validate(
      req.body
    );
    if (error) {
      const err = new Error(bodyError);
      err.status = 400;
      throw err;
    }

    const result = await service.modifyItem(
      paramsValue.inventoryId,
      paramsValue.itemId,
      bodyValue
    );
    res.status(result ? 200 : 500);
  } catch (err) {
    next(err);
  }
}

async function deleteItem(req, res, next) {
  try {
    const { paramsError, paramsValue } = schemas.updateSchema.validate(
      req.params
    );
    if (error) {
      const err = new Error(paramsError);
      err.status = 400;
      throw err;
    }

    const result = await service.deleteItem(
      paramsValue.inventoryId,
      paramsValue.itemId
    );
    res.status(result ? 200 : 500);
  } catch (err) {
    next(err);
  }
}

export { addItem, getItems, modifyItem, deleteItem };
