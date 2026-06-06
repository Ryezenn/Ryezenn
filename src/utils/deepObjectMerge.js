// src/utils/deepObjectMerge.js

/**
 * Deeply merges two or more objects into a new object.
 * Properties in later objects overwrite properties in earlier objects.
 * Handles nested objects and arrays by merging their contents recursively.
 *
 * @param {...object} sources - The objects to merge.
 * @returns {object} A new object representing the deep merge of all source objects.
 */
const deepObjectMerge = (...sources) => {
  const target = {};

  // Helper function to check if a value is a plain object
  const isPlainObject = (item) => {
    return (item && typeof item === 'object' && !Array.isArray(item) && item.constructor === Object);
  };

  sources.forEach(source => {
    if (isPlainObject(source)) {
      for (const key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          const sourceValue = source[key];
          const targetValue = target[key];

          if (isPlainObject(sourceValue) && isPlainObject(targetValue)) {
            // If both are plain objects, recursively merge them
            target[key] = deepObjectMerge(targetValue, sourceValue);
          } else if (Array.isArray(sourceValue) && Array.isArray(targetValue)) {
            // If both are arrays, concatenate them. You might want a different merge strategy for arrays,
            // e.g., merging objects within arrays, but for now, simple concatenation.
            target[key] = [...targetValue, ...sourceValue];
          } else if (Array.isArray(sourceValue) && targetValue === undefined) {
            // If target doesn't have the key, and source value is an array, deep clone the array to avoid reference issues
            target[key] = JSON.parse(JSON.stringify(sourceValue));
          } else if (isPlainObject(sourceValue) && targetValue === undefined) {
            // If target doesn't have the key, and source value is an object, deep clone the object
            target[key] = JSON.parse(JSON.stringify(sourceValue));
          } else {
            // Otherwise, assign the source value directly (overwriting if it exists)
            target[key] = sourceValue;
          }
        }
      }
    }
  });

  return target;
};

export default deepObjectMerge;
