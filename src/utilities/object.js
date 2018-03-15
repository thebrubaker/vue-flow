/**
 * Deep copy the data on an object.
 * @param  {Object} object
 * @return {Object}
 */
export function deepCopy(object) {
  return JSON.parse(JSON.stringify(object));
}
