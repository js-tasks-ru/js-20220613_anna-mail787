/**
 * pick - Creates an object composed of the picked object properties:
 * @param {object} obj - the source object
 * @param {...string} fields - the properties paths to pick
 * @returns {object} - returns the new object
 */
export const pick = (obj, ...fields) => {

  const pickedObject = Object.fromEntries(Object.entries(obj).filter(entry => fields.includes(entry[0])));

  return pickedObject;
};
