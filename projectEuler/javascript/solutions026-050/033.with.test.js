/* global module, test, expect */
/* eslint no-plusplus: ["error", { "allowForLoopAfterthoughts": true }] */
/* eslint-disable no-magic-numbers, id-length, no-ternary*/

// The fraction 49/98 is a curious fraction, as an inexperienced mathematician in attempting to simplify it may incorrectly believe that 49/98 = 4/8, which is correct, is obtained by cancelling the 9s.

// We shall consider fractions like, 30/50 = 3/5, to be trivial examples.

// There are exactly four non-trivial examples of this type of fraction, less than one in value, and containing two digits in the numerator and denominator.

// If the product of these four fractions is given in its lowest common terms, find the value of the denominator.

function digitCancellingFractions() {
  let highest,
      result = {numr: 1, demr: 1};

  for (let numr = 1; numr < 100; numr++) {
    for (let denr = numr + 1; denr < 100; denr++) {
      let strNumr = ("" + numr).split(""),
          strDemr = ("" + denr).split("");

      strNumr.forEach((topDigit, topIndex) => {
        strDemr.forEach((bottomDigit, bottomIndex) => {
          if (topDigit === bottomDigit && topDigit !== "0") {
            strNumr.splice(topIndex, 1);
            strDemr.splice(bottomIndex, 1);

            if (numr / denr === strNumr[0] / strDemr) {
              result.numr *= strNumr[0];
              result.demr *= strDemr[0];
            }
          }
        });
      });

    }
  }

  highest = result.demr;
  for (let i = 2; i < highest; i++) {
    let repeat = true;

    while (repeat) {
      if (result.numr % i === 0 && result.demr % i === 0) {
        result.numr /= i;
        result.demr /= i;
      } else {
        repeat = false;
      }
    }
  }

  return result.demr;
}

test("1 digitCancellingFractions() should return 100.", () => {
  expect(digitCancellingFractions()).toBe(100);
});
