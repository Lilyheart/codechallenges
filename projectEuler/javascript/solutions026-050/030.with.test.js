/* global module, test, expect */
/* eslint no-plusplus: ["error", { "allowForLoopAfterthoughts": true }] */
/* eslint-disable no-magic-numbers, id-length, no-ternary*/

// Surprisingly there are only three numbers that can be written as the sum of fourth powers of their digits:

// 1634 = 14 + 64 + 34 + 44
// 8208 = 84 + 24 + 04 + 84
// 9474 = 94 + 44 + 74 + 44
// As 1 = 14 is not a sum it is not included.
//
// The sum of these numbers is 1634 + 8208 + 9474 = 19316.
//
// Find the sum of all the numbers that can be written as the sum of fifth powers of their digits.

function digitnPowers(n) {
  let upperbound = Math.pow(10, n + 1) - 1,
      powers = [];

  for (let i = 2; i < upperbound; i++) {
    let sum = 0,
        numbers = i.toString().split("");

    sum = numbers.reduce((c, a) => c + Math.pow(Number(a), n), 0);

    if (sum === i) {
      powers.push(i);
    }

  }

  return powers.reduce((c, a) => c + a, 0);
}


test("1 digitnPowers(2) should return 0.", () => {
  expect(digitnPowers(2)).toBe(0);
});

test("2 digitnPowers(3) should return 1301.", () => {
  expect(digitnPowers(3)).toBe(1301);
});

test("3 digitnPowers(4) should return 19316.", () => {
  expect(digitnPowers(4)).toBe(19316);
});

test("4 digitnPowers(5) should return 443839.", () => {
  expect(digitnPowers(5)).toBe(443839);
});
