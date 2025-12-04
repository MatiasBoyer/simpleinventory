import db from '#utils/db/db.js';

async function addItem(inventoryId, item_text, quantity) {
  const sql = await db.read('items/AddItem.sql');
  const result = await db.run(sql, {
    inventoryId,
    item_text,
    quantity,
  });

  return result?.rows[0]?.id ?? -1;
}

async function getItems(inventoryId, ownerId) {
  const sql = await db.read('items/GetItems.sql');
  const result = await db.run(sql, {
    inventoryId,
    ownerId,
  });

  return result?.rows ?? [];
}

async function modifyItem(itemId, inventoryId, updates) {
  const sql = await db.read('items/ModifyItem.sql');
  const result = await db.run(sql, {
    itemId,
    inventoryId,
    ...updates,
  });

  return result?.rowCount > 0 ?? false;
}

async function deleteItem(itemId, inventoryId) {
  const sql = await db.read('items/RemoveItem.sql');
  const result = await db.run(sql, {
    itemId,
    inventoryId,
  });

  return result?.rowCount > 0 ?? false;
}

export default {
  addItem,
  getItems,
  modifyItem,
  deleteItem,
};
