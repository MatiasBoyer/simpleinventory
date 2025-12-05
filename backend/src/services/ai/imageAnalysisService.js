import { GetAIClient } from '#config/ai.js';
import { GetImageAnalysisPrompt } from '#utils/promptProvider.js';

/**
 * Analyzes an image provided as a base64-encoded string using an AI client.
 *
 * @async
 * @function analyzeImage
 * @param {string} base64 - The base64-encoded string representation of the image (in PNG format).
 * @returns {Promise<Object>} A promise that resolves to an object containing the analysis result:
 * - `success` {boolean}: Indicates whether the analysis was successful.
 * - `error` {string|null}: Contains the error message if the analysis failed, otherwise `null`.
 * - `data` {Object|Array}: The parsed JSON response from the AI client if successful, otherwise an empty array.
 */
async function analyzeImage(base64, language = 'english', currentList = []) {
  const prompt = GetImageAnalysisPrompt(language, currentList);
  const aiClient = GetAIClient();

  let mimeType = 'image/png';
  let cleanBase64 = base64;

  if (base64.includes(';base64,')) {
    const parts = base64.split(';base64,');

    const mimePart = parts[0];
    if (mimePart.startsWith('data:')) {
      mimeType = mimePart.substring(5);
    }

    cleanBase64 = parts[1];
  }

  try {
    const response = await aiClient.models.generateContent({
      model: prompt.model,
      contents: [
        {
          role: 'user',
          parts: [
            { text: prompt.text },
            {
              inlineData: {
                mimeType: mimeType,
                data: cleanBase64,
              },
            },
          ],
        },
      ],
      config: {
        temperature: prompt.temperature,
      },
    });

    const json = JSON.parse(response.candidates[0].content.parts[0].text);
    return {
      success: true,
      error: null,
      data: json,
    };
  } catch (err) {
    return {
      success: false,
      error: err.message,
      data: [],
    };
  }
}

export { analyzeImage };
