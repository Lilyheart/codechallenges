/* global module, test, expect */
/* eslint no-plusplus: ["error", { "allowForLoopAfterthoughts": true }] */
/* eslint-disable no-magic-numbers, id-length, no-ternary*/

// A perfect number is a number for which the sum of its proper divisors is exactly equal to the number. For example, the sum of the proper divisors of 28 would be 1 + 2 + 4 + 7 + 14 = 28, which means that 28 is a perfect number.

// A number n is called deficient if the sum of its proper divisors is less than n and it is called abundant if this sum exceeds n.

// As 12 is the smallest abundant number, 1 + 2 + 3 + 4 + 6 = 16, the smallest number that can be written as the sum of two abundant numbers is 24. By mathematical analysis, it can be shown that all integers greater than 28123 can be written as the sum of two abundant numbers. However, this upper limit cannot be reduced any further by analysis even though it is known that the greatest number that cannot be expressed as the sum of two abundant numbers is less than this limit.

// Find the sum of all the positive integers which cannot be written as the sum of two abundant numbers.

function isAbundant(n) {
  let maxFactor = Math.sqrt(n),
      sum = 1;

  for (let i = 2; i <= maxFactor; i++) {
    if (n % i === 0) {
      sum += i;
      if (i !== maxFactor) {
        sum += n / i;
      }
      if (sum > n) {return true;}
    }
  }

  return false;
}

function isAbundantSum(num, abundants, memoizedAbundants) {
  for (let abundant of abundants) {
    let addend = num - abundant;

    if (memoizedAbundants[addend]) {return true;}
  }

  return false;
}

function sumOfNonAbundantNumbers(n) {
  let abundants = [],
      memoizedAbundants = {},
      abundantSum = 0;

  for (let i = 1; i <= n; i++) {
    if (isAbundant(i)) {
      abundants.push(i);
      memoizedAbundants[i] = true;
    }

    if (!isAbundantSum(i, abundants, memoizedAbundants)) {
      abundantSum += i;
    }
  }

  return abundantSum;
}

test("0 sumOfNonAbundantNumbers(25) should return 301.", () => {
  expect(sumOfNonAbundantNumbers(25)).toBe(301);
});

test("1 sumOfNonAbundantNumbers(10000) should return 3731004.", () => {
  expect(sumOfNonAbundantNumbers(10000)).toBe(3731004);
});

test("2 sumOfNonAbundantNumbers(15000) should return 4039939.", () => {
  expect(sumOfNonAbundantNumbers(15000)).toBe(4039939);
});

test("3 sumOfNonAbundantNumbers(20000) should return 4159710.", () => {
  expect(sumOfNonAbundantNumbers(20000)).toBe(4159710);
});

test("4 sumOfNonAbundantNumbers(28123) should return 4179871.", () => {
  expect(sumOfNonAbundantNumbers(28123)).toBe(4179871);
});
