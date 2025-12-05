import db from '#utils/db/db.js';

/**
 * @param {import('express').Request}
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
async function aiUsageHandler(req, res, next) {
  const ai_uses = Number(req.user.ai_uses || 0);

  if (ai_uses <= 0) {
    return res.status(429).json({ message: 'Quota reached' });
  }

  const sql = await db.read('ai/uses/UseAI.sql');
  const modified = await db.run(sql, { userId: req.user.id });

  const rowCount = modified?.rowCount ?? 0;
  if (rowCount <= 0) {
    return res.status(500).json({ message: 'Error using AI tokens' });
  }

  next();
}

export default aiUsageHandler;
