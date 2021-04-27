/* global module, test, expect */
/* eslint no-plusplus: ["error", { "allowForLoopAfterthoughts": true }] */
/* eslint-disable no-magic-numbers, id-length, no-ternary*/

// The following iterative sequence is defined for the set of positive integers:

// n → n/2 (n is even)
// n → 3n + 1 (n is odd)

// Using the rule above and starting with 13, we generate the following sequence:

// 13 → 40 → 20 → 10 → 5 → 16 → 8 → 4 → 2 → 1
// It can be seen that this sequence (starting at 13 and finishing at 1) contains 10 terms. Although it has not been proved yet (Collatz Problem), it is thought that all starting numbers finish at 1.

// Which starting number, under one million, produces the longest chain?

// NOTE: Once the chain starts the terms are allowed to go above one million.

var knownValues = {1: 1};

function sequencer(value) {
  let len;

  if (knownValues[value]) {
    return knownValues[value];
  }

  if (value % 2 === 0) {
    len = 1 + sequencer(value / 2);
  } else {
    len = 1 + sequencer((3 * value) + 1);
  }

  knownValues[value] = len;

  return len;
}

function longestCollatzSequence(limit) {
  let maxLength = 0,
      maxValue = 0;

  for (let i = Math.floor(limit / 2); i <= limit; i++) {
    let length = sequencer(i);

    if (length > maxLength) {
      maxLength = length;
      maxValue = i;
    }
  }

  return maxValue;
}

test("1 longestCollatzSequence(3) should return 3.", () => {
  expect(longestCollatzSequence(3)).toBe(3);
});

test("1 longestCollatzSequence(14) should return 9.", () => {
  expect(longestCollatzSequence(14)).toBe(9);
});

test("2 longestCollatzSequence(5847) should return 3711.", () => {
  expect(longestCollatzSequence(5847)).toBe(3711);
});

test("3 longestCollatzSequence(46500) should return 35655.", () => {
  expect(longestCollatzSequence(46500)).toBe(35655);
});

test("4 longestCollatzSequence(54512) should return 52527.", () => {
  expect(longestCollatzSequence(54512)).toBe(52527);
});

test("5 longestCollatzSequence(100000) should return 77031.", () => {
  expect(longestCollatzSequence(100000)).toBe(77031);
});

test("6 longestCollatzSequence(1000000) should return 837799.", () => {
  expect(longestCollatzSequence(1000000)).toBe(837799);
});
