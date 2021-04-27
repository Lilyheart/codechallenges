/* global module, test, expect */
/* eslint no-plusplus: ["error", { "allowForLoopAfterthoughts": true }] */
/* eslint-disable no-magic-numbers, id-length, no-ternary*/

// If the numbers 1 to 5 are written out in words: one, two, three, four, five, then there are 3 + 3 + 5 + 4 + 4 = 19 letters used in total.

// If all the numbers from 1 to 1000 (one thousand) inclusive were written out in words, how many letters would be used?

// NOTE: Do not count spaces or hyphens. For example, 342 (three hundred and forty-two) contains 23 letters and 115 (one hundred and fifteen) contains 20 letters. The use of "and" when writing out numbers is in compliance with British usage.

var lowest = {
      1: "one".length,
      2: "two".length,
      3: "three".length,
      4: "four".length,
      5: "five".length,
      6: "six".length,
      7: "seven".length,
      8: "eight".length,
      9: "nine".length,
      10: "ten".length,
      11: "eleven".length,
      12: "twelve".length,
      13: "thirteen".length,
      14: "fourteen".length,
      15: "fifteen".length,
      16: "sixteen".length,
      17: "seventeen".length,
      18: "eighteen".length,
      19: "nineteen".length},
    tens = {
      2: "twenty".length,
      3: "thirty".length,
      4: "forty".length,
      5: "fifty".length,
      6: "sixty".length,
      7: "seventy".length,
      8: "eighty".length,
      9: "ninety".length},
    hundreds = {
      0: 0,
      1: "onehundred".length,
      2: "twohundred".length,
      3: "threehundred".length,
      4: "fourhundred".length,
      5: "fivehundred".length,
      6: "sixhundred".length,
      7: "sevenhundred".length,
      8: "eighthundred".length,
      9: "ninehundred".length},
    thousands = {
      1: "onethousand".length};

function numberLetterCounts(limit) {
  let sums = 0;

  for (let i = 1; i <= limit; i++) {
    let currEval = i,
        sum = 0;

    while (currEval > 0) {
      if (currEval >= 1000) { // four digits
        let firstdigit = Number(currEval.toString().substring(0, 1));

        sum += thousands[firstdigit];
        currEval -= (firstdigit * 1000);

      } else if (currEval >= 100) { // three digits
        let firstdigit = Number(currEval.toString().substring(0, 1));

        sum += hundreds[firstdigit];
        currEval -= (firstdigit * 100);

        if (currEval > 0) {
          sum += "and".length;
        }

      } else if (currEval >= 20) { // two digits 20 or higher
        let firstdigit = Number(currEval.toString().substring(0, 1));

        sum += tens[firstdigit];
        currEval -= (firstdigit * 10);

      } else if (currEval < 20) { // two digits 20 or higher

        sum += lowest[currEval];
        currEval -= currEval;

      } else {
        return "Broken on " + i;
      }
    }

    sums += sum;
  }

  return sums;
}


test("1 numberLetterCounts(5) should return 19.", () => {
  expect(numberLetterCounts(5)).toBe(19);
});

test("2 numberLetterCounts(150) should return 1903.", () => {
  expect(numberLetterCounts(150)).toBe(1903);
});

test("3 numberLetterCounts(1000) should return 21124.", () => {
  expect(numberLetterCounts(1000)).toBe(21124);
});
