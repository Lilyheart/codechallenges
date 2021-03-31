/* global module, Set */
/* eslint-disable no-magic-numbers, func-style*/

/**
 * @param {number[][]} envelopes e.g. maxEnvelopes([[9,5],[8,4],[6,7],[6,8],[3,5],[1,3]]) = [6,8],[3,5],[1,3]
 * @return {number}
 */

var maxEnvelopes = function(envelopes) {
  let lis,
      W = 0, //eslint-disable-line id-length
      H = 1; //eslint-disable-line id-length

  //Sort envelopes from smallest[0] and biggest[1]
  envelopes.sort(function(first, second) {
    if (first[W] > second[W]) {
      return 1;
    } else if (first[W] === second[W] && first[H] < second[H]) {
      return 1;
    } else {
      return -1;
    }
  });

  //Long Increasing Subsequence, LIS
  lis = new Array(envelopes.length).fill(1);
  for (let i = 1; i < envelopes.length; i++) {//eslint-disable-line no-plusplus
    for (let j = 0; j < i; j++) {//eslint-disable-line no-plusplus, id-length
      if (envelopes[i][H] > envelopes[j][H]) {
        lis[i] = Math.max(lis[i], lis[j] + 1);
      }
    }
  }

  return lis.reduce(function(first, second) {return Math.max(first, second);});
};

module.exports = maxEnvelopes;
