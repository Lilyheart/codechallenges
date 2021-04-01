/* global module, test, expect */
/* eslint no-plusplus: ["error", { "allowForLoopAfterthoughts": true }] */
/* eslint-disable no-magic-numbers, id-length*/

// A palindromic number reads the same both ways. The largest palindrome made from the product of two 2-digit numbers is 9009 = 91 × 99.

// Find the largest palindrome made from the product of two 3-digit numbers.
function largestPalindromeProduct(number) {
  let maxProd = Number("9".repeat(number)),
      minProd = Number("1" + "0".repeat(number - 1)),
      currMax = 0;

  function isPalendrome(testNumber) {
    let testArr = testNumber.toString().split("");

    for (let i = 0; i < (testArr.length / 2); i++) {
      if (testArr[i] !== testArr[testArr.length - i - 1]) {return false;}
    }

    return true;
  }

  for (let i = maxProd; i >= minProd; i--) {
    for (let j = maxProd; j >= minProd; j--) {
      if (isPalendrome(i * j)) {
        currMax = Math.max(currMax, i * j);
      }
    }
  }

  return currMax;
}

test("1 largestPalindromeProduct(2) should return 9009", () => {
  expect(largestPalindromeProduct(2)).toBe(9009);
});

test("2 largestPalindromeProduct(3) should return 906609.", () => {
  expect(largestPalindromeProduct(3)).toBe(906609);
});
