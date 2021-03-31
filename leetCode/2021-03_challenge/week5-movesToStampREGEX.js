/* global module, Set */
/* eslint-disable no-magic-numbers, func-style, no-ternary, no-plusplus, no-param-reassign*/

/**
 * @param {string} stamp
 * @param {string} target
 * @return {number[]}
 */

var movesToStamp = function(stamp, target) {
  let pattern = "",
      result = [];

  // Build pattern
  (stamp.split("")).forEach((letter) => {pattern += "[" + letter + "|?]";});
  pattern = "(?=" + pattern + ")";
  pattern = new RegExp(pattern, "g");

  while (target.split("?").length - 1 !== target.length) {
    let hasMatch = false;

    for (const match of target.matchAll(pattern)) {
      let matchString = target.substring(match.index, (match.index + stamp.length));

      if (matchString.split("?").length - 1 === matchString.length) {
        continue;
      } else {
        hasMatch = true;

        // Add index of find to result at the beginning
        result.unshift(match.index);

        // Update target string
        target = target.replace(matchString, "?".repeat(stamp.length));
        break;
      }
    }

    if (!hasMatch) {return [];}
  }

  return result;
};

module.exports = movesToStamp;
