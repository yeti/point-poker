
/**
 * Like Lodash's sample - returns random element from array
 * @param  {array} arr  The array to sample
 * @return {*}          The element to return
 */
export const sample = arr => arr[Math.floor(Math.random() * arr.length)];
