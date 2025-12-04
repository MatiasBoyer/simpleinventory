/**
 * Predicts the size of a file using its base64 counterpart
 * @param {string} base64
 * @returns {number} File size in bytes
 */
export default function predictFileSize(base64) {
  return (base64.length * 3) / 4;
}
