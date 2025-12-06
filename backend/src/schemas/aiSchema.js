import Joi from 'joi';
import environment from '#config/environment.js';

const imageBase64 = Joi.string().max(environment.MAX_FILE_SIZE);

const imageAnalysisSchema = Joi.object({
  imageBase64: Joi.alternatives()
    .try(imageBase64, Joi.array().items(imageBase64))
    .custom((value, helpers) => {
      if (typeof value === 'string') {
        return [value];
      }
      return value;
    })
    .required(),
  language: Joi.string().valid('spanish', 'english').optional(),
  inventoryId: Joi.number().required(),
});

export default { imageAnalysisSchema };
