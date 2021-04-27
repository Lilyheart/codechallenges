/* global module, test, expect */
/* eslint no-plusplus: ["error", { "allowForLoopAfterthoughts": true }] */
/* eslint-disable no-magic-numbers, id-length, no-ternary*/

// Starting in the top left corner of a 2×2 grid, and only being able to move to the right and down, there are exactly 6 routes to the bottom right corner.

// How many such routes are there through a 20×20 grid?

function latticePaths(gridSize) {
  let paths = [];

  for (let i = 0; i <= gridSize; i++) {
    paths.push(Array(gridSize + 1).fill(1));
  }

  for (let i = 1; i < paths.length; i++) {
    for (let j = 1; j < paths.length; j++) {
      paths[i][j] = paths[i][j - 1] + paths[i - 1][j];
    }
  }

  return paths[gridSize][gridSize];
}

test("0 latticePaths(1) should return 2.", () => {
  expect(latticePaths(2)).toBe(6);
});

test("1 latticePaths(4) should return 70.", () => {
  expect(latticePaths(4)).toBe(70);
});

test("2 latticePaths(9) should return 48620.", () => {
  expect(latticePaths(9)).toBe(48620);
});

test("3 latticePaths(20) should return 137846528820.", () => {
  expect(latticePaths(20)).toBe(137846528820);
});
