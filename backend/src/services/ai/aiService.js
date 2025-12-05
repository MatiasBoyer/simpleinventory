import db from '#utils/db/db.js';

async function getUses(userId) {
  const sql = await db.read('ai/uses/GetUses.sql');
  const result = await db.run(sql, { userId });

  return result?.rows?.[0]?.ai_uses ?? 0;
}

export default { getUses };
