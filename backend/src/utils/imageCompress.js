import sharp from 'sharp';

/**
 * Compress an image to JPEG.
 * @param {string} base64Image - Image as a base64 URI (data:image/...;base64,...)
 * @returns {Promise<string>} - Compressed image as base64 JPEG
 */
async function compressImageToJpeg(base64Image, quality = 50) {
  const matches = base64Image.match(
    /^data:(image\/[a-zA-Z0-9.+-]+);base64,(.+)$/
  );
  if (!matches) throw new Error('Invalid base64 image URI');

  const mimeType = matches[1].toLowerCase();
  const data = matches[2];
  const buffer = Buffer.from(data, 'base64');

  const supportedFormats = [
    'image/png',
    'image/jpeg',
    'image/jpg',
    'image/heic',
  ];
  if (!supportedFormats.includes(mimeType)) {
    throw new Error(`Unsupported image format: ${mimeType}`);
  }

  const compressedBuffer = await sharp(buffer).jpeg({ quality }).toBuffer();

  return `data:image/jpeg;base64,${compressedBuffer.toString('base64')}`;
}

export default compressImageToJpeg;
