/* global require, test, expect, fiboEvenSum */
/* eslint-disable no-magic-numbers*/

const largestPrimeFactor = require("../solution/003");

test("1 largestPrimeFactor(2) should return 2.", () => {
  expect(largestPrimeFactor(2)).toBe(2);
});

test("2 largestPrimeFactor(3) should return 3.", () => {
  expect(largestPrimeFactor(3)).toBe(3);
});

test("3 largestPrimeFactor(5) should return 5.", () => {
  expect(largestPrimeFactor(5)).toBe(5);
});

test("4 largestPrimeFactor(7) should return 7.", () => {
  expect(largestPrimeFactor(7)).toBe(7);
});

test("5 largestPrimeFactor(8) should return 2.", () => {
  expect(largestPrimeFactor(8)).toBe(2);
});

test("6 largestPrimeFactor(13195) should return 29.", () => {
  expect(largestPrimeFactor(13195)).toBe(29);
});

test("7 largestPrimeFactor(600851475143) should return 6857.", () => {
  expect(largestPrimeFactor(600851475143)).toBe(6857);
});
