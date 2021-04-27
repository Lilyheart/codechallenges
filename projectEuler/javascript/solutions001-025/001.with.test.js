/* global module, test, expect */
/* eslint-disable no-magic-numbers*/

// If we list all the natural numbers below 10 that are multiples of 3 or 5, we get 3, 5, 6 and 9. The sum of these multiples is 23.

// Find the sum of all the multiples of 3 or 5 below 1000.
function multiplesOf3and5(number) {
  return Array.from(Array(number).keys())
    .filter(function (val) {return val % 3 === 0 || val % 5 === 0;})
    .reduce(function (acc, val) {return acc + val;});
}

test("multiplesOf3and5(49) should return 543", () => {
  expect(multiplesOf3and5(49)).toBe(543);
});

test("multiplesOf3and5(1000) should return 233168", () => {
  expect(multiplesOf3and5(1000)).toBe(233168);
});

test("multiplesOf3and5(8456) should return 16687353", () => {
  expect(multiplesOf3and5(8456)).toBe(16687353);
});

test("multiplesOf3and5(19564) should return 89301183", () => {
  expect(multiplesOf3and5(19564)).toBe(89301183);
});
