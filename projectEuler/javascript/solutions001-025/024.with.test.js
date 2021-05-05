/* global module, test, expect */
/* eslint no-plusplus: ["error", { "allowForLoopAfterthoughts": true }] */
/* eslint-disable no-magic-numbers, id-length, no-ternary*/

// A permutation is an ordered arrangement of objects. For example, 3124 is one possible permutation of the digits 1, 2, 3 and 4. If all of the permutations are listed numerically or alphabetically, we call it lexicographic order. The lexicographic permutations of 0, 1 and 2 are:

// 012   021   102   120   201   210

// What is the millionth lexicographic permutation of the digits 0, 1, 2, 3, 4, 5, 6, 7, 8 and 9?

function factorial(n) {
  let fact = 1;

  for (let i = 2; i <= n; i++) {
    fact *= i;
  }

  return fact;
}

function lexicographicPermutations(n) {
  let space,
      digits = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
      targetIndex = n,
      result = "";

  // Find first digit
  for (let i = 0; i < 10; i++) {
    let segments, segment, index;

    space = factorial(digits.length);
    segments = space / digits.length;
    segment = Math.floor(targetIndex / segments);

    result += digits[segment];

    digits.splice(segment, 1);
    targetIndex -= segment * segments;
  }

  return Number(result);
}

test("1 lexicographicPermutations(699999) should return 1938246570.", () => {
  expect(lexicographicPermutations(699999)).toBe(1938246570);
});

test("2 lexicographicPermutations(899999) should return 2536987410.", () => {
  expect(lexicographicPermutations(899999)).toBe(2536987410);
});

test("3 lexicographicPermutations(900000) should return 2537014689.", () => {
  expect(lexicographicPermutations(900000)).toBe(2537014689);
});

test("4 lexicographicPermutations(999999) should return 2783915460.", () => {
  expect(lexicographicPermutations(999999)).toBe(2783915460);
});
