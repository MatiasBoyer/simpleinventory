import Joi from 'joi';
import environment from '#config/environment.js';

const imageAnalysisSchema = Joi.object({
  imageBase64: Joi.string().required().max(environment.MAX_FILE_SIZE),
  language: Joi.string().valid('spanish', 'english').default('english'),
});

export default { imageAnalysisSchema };
