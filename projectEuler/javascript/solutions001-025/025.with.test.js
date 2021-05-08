/* global module, test, expect, BigInt, setTimeout */
/* eslint no-plusplus: ["error", { "allowForLoopAfterthoughts": true }] */
/* eslint-disable no-magic-numbers, id-length, no-ternary*/

// The Fibonacci sequence is defined by the recurrence relation:

// Fn = Fn−1 + Fn−2, where F1 = 1 and F2 = 1.
// Hence the first 12 terms will be:

// F1 = 1, F2 = 1, F3 = 2, F4 = 3, F5 = 5, F6 = 8, F7 = 13, F8 = 21, F9 = 34, F10 = 55, F11 = 89, F12 = 144, The 12th term, F12, is the first term to contain three digits.

// What is the index of the first term in the Fibonacci sequence to contain 1000 digits?

// precondition :: arr1.length >= arr2.length
function addIntArrays(arr1, arr2) {
  let hasCarryover = false,
      resultArr = [],
      arr1Length = arr1.length;

  for (let i = 0; i < arr1Length; i++) {
    let newterm,
        term1 = arr1.pop(),
        term2 = arr2.pop();

    // if carryover from previous
    if (hasCarryover) {
      term1 += 1;
      hasCarryover = false;
    }

    // if term2 is undefined
    if (typeof term2 === "undefined") {term2 = 0;}

    newterm = term1 + term2;

    if (newterm >= 10) {
      newterm -= 10;
      hasCarryover = true;
    }

    resultArr.unshift(newterm);

    // if there is carryover on last digit
    if (i === arr1Length - 1 && hasCarryover) {resultArr.unshift(1);}
  }

  return resultArr;
}

function digitFibonacci(n) {
  var fibTerm = 1,
      fibCurr = [1],
      fibPrev = [0];


  while (fibCurr.length < n) {
    let fibNew = addIntArrays([...fibCurr], [...fibPrev]);

    fibPrev = [...fibCurr];
    fibCurr = [...fibNew];
    fibTerm += 1;
  }

  return fibTerm;
}

test("0 digitFibonacci(5) should return 21.", () => {
  expect(digitFibonacci(3)).toBe(12);
});

test("1 digitFibonacci(5) should return 21.", () => {
  expect(digitFibonacci(5)).toBe(21);
});

test("2 digitFibonacci(10) should return 45.", () => {
  expect(digitFibonacci(10)).toBe(45);
});
//
test("3 digitFibonacci(15) should return 69.", () => {
  expect(digitFibonacci(15)).toBe(69);
});

test("4 digitFibonacci(20) should return 93.", () => {
  expect(digitFibonacci(20)).toBe(93);
});

test("5 digitFibonacci(1000) should return 93.", () => {
  expect(digitFibonacci(1000)).toBe(4782);
});

test("1 addIntArrays([1], [1]) should return [2].", () => {
  expect(addIntArrays([1], [1])).toStrictEqual([2]);
});

test("2 addIntArrays([1, 0], [1]) should return [1, 1].", () => {
  expect(addIntArrays([1, 0], [1])).toStrictEqual([1, 1]);
});

test("3 addIntArrays([9], [1]) should return [2].", () => {
  expect(addIntArrays([9], [1])).toStrictEqual([1, 0]);
});

test("4 addIntArrays([4, 7, 9, 8, 3], [9, 7, 8]) should return [4, 8, 9, 6, 1].", () => {
  expect(addIntArrays([4, 7, 9, 8, 3], [9, 7, 8])).toStrictEqual([4, 8, 9, 6, 1]);
});

// =========================================================
// Attempt one at 1000 digit fib in javascript:

// function digitFibonacci(n) {
//   let fibTerm = BigInt(1),
//       fibCurr = BigInt(1),
//       fibPrev = BigInt(0);
//
//   while (fibCurr.toString().length < n) {
//     let fibNew = fibCurr + fibPrev;
//
//     console.log((fibCurr.toString().length));
//
//     fibPrev = fibCurr;
//     fibCurr = fibNew;
//     fibTerm += BigInt(1);
//   }
//
//   return fibTerm;
// }

// =========================================================
// Attempt two at 1000 digit fib in javascript:

// function binet(n) {
//   let term1, term2, term3;
//
//   term1 = 1 / Math.sqrt(5);
//   term2 = (1 + Math.sqrt(5)) / (2);
//   term3 = (1 - Math.sqrt(5)) / (2);
//
//   return Math.round(term1 * ((Math.pow(term2, n)) - (Math.pow(term3, n))));
// }
