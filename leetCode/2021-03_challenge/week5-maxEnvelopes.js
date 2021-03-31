/* global module, Set */
/* eslint-disable no-magic-numbers, func-style, no-ternary, no-plusplus*/

/**
 * @param {number[][]} envelopes e.g. maxEnvelopes([[9,5],[8,4],[6,7],[6,8],[3,5],[1,3]]) = [6,8],[3,5],[1,3]
 * @return {number}
 */

var maxEnvelopes = function(envelopes) {
  let lis, max;

  //Sort envelopes from smallest[0] and biggest[1]
  envelopes.sort(function(first, second) {
    return first[0] === second[0] ? second[1] - first[1] : first[0] - second[0];
  });

  //Long Increasing Subsequence, LIS
  lis = new Array(envelopes.length).fill(1);
  max = 1;
  for (let i = 1; i < envelopes.length; i++) {
    for (let j = 0; j < i; j++) {
      if (envelopes[i][1] > envelopes[j][1]) {
        lis[i] = lis[i] > lis[j] + 1 ? lis[i] : lis[j] + 1;
        max = max > lis[i] ? max : lis[i];
      }
    }
  }

  // return lis.reduce(function(first, second) {return Math.max(first, second);});
  return max;
};

module.exports = maxEnvelopes;
