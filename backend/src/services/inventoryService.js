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

async function getInventory(ownerId, inventoryId) {
  const sql = await db.read('inventory/FetchInventory.sql');
  const result = await db.run(sql, {
    ownerId,
    inventoryId,
  });

  return result?.rows ?? [];
}

async function updateInventory(inventoryId, ownerId, updates) {
  const sql = await db.read('inventory/UpdateInventory.sql');

  if (updates?.inventory_name) {
    await db.run(sql, { inventoryId, ownerId, ...updates });
  }

  if (updates?.items) {
    for (const item of updates.items) {
      const update = {
        id: item.id ?? null,
        item_text: item.item_text ?? null,
        quantity: item.quantity !== 0 ? item.quantity : null,
      };

      await db.run(
        `SELECT * FROM public.fn_modify_inventory_ctn(:ownerId, :inventoryId, :id, :item_text, :quantity)`,
        {
          ownerId,
          inventoryId,
          id: update.id,
          item_text: update.item_text,
          quantity: update.quantity,
        }
      );
    }
  }

  return true;
}

export default {
  createInventory,
  deleteInventory,
  getInventories,
  getInventory,
  updateInventory,
};
