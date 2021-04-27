/* global module, test, expect */
/* eslint no-plusplus: ["error", { "allowForLoopAfterthoughts": true }] */
/* eslint-disable no-magic-numbers, id-length, no-ternary, func-style, no-plusplus*/

// Given a binary array nums, return the maximum number of consecutive 1's in the array.

/**
 * @param {number[]} nums
 * @return {number}
 */

var findMaxConsecutiveOnes = function(nums) {
  let maxCount = 0,
      subMax = 0;

  for (let num of nums) {
    if (num === 1) {
      subMax++;
    } else {
      maxCount = Math.max(maxCount, subMax);
      subMax = 0;
    }
  }

  maxCount = Math.max(maxCount, subMax);

  return maxCount;
};

test("1", () => {
  expect(findMaxConsecutiveOnes([1, 1, 0, 1, 1, 1])).toBe(3);
});

test("2", () => {
  expect(findMaxConsecutiveOnes([1, 0, 1, 1, 0, 1])).toBe(2);
});

test("3", () => {
  expect(findMaxConsecutiveOnes([0, 0, 0, 1, 0, 1, 1, 1, 1, 1])).toBe(5);
});

test("4", () => {
  expect(findMaxConsecutiveOnes([1, 1, 1, 1, 1, 0, 0, 0, 1, 0])).toBe(5);
});
