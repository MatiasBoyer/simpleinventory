import schemas from '#schemas/itemsSchema.js';
import service from '#services/itemService.js';

async function addItem(req, res, next) {
  try {
    const { error: paramsError, value: paramsValue } =
      schemas.creationSchema.validate(req.params);
    if (paramsError) {
      const err = new Error(paramsError);
      err.status = 400;
      throw err;
    }

    const { error: bodyError, value: bodyValue } =
      schemas.addItemSchema.validate(req.body);
    if (bodyError) {
      const err = new Error(bodyError);
      err.status = 400;
      throw err;
    }

    const result = await service.addItems(paramsValue.inventoryId, bodyValue);
    res.status(200).json({ id: result.flatMap((m) => m.id) });
  } catch (err) {
    next(err);
  }
}

async function getItems(req, res, next) {
  try {
    const { error: paramsError, value: paramsValue } =
      schemas.creationSchema.validate(req.params);
    if (paramsError) {
      const err = new Error(paramsError);
      err.status = 400;
      throw err;
    }

    const result = await service.getItems(paramsValue.inventoryId, req.user.id);
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
}

async function modifyItem(req, res, next) {
  try {
    const { error: paramsError, value: paramsValue } =
      schemas.updateSchema.validate(req.params);
    if (paramsError) {
      const err = new Error(paramsError);
      err.status = 400;
      throw err;
    }

    const { error: bodyError, value: bodyValue } =
      schemas.modifyItemsSchema.validate(req.body);
    if (bodyError) {
      const err = new Error(bodyError);
      err.status = 400;
      throw err;
    }

    const result = await service.modifyItem(
      req.user.id,
      paramsValue.inventoryId,
      paramsValue.itemId,
      bodyValue
    );
    res.status(result ? 200 : 400).send();
  } catch (err) {
    next(err);
  }
}

async function deleteItem(req, res, next) {
  try {
    const { error: paramsError, value: paramsValue } =
      schemas.updateSchema.validate(req.params);
    if (paramsError) {
      const err = new Error(paramsError);
      err.status = 400;
      throw err;
    }

    const result = await service.deleteItem(
      req.user.id,
      paramsValue.inventoryId,
      paramsValue.itemId
    );
    res.status(result ? 200 : 400).send();
  } catch (err) {
    next(err);
  }
}

export default { addItem, getItems, modifyItem, deleteItem };
