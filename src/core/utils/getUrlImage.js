/**
 * 
 * @param {string} imageUrl image Url
 * @returns {string} new Image URL
 */

export function getImageUrl(image) {
  return new URL(image, import.meta.url).href;
}
