/* global module, test, expect */
/* eslint no-plusplus: ["error", { "allowForLoopAfterthoughts": true }] */
/* eslint-disable no-magic-numbers, id-length, no-ternary, no-plusplus*/

// In the United Kingdom the currency is made up of pound (£) and pence (p). There are eight coins in general circulation:

// 1p, 2p, 5p, 10p, 20p, 50p, £1 (100p), and £2 (200p).
// It is possible to make £2 in the following way:

// 1×£1 + 1×50p + 2×20p + 1×5p + 1×2p + 3×1p
// How many different ways can £2 be made using any number of coins?

var validCount,
    coins = [200, 100, 50, 20, 10, 5, 2, 1];

function recurCoinSum(goal, accumulator, lastCoin) {
  let validCoins;

  if (lastCoin === 0) {
    lastCoin = Math.max(goal, coins[0]); //eslint-disable-line
  }

  validCoins = coins.filter(coin => (coin <= (goal - accumulator) && coin <= lastCoin));


  validCoins.forEach((coin) => {
    let newAcc = accumulator + coin;

    if (newAcc === goal) {
      validCount++;

      return;
    } else {
      recurCoinSum(goal, newAcc, coin);
    }
  });

}

function coinSums(n) {
  validCount = 0;

  recurCoinSum(n, 0, 0);

  return validCount;
}

test("0a coinSums(5) should return 4.", () => {
  expect(coinSums(5)).toBe(4);
});

test("0b coinSums(10) should return 11.", () => {
  expect(coinSums(10)).toBe(11);
});

test("1 coinSums(50) should return 451.", () => {
  expect(coinSums(50)).toBe(451);
});

test("2 coinSums(100) should return 4563.", () => {
  expect(coinSums(100)).toBe(4563);
});

test("3 coinSums(150) should return 21873.", () => {
  expect(coinSums(150)).toBe(21873);
});

test("4 coinSums(200) should return 73682.", () => {
  expect(coinSums(200)).toBe(73682);
});
