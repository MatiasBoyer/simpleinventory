import { GetAIClient } from '#config/ai.js';
import { GetImageAnalysisPrompt } from '#utils/promptProvider.js';

const b64regex = /^data:([^;]+);base64,(.+)$/;

/**
 * Analyzes an image provided as a base64-encoded string using an AI client.
 *
 * @async
 * @function analyzeImage
 * @param {string[]} base64 - The base64-encoded string representation of the image (in PNG format).
 * @returns {Promise<Object>} A promise that resolves to an object containing the analysis result:
 * - `success` {boolean}: Indicates whether the analysis was successful.
 * - `error` {string|null}: Contains the error message if the analysis failed, otherwise `null`.
 * - `data` {Object|Array}: The parsed JSON response from the AI client if successful, otherwise an empty array.
 */
async function analyzeImage(base64, language = 'english', currentList = []) {
  const prompt = GetImageAnalysisPrompt(language, currentList);
  const aiClient = GetAIClient();

  let attachments = [];
  /*{
      inlineData: {
        mimeType: mimeType,
        data: cleanBase64,
      },
    },*/

  attachments = base64
    .map((m) => {
      const match = m.match(b64regex);

      if (!match) {
        return null;
      }

      return {
        inlineData: {
          mimeType: match[1],
          data: match[2],
        },
      };
    })
    .filter((x) => x);

  try {
    const response = await aiClient.models.generateContent({
      model: prompt.model,
      contents: [
        {
          role: 'user',
          parts: [{ text: prompt.text }, ...attachments],
        },
      ],
      config: {
        temperature: prompt.temperature,
      },
    });

    let text = response.candidates[0].content.parts[0].text;

    text = text
      .replace(/```json|```/g, '')
      .replace(/^\s*Here.*?:/i, '')
      .trim();

    let json;
    try {
      json = JSON.parse(text);
    } catch (e) {
      console.error('Gemini returned invalid JSON:', text);
      throw new Error('Could not parse AI JSON');
    }

    return { success: true, error: null, data: json };
  } catch (err) {
    return {
      success: false,
      error: err.message,
      data: [],
    };
  }
}

export { analyzeImage };
