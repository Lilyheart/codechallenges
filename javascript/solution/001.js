/* global module */
/* eslint-disable no-magic-numbers*/
// If we list all the natural numbers below 10 that are multiples of 3 or 5, we get 3, 5, 6 and 9. The sum of these multiples is 23.

// Find the sum of all the multiples of 3 or 5 below 1000.
function multiplesOf3and5(number) {
  return Array.from(Array(number).keys())
    .filter(function (val) {return val % 3 === 0 || val % 5 === 0;})
    .reduce(function (acc, val) {return acc + val;});
}

module.exports = multiplesOf3and5;
