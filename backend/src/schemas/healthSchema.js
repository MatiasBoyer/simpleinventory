import Joi from 'joi';

const healthSchema = Joi.object({
  errorStatus: Joi.number().optional(),
});

export { healthSchema };
