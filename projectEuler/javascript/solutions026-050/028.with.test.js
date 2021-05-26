/* global module, test, expect */
/* eslint no-plusplus: ["error", { "allowForLoopAfterthoughts": true }] */
/* eslint-disable no-magic-numbers, id-length, no-ternary*/

//Starting with the number 1 and moving to the right in a clockwise direction a 5 by 5 spiral is formed as follows:

// 21 22 23 24 25
// 20  7  8  9 10
// 19  6  1  2 11
// 18  5  4  3 12
// 17 16 15 14 13
//
// It can be verified that the sum of the numbers on the diagonals is 101.
//
// What is the sum of the numbers on the diagonals in a 1001 by 1001 spiral formed in the same way?

function spiralDiagonals(n) {
  let sum = 1,
      counter = 1;

  for (let i = 3; i <= n; i += 2) {
    for (let j = 0; j < 4; j++) {
      counter += i - 1;
      sum += counter;
    }
  }

  return sum;
}

test("1 spiralDiagonals(101) should return 692101.", () => {
  expect(spiralDiagonals(101)).toBe(692101);
});

test("2 spiralDiagonals(303) should return 18591725.", () => {
  expect(spiralDiagonals(303)).toBe(18591725);
});

test("3 spiralDiagonals(505) should return 85986601.", () => {
  expect(spiralDiagonals(505)).toBe(85986601);
});

test("4 spiralDiagonals(1001) should return 669171001.", () => {
  expect(spiralDiagonals(1001)).toBe(669171001);
});
