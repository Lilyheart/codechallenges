/* global require, test, expect, multiplesOf3and5 */
/* eslint-disable no-magic-numbers, comma-spacing*/

const flipMatchVoyage = require("./week5-flipMatchVoyage");


function TreeNode(val) {
  this.val = val;
  this.left = this.right = null;
}

function deserialize(values) {
  let root, queue;

  if (values.legnth === 0) {
    return null;
  }

  root = new TreeNode(parseInt(values[0], 10));
  queue = [root];
  for (let i = 1; i < values.length; i++) { //eslint-disable-line no-plusplus
    let parent = queue.shift();

    if (values[i] !== null) {
      let left = new TreeNode(parseInt(values[i], 10));

      parent.left = left;
      queue.push(left);
    }
    if (values[++i] !== null && i !== values.length) { //eslint-disable-line no-plusplus
      let right = new TreeNode(parseInt(values[i], 10));

      parent.right = right;
      queue.push(right);
    }
  }

  return root;
}

test("Example 1", () => {
  expect(flipMatchVoyage(deserialize([1,2]), [2,1])).toStrictEqual([-1]);
});

test("Example 2", () => {
  expect(flipMatchVoyage(deserialize([1,2,3]), [1,3,2])).toStrictEqual([1]);
});

test("Example 3", () => {
  expect(flipMatchVoyage(deserialize([1,2,3]), [1,2,3])).toStrictEqual([]);
});

test("Example 4", () => {
  expect(flipMatchVoyage(deserialize([1,9,2,13,10,3,6,14,15,11,12,5,4,8,7]), [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15])).toStrictEqual([1,3,6,9]);
});

test("Example 5", () => {
  expect(flipMatchVoyage(deserialize([null]), [1])).toStrictEqual([-1]);
});

test("Example 6", () => {
  expect(flipMatchVoyage(deserialize([1, null, 2]), [1, 2])).toStrictEqual([]);
});

test("Example 7", () => {
  expect(flipMatchVoyage(deserialize([1,2,null,3]), [1, 3, 2])).toStrictEqual([-1]);
});

test("Example 8", () => {
  expect(flipMatchVoyage(deserialize([1,2,8,3,null, null,9,4,5,10,null, null,12,7,6,null,11]), [1,8,9,10,11,2,3,4,12,5,6,7])).toStrictEqual([1,5]);
});

test("Example 9", () => {
  expect(flipMatchVoyage(deserialize([8,9,4,12,46,7,14,48,29,6,37,10,null,null,15,26,3,50,42,45,null,17,40,null,null,18,null,null,25,11,31,41,null,null,null,1,null,null,null,22,19,null,null,null,null,13,null,null,null,null,34,null,null,27,null,23,null,28,38,null,null,33,null,16,20,null,null,43,null,44,35,5,49,21,36,24,null,2,47,null,null,null,null,null,39,null,null,null,null,null,null,null,32,null,30]), [8,9,12,29,42,50,41,34,48,26,25,49,31,11,13,38,43,24,28,46,6,45,1,37,40,22,27,33,44,47,30,2,32,35,19,23,16,5,3,39,20,36,21,17,4,14,15,18,7,10])).toStrictEqual([-1]);
});
