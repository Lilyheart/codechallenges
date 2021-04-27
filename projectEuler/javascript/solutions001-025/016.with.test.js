/* global module, test, expect, BigInt */
/* eslint no-plusplus: ["error", { "allowForLoopAfterthoughts": true }] */
/* eslint-disable no-magic-numbers, id-length, no-ternary*/

// 2^{15} = 32768 and the sum of its digits is 3 + 2 + 7 + 6 + 8 = 26.

// What is the sum of the digits of the number 2^{1000}?

function powerDigitSum(exponent) {
  let power, pwrStrArr,
      sum = 0;

  power = BigInt(Math.pow(2, exponent));
  pwrStrArr = power.toString().split("");

  pwrStrArr.forEach((pwr) => {
    sum += Number(pwr);
  });


  return sum;
}

test("1 powerDigitSum(15) should return 26.", () => {
  expect(powerDigitSum(15)).toBe(26);
});

test("2 powerDigitSum(128) should return 166.", () => {
  expect(powerDigitSum(128)).toBe(166);
});

test("3 powerDigitSum(1000) should return 1366.", () => {
  expect(powerDigitSum(1000)).toBe(1366);
});
