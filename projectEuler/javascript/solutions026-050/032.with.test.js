/* global module, test, expect */
/* eslint no-plusplus: ["error", { "allowForLoopAfterthoughts": true }] */
/* eslint-disable no-magic-numbers, id-length, no-ternary*/

// We shall say that an n-digit number is pandigital if it makes use of all the digits 1 to n exactly once; for example, the 5-digit number, 15234, is 1 through 5 pandigital.

// The product 7254 is unusual, as the identity, 39 × 186 = 7254, containing multiplicand, multiplier, and product is 1 through 9 pandigital.

// Find the sum of all products whose multiplicand/multiplier/product identity can be written as a 1 through 9 pandigital.

// HINT: Some products can be obtained in more than one way so be sure to only include it once in your sum.

var permutations;

function panPermute(unused, used) {
  if (unused.length === 0) {
    permutations.push(used);
  } else {
    unused.forEach((digit, i) => {
      let newUsed = used + digit;

      panPermute(unused.filter(d => d !== digit), newUsed);
    });
  }
}

function pandigitalProducts(n) {
  let digits,
      panProducts = [];

  digits = [...Array(n + 1).keys()];
  digits.shift(); // remove the zero

  permutations = [];

  panPermute(digits, "");

  permutations.forEach((permutation) => {
    for (let i = 2; i < permutation.length; i++) {
      let lhs = permutation.slice(0, i),
          rhs = permutation.slice(i);

      for (let j = 1; j < lhs.length; j++) {
        let multiplicand = lhs.slice(0, j),
            multiplier = lhs.slice(j);

        if (Number(multiplicand) * Number(multiplier) === Number(rhs)) {
          panProducts.push(Number(rhs));
        }

      }
    }
  });

  return panProducts.filter((p, i, a) => a.indexOf(p) === i).reduce((a, c) => a + c, 0);
}

test("1 pandigitalProducts(4) should return 12.", () => {
  expect(pandigitalProducts(4)).toBe(12);
});

test("2 pandigitalProducts(6) should return 162.", () => {
  expect(pandigitalProducts(6)).toBe(162);
});

test("3 pandigitalProducts(7) should return 0.", () => {
  expect(pandigitalProducts(7)).toBe(0);
});

test("4 pandigitalProducts(8) should return 13458.", () => {
  expect(pandigitalProducts(8)).toBe(13458);
});

test("5 pandigitalProducts(9) should return 45228.", () => {
  expect(pandigitalProducts(9)).toBe(45228);
});
