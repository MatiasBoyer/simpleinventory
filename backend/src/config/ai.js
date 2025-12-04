import config from '#config/environment.js';
import { GoogleGenAI } from '@google/genai';

let _clientInstance = null;

/**
 * Factory function that returns the existing GoogleGenAI client instance
 * or creates a new one if it doesn't exist.
 *
 * @returns {GoogleGenAI} The singleton AI client instance.
 * @throws {Error} If the API Key is missing during initial creation.
 */
function GetAIClient() {
  if (_clientInstance) {
    return _clientInstance;
  }

  if (!config.GEMINI_API_KEY) {
    throw new Error(
      'AI Client Initialization Failed: GEMINI_API_KEY is missing.'
    );
  }

  _clientInstance = new GoogleGenAI({ apiKey: config.GEMINI_API_KEY });

  return _clientInstance;
}

export { GetAIClient };
