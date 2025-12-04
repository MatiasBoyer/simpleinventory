import db from '#utils/db/db.js';

async function createInventory(name, user) {
  const sql = await db.read('inventory/CreateInventory.sql');
  const result = await db.run(sql, {
    name,
    user,
  });

  return result.rows[0].id;
}

export default { createInventory };
