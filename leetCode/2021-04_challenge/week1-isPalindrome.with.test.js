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
      strFWD = [];

  while (nodeEval !== null) {
    strFWD.push(nodeEval.val);
    nodeEval = nodeEval.next;
  }

  for (let i = 0; i < strFWD.length; i++) {
    if (strFWD[i] !== strFWD[strFWD.length - i - 1]) {
      return false;
    }
  }

  return true;
};

function isPalindromePoorPerf(head) {
  let nodeEval = head,
      strFWD = nodeEval.val.toString(),
      strBAC = strFWD;

  while (nodeEval.next !== null) {
    strFWD += nodeEval.next.val.toString();
    strBAC = nodeEval.next.val.toString() + strBAC;
    nodeEval = nodeEval.next;
  }

  return strFWD === strBAC;
}

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

test("Pal Example 4", () => {
  expect(isPalindrome(singleLL([1, 2, 1]))).toBe(true);
});

test("Pal Example 5", () => {
  expect(isPalindrome(singleLL([1, 2, 3, 4]))).toBe(false);
});

// Runtime: 316 ms
// Memory Usage: 67.2 MB

// Runtime: 184 ms
// Memory Usage: 65.1 MB
