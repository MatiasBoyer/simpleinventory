import { serverHealth } from '#services/healthService.js';
import { healthSchema } from '#schemas/healthSchema.js';

async function getHealth(req, res, next) {
  try {
    const { error, value } = healthSchema.validate(req.query);
    if (error) {
      const err = new Error(error);
      err.status = 400;
      throw err;
    }

    const result = await serverHealth(value);
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
}

export { getHealth };
