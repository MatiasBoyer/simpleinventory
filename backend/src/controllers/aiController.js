import aiSchema from '#schemas/aiSchema.js';
import compress from '#utils/imageCompress.js';
import { analyzeImage } from '#services/imageAnalysisService.js';

async function getImageAnalysis(req, res, next) {
  try {
    const { error, value } = aiSchema.imageAnalysisSchema.validate(req.body);
    if (error) {
      const err = new Error(error);
      err.status = 400;
      throw err;
    }

    const compressed = await compress(value.imageBase64);

    const aiResponse = await analyzeImage(compressed, value.language);

    res.status(200).json(aiResponse);
  } catch (err) {
    next(err);
  }
}

export { getImageAnalysis };
