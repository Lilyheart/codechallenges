/* global module, test, expect */
/* eslint no-plusplus: ["error", { "allowForLoopAfterthoughts": true }] */
/* eslint-disable no-magic-numbers, id-length, no-ternary*/

// A Pythagorean triplet is a set of three natural numbers, a < b < c, for which,

// a2 + b2 = c2
// For example, 3^2 + 4^2 = 9 + 16 = 25 = 5^2.

// There exists exactly one Pythagorean triplet for which a + b + c = 1000.
// Find the product abc.


function specialPythagoreanTriplet(n) {
  for (let a = 1; a <= n; a++) {
    for (let b = a + 1; b <= n; b++) {
      if (Math.sqrt((a * a) + (b * b)) % 1 === 0) {
        let c = Math.sqrt((a * a) + (b * b));

        if ((a + b + c) === n) {
          return a * b * c;
        }
      }
    }
  }

 return false;
}

test("0 specialPythagoreanTriplet(12) should return 60.", () => {
  expect(specialPythagoreanTriplet(12)).toBe(60);
});

test("1 specialPythagoreanTriplet(24) should return 480.", () => {
  expect(specialPythagoreanTriplet(24)).toBe(480);
});

test("2 specialPythagoreanTriplet(120) should return 49920, 55080 or 60000.", () => {
  expect(specialPythagoreanTriplet(120)).toBe(49920);
});

test("3 specialPythagoreanTriplet(1000) should return 31875000.", () => {
  expect(specialPythagoreanTriplet(1000)).toBe(31875000);
});
