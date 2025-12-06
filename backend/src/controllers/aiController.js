import aiSchema from '#schemas/aiSchema.js';
import compress from '#utils/imageCompress.js';
import aiService from '#services/ai/aiService.js';
import { analyzeImage } from '#services/ai/imageAnalysisService.js';

async function getImageAnalysis(req, res, next) {
  try {
    const { error, value } = aiSchema.imageAnalysisSchema.validate(req.body);
    if (error) {
      const err = new Error(error);
      err.status = 400;
      throw err;
    }

    let compressed = [];

    for (const ib64 of value.imageBase64) {
      compressed.push(await compress(ib64));
    }

    const aiResponse = await analyzeImage(
      value.imageBase64,
      value.language ?? req.user.language,
      value.currentItemList ?? []
    );

    if (!aiResponse.success) {
      return res.status(500).json(aiResponse);
    }

    return res.status(200).json(aiResponse);
  } catch (err) {
    next(err);
  }
}

async function getUses(req, res, next) {
  try {
    const uses = await aiService.getUses(req.user.id);
    res.status(200).json({ usesLeft: uses });
  } catch (err) {
    next(err);
  }
}

export default { getImageAnalysis, getUses };
