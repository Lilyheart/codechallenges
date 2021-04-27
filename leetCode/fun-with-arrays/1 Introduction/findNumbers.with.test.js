/* global module, test, expect */
/* eslint no-plusplus: ["error", { "allowForLoopAfterthoughts": true }] */
/* eslint-disable no-magic-numbers, id-length, no-ternary, func-style, no-plusplus*/

// Given an array nums of integers, return how many of them contain an even number of digits.

/**
 * @param {number[]} nums
 * @return {number}
 */

var findNumbers = function(nums) {
  let evenCount = 0;

  nums.forEach((num) => {
    evenCount += (num.toString().length % 2 === 0) ? 1 : 0;
  });

  return evenCount;
};

test("1", () => {
  expect(findNumbers([12, 345, 2, 6, 7896])).toBe(2);
});

test("2", () => {
  expect(findNumbers([555, 901, 482, 1771])).toBe(1);
});
