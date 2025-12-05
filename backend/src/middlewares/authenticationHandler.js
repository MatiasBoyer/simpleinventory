import { auth } from '#utils/auth.js';

/**
 * @param {import('express').Request}
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
async function authenticationHandler(req, res, next) {
  console.info('authenticated request');

  const session = await auth.api.getSession({
    headers: req.headers,
  });

  if (!session) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  req.user = session.user;

  next();
}

export default authenticationHandler;
