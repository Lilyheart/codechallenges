/* global require, test, expect, multiplesOf3and5 */
/* eslint-disable no-magic-numbers, comma-spacing*/

const distributeCandies = require("./week1-DistributeCandies");

test("Example 1", () => {
  expect(distributeCandies([1,1,2,2,3,3])).toBe(3);
});

test("Example 2", () => {
  expect(distributeCandies([1,1,2,3])).toBe(2);
});

test("Example 3", () => {
  expect(distributeCandies([6,6,6,6])).toBe(1);
});
