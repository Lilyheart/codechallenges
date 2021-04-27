/* global module, test, expect */
/* eslint no-plusplus: ["error", { "allowForLoopAfterthoughts": true }] */
/* eslint-disable no-magic-numbers, id-length, no-ternary*/

// The sum of the primes below 10 is 2 + 3 + 5 + 7 = 17.

// Find the sum of all the primes below two million.

function primeSummation(n) {
  let primes = [2],
      isPrime = true;

  for (let currEval = 3; currEval < n; currEval += 2) {
    let possMaxFactor;

    isPrime = true;
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

  return primes.reduce((accumulator, currentValue) => accumulator + currentValue);
}

test("0 primeSummation(10) should return 17.", () => {
  expect(primeSummation(10)).toBe(17);
});

test("1 primeSummation(17) should return 41.", () => {
  expect(primeSummation(17)).toBe(41);
});

test("2 primeSummation(2001) should return 277050.", () => {
  expect(primeSummation(2001)).toBe(277050);
});

test("3 primeSummation(140759) should return 873608362.", () => {
  expect(primeSummation(140759)).toBe(873608362);
});

test("4 primeSummation(2000000) should return 142913828922.", () => {
  expect(primeSummation(2000000)).toBe(142913828922);
});
