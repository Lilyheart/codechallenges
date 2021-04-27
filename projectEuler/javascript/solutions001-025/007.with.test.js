/* global module, test, expect */
/* eslint no-plusplus: ["error", { "allowForLoopAfterthoughts": true }] */
/* eslint-disable no-magic-numbers, id-length, no-ternary*/

// By listing the first six prime numbers: 2, 3, 5, 7, 11, and 13, we can see that the 6th prime is 13.

// What is the 10 001st prime number?

function nthPrime(n) {
  let currEval = 1,
      primes = [2],
      isPrime = true;

  while (primes.length < n) {
    let possMaxFactor;

    isPrime = true;
    currEval += 2;

    possMaxFactor = Math.ceil(Math.sqrt(currEval));

    for (let i = 0; primes[i] <= possMaxFactor; i++) {
      if (currEval % primes[i] === 0) {
        isPrime = false;
        break;
      }
    }

    if (isPrime) {
      primes.push(currEval);
    }
  }

  return primes.pop();
}

test("1 nthPrime(1) should return 2.", () => {
  expect(nthPrime(1)).toBe(2);
});

test("2 nthPrime(2) should return 3.", () => {
  expect(nthPrime(2)).toBe(3);
});

test("3 nthPrime(6) should return 13.", () => {
  expect(nthPrime(6)).toBe(13);
});

test("4 nthPrime(10) should return 29.", () => {
  expect(nthPrime(10)).toBe(29);
});

test("5 nthPrime(100) should return 541.", () => {
  expect(nthPrime(100)).toBe(541);
});

test("6 nthPrime(1000) should return 7919.", () => {
  expect(nthPrime(1000)).toBe(7919);
});

test("7 nthPrime(10001) should return 104743.", () => {
  expect(nthPrime(10001)).toBe(104743);
});
