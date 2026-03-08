/**
 * Retrieves a specified number of randomly selected, unique elements from an array.
 * @param {Array} array The array to sample from.
 * @param {number} count The number of items to pick.
 * @returns {Array} A new array containing the randomly selected items.
 */
export function getRandomItems(array, count) {
  if (!array || array.length === 0) return [];
  const itemsCount = Math.min(count, array.length);
  const shuffled = [...array].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, itemsCount);
}
