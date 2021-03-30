/* global module, Set */
/* eslint-disable no-magic-numbers, func-style*/

/**
 * @param {number[]} candyType
 * @return {number}
 */

var distributeCandies = function(candyType) {
  let uniqueCandies, halfCandies;

  uniqueCandies = Math.ceil([...new Set(candyType)].length);
  halfCandies = candyType.length / 2;

  return Math.min(uniqueCandies, halfCandies);
};

module.exports = distributeCandies;
