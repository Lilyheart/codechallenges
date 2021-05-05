/* global module, test, expect */
/* eslint no-plusplus: ["error", { "allowForLoopAfterthoughts": true }] */
/* eslint-disable no-magic-numbers, id-length, no-ternary*/

// Let d(n) be defined as the sum of proper divisors of n (numbers less than n which divide evenly into n).
// If d(a) = b and d(b) = a, where a ≠ b, then a and b are an amicable pair and each of a and b are called amicable numbers.

// For example, the proper divisors of 220 are 1, 2, 4, 5, 10, 11, 20, 22, 44, 55 and 110; therefore d(220) = 284. The proper divisors of 284 are 1, 2, 4, 71 and 142; so d(284) = 220.

// Evaluate the sum of all the amicable numbers under 10000.

function d(n) {
  let factors = [1],
      maxFactor = Math.ceil(Math.sqrt(n));

  for (let i = 2; i <= maxFactor; i++) {
    if (n % i === 0) {
      factors.push(i);
      factors.push(n / i);
    }
  }

  return factors.reduce((a, c) => a + c, 0);
}

function sumAmicableNum(n) {
  let pairVals = [];

  for (let a = 1; a <= n; a++) {
    let b;

    b = d(a);
    if (d(b) === a && a !== b) {
      if (pairVals.indexOf(a) === -1) {
        pairVals.push(a);
        pairVals.push(b);
      }
    }
  }

  return pairVals.reduce((a, c) => (a + c), 0);
}

test("1 sumAmicableNum(1000) should return 504.", () => {
  expect(sumAmicableNum(1000)).toBe(504);
});

test("2 sumAmicableNum(2000) should return 2898.", () => {
  expect(sumAmicableNum(2000)).toBe(2898);
});

test("3 sumAmicableNum(5000) should return 8442.", () => {
  expect(sumAmicableNum(5000)).toBe(8442);
});

test("4 sumAmicableNum(10000) should return 31626.", () => {
  expect(sumAmicableNum(10000)).toBe(31626);
});
