/* global module, test, expect, BigInt */
/* eslint no-plusplus: ["error", { "allowForLoopAfterthoughts": true }] */
/* eslint-disable no-magic-numbers, id-length, no-ternary*/

// n! means n × (n − 1) × ... × 3 × 2 × 1

// For example, 10! = 10 × 9 × ... × 3 × 2 × 1 = 3628800, and the sum of the digits in the number 10! is 3 + 6 + 2 + 8 + 8 + 0 + 0 = 27.

// Find the sum of the digits in the number 100!

function sumFactorialDigits(n) {
  let factSplit,
      factSum = 0,
      factorial = BigInt(1);

  for (let i = 2; i <= n; i++) {
    factorial *= BigInt(i);
  }

  factSplit = factorial.toString().split("");

  for (let digit of factSplit) {
    factSum += Number(digit);
  }

  return factSum;
}

test("1 sumFactorialDigits(10) should return 27.", () => {
  expect(sumFactorialDigits(10)).toBe(27);
});

test("2 sumFactorialDigits(25) should return 72.", () => {
  expect(sumFactorialDigits(25)).toBe(72);
});

test("3 sumFactorialDigits(50) should return 216.", () => {
  expect(sumFactorialDigits(50)).toBe(216);
});

test("4 sumFactorialDigits(75) should return 432.", () => {
  expect(sumFactorialDigits(75)).toBe(432);
});

test("5 sumFactorialDigits(100) should return 648.", () => {
  expect(sumFactorialDigits(100)).toBe(648);
});
