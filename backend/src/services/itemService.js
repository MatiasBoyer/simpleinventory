import db from '#utils/db/db.js';

async function addItems(inventoryId, items) {
  const sql = await db.read('items/AddItem.sql');

  return db.run(async (client) => {
    const results = [];

    for (const item of items) {
      const result = await db.run(sql, {
        inventoryId,
        ...item,
      });
      results.push(result.rows[0]);
    }

    return results;
  });
}

async function getItems(inventoryId, ownerId) {
  const sql = await db.read('items/GetItems.sql');
  const result = await db.run(sql, {
    inventoryId,
    ownerId,
  });

  return result?.rows ?? [];
}

async function modifyItem(ownerId, inventoryId, itemId, updates) {
  const sql = await db.read('items/ModifyItem.sql');
  const result = await db.run(sql, {
    ownerId,
    inventoryId,
    itemId,

    quantity: null,
    item_text: null,

    ...updates,
  });

  return result?.rowCount > 0 ?? false;
}

async function deleteItem(ownerId, inventoryId, itemId) {
  const sql = await db.read('items/RemoveItem.sql');
  const result = await db.run(sql, {
    ownerId,
    itemId,
    inventoryId,
  });

  return result?.rowCount > 0 ?? false;
}

export default {
  addItems,
  getItems,
  modifyItem,
  deleteItem,
};
