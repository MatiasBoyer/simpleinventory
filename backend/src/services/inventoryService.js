import db from '#utils/db/db.js';

async function createInventory(inventory_name, ownerId) {
  const sql = await db.read('inventory/CreateInventory.sql');
  const result = await db.run(sql, {
    inventory_name,
    ownerId,
  });

  return result?.rows[0]?.id ?? -1;
}

async function deleteInventory(inventoryId, ownerId) {
  const sql = await db.read('inventory/DeleteInventory.sql');
  const result = await db.run(sql, {
    inventoryId,
    ownerId,
  });

  return result?.rowCount > 0 ?? false;
}

async function getInventories(ownerId) {
  const sql = await db.read('inventory/FetchInventories.sql');
  const result = await db.run(sql, {
    ownerId,
  });

  return result?.rows ?? [];
}

async function updateInventory(inventoryId, ownerId, updates) {
  const sql = await db.read('inventory/UpdateInventory.sql');
  const result = await db.run(sql, { inventoryId, ownerId, ...updates });

  return result?.rowCount > 0 ?? false;
}

export default {
  createInventory,
  deleteInventory,
  getInventories,
  updateInventory,
};
