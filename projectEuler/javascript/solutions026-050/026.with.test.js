/* global module, test, expect */
/* eslint no-plusplus: ["error", { "allowForLoopAfterthoughts": true }] */
/* eslint-disable no-magic-numbers, id-length, no-ternary, no-plusplus*/

// A unit fraction contains 1 in the numerator.

// Where 0.1(6) means 0.166666..., and has a 1-digit recurring cycle. It can be seen that 1/7 has a 6-digit recurring cycle.

// Find the value of d < 1000 for which 1/d contains the longest recurring cycle in its decimal fraction part.


// terminating fractions will have remainder of 0
// repeating fractions will return to a original remainder before n - 1 repeats
function termOrCleanRep(n) {
  let loop = 0,
      originalRem = 1 % n,
      remainder = originalRem,
      result = {valid: true, length: 0};

  do {
    // check length for clean repeat
    loop++;
    if (loop === n) {
      result.valid = false;
      result.length = 0;
      break;
    }

    result.length++;
    remainder = (remainder * 10) % n;

    // If no repeat
    if (remainder === 0) {
      result.length = 0;
    }

  } while (remainder !== 0 && remainder !== originalRem);

  return result;
}

// Reciprocals of integers not coprime to 10
//   https://www.wikiwand.com/en/Repeating_decimal#/Reciprocals_of_composite_integers_coprime_to_10
function dirtyRep(n) {
  let newNum = n;

  // remove factors of 5
  while (newNum % 5 === 0) {newNum /= 5;}

  // remove factors of 2
  while (newNum % 2 === 0) {newNum /= 2;}

  return termOrCleanRep(newNum);
}

function reciprocalCycles(n) {
  let newlength,
      max = {d: 0, length: 0};

  for (let i = 2; i <= n; i++) {
    newlength = termOrCleanRep(i);
    if (newlength.valid === false) {
      newlength = dirtyRep(i);
    }

    if (newlength.length >= max.length) {
      max.d = i;
      max.length = newlength.length;
    }
  }

  console.log(max);

  return max.d;
}

// test("0.2 reciprocalCycles(2) should return 6.", () => {expect(reciprocalCycles(2)).toBe(2);});
//
// test("0.3 reciprocalCycles(3) should return 1.", () => {expect(reciprocalCycles(3)).toBe(3);});
//
// test("0.4 reciprocalCycles(4) should return 0.", () => {expect(reciprocalCycles(4)).toBe(3);});
//
// test("0.5 reciprocalCycles(5) should return 0.", () => {expect(reciprocalCycles(5)).toBe(3);});
//
// test("0.6 reciprocalCycles(6) should return 1.", () => {expect(reciprocalCycles(6)).toBe(6);});
//
// test("0.7 reciprocalCycles(7) should return 6.", () => {expect(reciprocalCycles(7)).toBe(7);});
//
// test("0.8 reciprocalCycles(8) should return 0.", () => {expect(reciprocalCycles(8)).toBe(7);});
//
// test("0.9 reciprocalCycles(9) should return 1.", () => {expect(reciprocalCycles(9)).toBe(7);});
//
// test("0.10 reciprocalCycles(10) should return 0.", () => {expect(reciprocalCycles(10)).toBe(7);});

test("1 reciprocalCycles(700) should return 659.", () => {
  expect(reciprocalCycles(700)).toBe(659);
});

test("2 reciprocalCycles(800) should return 743.", () => {
  expect(reciprocalCycles(800)).toBe(743);
});

test("3 reciprocalCycles(900) should return 887.", () => {
  expect(reciprocalCycles(900)).toBe(887);
});

test("4 reciprocalCycles(1000) should return 983.", () => {
  expect(reciprocalCycles(1000)).toBe(983);
});
