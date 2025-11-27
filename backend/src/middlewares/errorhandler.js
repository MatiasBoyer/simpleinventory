/**
 * @param {Error} err
 * @param {import('express').Request}
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
function errorHandler(err, req, res, next) {
  if (!err.status) {
    console.error(err.stack);
  }
  res
    .status(err.status || 500)
    .json({ message: err.message || 'Internal Server Error' });
}

export default errorHandler;
