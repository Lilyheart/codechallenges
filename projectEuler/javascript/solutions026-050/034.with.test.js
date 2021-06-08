/* global module, test, expect */
/* eslint no-plusplus: ["error", { "allowForLoopAfterthoughts": true }] */
/* eslint-disable no-magic-numbers, id-length, no-ternary*/

// 145 is a curious number, as 1! + 4! + 5! = 1 + 24 + 120 = 145.

// Find the sum of all numbers which are equal to the sum of the factorial of their digits.

// Note: As 1! = 1 and 2! = 2 are not sums they are not included.

function findFactorialDigits() {
  let factorials = {0: 1},
      factorial = 1;

  for (let i = 1; i < 10; i++) {
    factorial *= i;

    factorials[i] = factorial;
  }

  return factorials;
}

function digitFactorial() {
  let factorials = findFactorialDigits(),
      numbers = [];

  for (let i = 10; i <= 99999; i++) {
    let digits = i.toString().split(""),
        sum = 0;

    digits.forEach((digit) => {
      sum += factorials[digit];
    });

    if (sum === i) {
      numbers.push(i);
    }

  }

  return {sum: numbers.reduce((a, c) => a + c, 0), numbers: numbers};
}


test("1 digitFactorial() should return {sum: 40730, numbers: [145, 40585]}.", () => {
  expect(digitFactorial()).toStrictEqual({sum: 40730, numbers: [145, 40585]});
});
