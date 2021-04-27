/* global module, test, expect */
/* eslint no-plusplus: ["error", { "allowForLoopAfterthoughts": true }] */
/* eslint-disable no-magic-numbers, id-length*/

// 2520 is the smallest number that can be divided by each of the numbers from 1 to 10 without any remainder.

// What is the smallest positive number that is evenly divisible by all of the numbers from 1 to 20?

function smallestMult(n) {
  let allFactors = {},
      result = 1;

  // For each number 1 to n (skipping 1 since everything is divisible by 1)
  for (let i = 2; i <= n; i++) {
    let testN = i,
        factors = {};

    // Find all the factors
    for (let j = 2; j <= i; j++) {
      // If it's evenly divisible by j (keep dividing by j)
      while (testN % j === 0) {
        factors[j] = factors[j] + 1 || 1;
        // reduce by j
        testN /= j;
      }
    }

    for (let factor in factors) {
      if (factors.hasOwnProperty(factor)) {
        if (allFactors.hasOwnProperty(factor)) {
          allFactors[factor] = Math.max(allFactors[factor], factors[factor]);
        } else {
          allFactors[factor] = factors[factor];
        }
      }
    }

  }

  for (let factor in allFactors) {
    if (allFactors.hasOwnProperty(factor)) {
      result *= Math.pow(factor, allFactors[factor]);
    }
  }

  return result;
}

test("1 smallestMult(5) should return 60.", () => {
  expect(smallestMult(5)).toBe(60);
});

test("2 smallestMult(7) should return 420.", () => {
  expect(smallestMult(7)).toBe(420);
});

test("3 smallestMult(10) should return 2520.", () => {
  expect(smallestMult(10)).toBe(2520);
});

test("4 smallestMult(13) should return 360360.", () => {
  expect(smallestMult(13)).toBe(360360);
});

test("5 smallestMult(20) should return 232792560.", () => {
  expect(smallestMult(20)).toBe(232792560);
});
