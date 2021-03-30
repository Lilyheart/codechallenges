/* global module */
/* eslint-disable no-magic-numbers, func-style*/

/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */

function flipMatchVoyage(root, voyage) {
  var queue = [],
      result = [];

  queue.push(root);

  while (queue.length > 0) {
    let targetVal, parent;

    // Take first item from queue
    parent = queue.shift();

    // If parent is null, exit while loop, otherwise get target value
    if (parent === null) {
      continue;
    }

    // If parent doesn't match target
    if (parent.val !== voyage.shift()) {
      result = [-1];
      break;
    }

    if (parent.left !== null && parent.left.val === voyage[0]) {
      // left matches
      queue.unshift(parent.right);
      queue.unshift(parent.left);
    } else if (parent.right !== null && parent.right.val === voyage[0]) {
      // right matches
      queue.unshift(parent.left);
      queue.unshift(parent.right);
      //add flip if left is empty
      if (parent.left !== null) {
        result.push(parent.val);
      }
    } else if (parent.left !== null || parent.right !== null) {
      result = [-1];
      break;
    }
  }

  return result;
}

module.exports = flipMatchVoyage;
