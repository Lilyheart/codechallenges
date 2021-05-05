/* global module, test, expect */
/* eslint no-plusplus: ["error", { "allowForLoopAfterthoughts": true }] */
/* eslint-disable no-magic-numbers, id-length, no-ternary*/

// You are given the following information, but you may prefer to do some research for yourself.

// 1 Jan 1900 was a Monday.
// Thirty days has September,
// April, June and November.
// All the rest have thirty-one,
// Saving February alone,
// Which has twenty-eight, rain or shine.
// And on leap years, twenty-nine.
// A leap year occurs on any year evenly divisible by 4, but not on a century unless it is divisible by 400.

// How many Sundays fell on the first of the month during the twentieth century (1 Jan 1901 to 31 Dec 2000)?

function zellers(d, m, y) {
  let h, f1, f2, f3, k, j,
      mArr = [-1, 13, 14, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

  y -= m <= 2 ? 1 : 0; //eslint-disable-line no-param-reassign
  k = y % 100; //eslint-disable-line no-param-reassign
  j = Math.floor(y / 100); //eslint-disable-line no-param-reassign

  f1 = Math.floor((13 * (mArr[m] + 1)) / (5));
  f2 = Math.floor(k / 4);
  f3 = Math.floor(j / 4);

  h = (d + f1 + k + f2 + f3 - (2 * j)) % 7;

  h += h < 0 ? 7 : 0;

  return h;
}

function countingSundays(firstYear, lastYear) {
  let sundays = 0,
      SUNDAY = 1;

  for (let y = firstYear; y <= lastYear; y++) {
    for (let m = 1; m <= 12; m++) {
      sundays += zellers(1, m, y) === SUNDAY ? 1 : 0;
    }
  }

  return sundays;
}

test("1 countingSundays(1943, 1946) should return 6.", () => {
  expect(countingSundays(1943, 1946)).toBe(6);
});

test("2 countingSundays(1995, 2000) should return 10.", () => {
  expect(countingSundays(1995, 2000)).toBe(10);
});

test("3 countingSundays(1901, 2000) should return 171.", () => {
  expect(countingSundays(1901, 2000)).toBe(171);
});
