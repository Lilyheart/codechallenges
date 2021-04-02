/* global test, expect */
/* eslint-disable func-style, no-ternary, no-magic-numbers, no-plusplus*/

/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */

/**
 * @param {ListNode} head
 * @return {boolean}
 */

var isPalindrome = function(head) {
  let nodeEval = head,
      strFWD = nodeEval.val.toString(),
      strBAC = strFWD;

  while (nodeEval.next !== null) {
    strFWD += nodeEval.next.val.toString();
    strBAC = nodeEval.next.val.toString() + strBAC;
    nodeEval = nodeEval.next;
  }

  return strFWD === strBAC;
};

function ListNode(val, next) {
  this.val = (typeof val === "undefined" ? 0 : val);
  this.next = (typeof next === "undefined" ? null : next);
}

function singleLL(nodeVals) {
  let nextNode, newNode;

  for (let i = (nodeVals.length - 1); i >= 0; i--) {
    newNode = new ListNode(nodeVals[i], nextNode);
    nextNode = newNode;
  }

  return nextNode;
}

test("Pal Example Perf", () => {
  for (let i = 0; i < 4000; i++) {
    expect(isPalindrome(singleLL([1, 2, 2, 1]))).toBe(true);
  }
});

test("Pal Example 1", () => {
  expect(isPalindrome(singleLL([1, 2, 2, 1]))).toBe(true);
});

test("Pal Example 2", () => {
  expect(isPalindrome(singleLL([1, 2]))).toBe(false);
});

test("Pal Example 3", () => {
  expect(isPalindrome(singleLL([1]))).toBe(true);
});

// Runtime: 316 ms
// Memory Usage: 67.2 MB
