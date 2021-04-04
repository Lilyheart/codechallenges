/* global module, test, expect */
/* eslint no-plusplus: ["error", { "allowForLoopAfterthoughts": true }] */
/* eslint-disable no-magic-numbers, id-length*/

// The sum of the squares of the first ten natural numbers is, 385

// The square of the sum of the first ten natural numbers is, 3025

// Hence the difference between the sum of the squares of the first ten natural numbers and the square of the sum is 3025-385=2650

// Find the difference between the sum of the squares of the first one hundred natural numbers and the square of the sum.


function sumSquareDifference(n) {
  let sum = (n * (n + 1)) / 2,
      squareSum = (n * (n + 1) * ((2 * n) + 1)) / 6;

  return Math.pow(sum, 2) - squareSum;
}

test("1 sumSquareDifference(10) should return 2640.", () => {
  expect(sumSquareDifference(10)).toBe(2640);
});

test("2 sumSquareDifference(20) should return 41230.", () => {
  expect(sumSquareDifference(20)).toBe(41230);
});

test("3 sumSquareDifference(100) should return 25164150.", () => {
  expect(sumSquareDifference(100)).toBe(25164150);
});
