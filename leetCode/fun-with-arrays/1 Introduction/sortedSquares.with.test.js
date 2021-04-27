/* global module, test, expect */
/* eslint no-plusplus: ["error", { "allowForLoopAfterthoughts": true }] */
/* eslint-disable no-magic-numbers, id-length, no-ternary, func-style, no-plusplus*/

// Given an integer array nums sorted in non-decreasing order, return an array of the squares of each number sorted in non-decreasing order.

/**
 * @param {number[]} nums
 * @return {number[]}
 */

var sortedSquares = function(nums) {
  let squares = [];

  nums.forEach((num) => {
    squares.push(num * num);
  });

  squares.sort((a, b) => {return a - b;});

  return squares;
};

test("1", () => {
  expect(sortedSquares([-4, -1, 0, 3, 10])).toStrictEqual([0, 1, 9, 16, 100]);
});

test("2", () => {
  expect(sortedSquares([-7, -3, 2, 3, 11])).toStrictEqual([4, 9, 9, 49, 121]);
});
