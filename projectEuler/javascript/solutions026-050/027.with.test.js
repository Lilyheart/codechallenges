/* global module, test, expect */
/* eslint no-plusplus: ["error", { "allowForLoopAfterthoughts": true }] */
/* eslint-disable no-magic-numbers, id-length, no-ternary*/

// Euler discovered the remarkable quadratic formula: n^2 + n + 41


// It turns out that the formula will produce 40 primes for the consecutive integer values 0 <= n <= 39. However, when n = 40, 40^2 + 40 + 41 = 40(40 + 1) + 41 is divisible by 41, and certainly when n = 41, 41^2 + 41 + 41 is clearly divisible by 41.

// The incredible formula n^2 - 79n + 1601 was discovered, which produces 80 primes for the consecutive values 0 <= n <= 79. The product of the coefficients, −79 and 1601, is −126479.

// Considering quadratics of the form: n^2 + an + b, where |a| < 1000 and  |b| < 1000
// where |n| is the modulus/absolute value of n

// Find the product of the coefficients, a and b, for the quadratic expression that produces the maximum number of primes for consecutive values of n, starting with n = 0.

function isPrime(n) {
  let possMaxFactor = Math.ceil(Math.sqrt(n));

  // Check for positive values
  if (n < 0) {
    return false;
  }

  // Check if even
  if (n % 2 === 0) {
    return false;
  }

  // Check for odd factors
  for (let i = 3; i <= possMaxFactor; i += 2) {
    if (n % i === 0) {
      return false;
    }
  }

  return true;
}

function maxConsecutivePrimes(a, b) {
  let hasPrime = true,
      n = 0;

  while (hasPrime) {
    let result = (n * n) + (a * n) + b;

    if (isPrime(result)) {
      n += 1;
    } else {
      hasPrime = false;
    }
  }

  // n minus 1 to reverse the last while loop and
  // n plus 1 to account for starting at zero
  // n - 1 + 1 = n

  return n;
}

function quadraticPrimes(range) {
  let maxNum,
      max = {};

  for (let a = -range; a < range; a++) {
    for (let b = -range; b <= range; b++) {
      maxNum = maxConsecutivePrimes(a, b);
      if (typeof max.num === "undefined" || maxNum > max.num) {
        max.num = maxNum;
        max.a = a;
        max.b = b;
      }
    }
  }

  return max.a * max.b;
}

test("1 quadraticPrimes(200) should return -4925.", () => {
  expect(quadraticPrimes(200)).toBe(-4925);
});

test("2 quadraticPrimes(500) should return -18901.", () => {
  expect(quadraticPrimes(500)).toBe(-18901);
});

test("3 quadraticPrimes(800) should return -43835.", () => {
  expect(quadraticPrimes(800)).toBe(-43835);
});

test("4 quadraticPrimes(1000) should return -59231.", () => {
  expect(quadraticPrimes(1000)).toBe(-59231);
});
