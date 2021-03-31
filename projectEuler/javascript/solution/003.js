/* global module */
/* eslint-disable no-magic-numbers*/
// The prime factors of 13195 are 5, 7, 13 and 29.

// What is the largest prime factor of the number 600851475143 ?

function largestPrimeFactor(number) {
  let maxPrime, possMaxFactor,
      newNum = number;

  // handle quick early cases that don't need factoring
  if (number <= 3) {
    return number;
  }

  // eliminate all the even factors as they arn't odd (now that 2 is removed)
  while (newNum % 2 === 0) {
    newNum /= 2;
    // if it reduces down to 1 then it was a power of 2
    if (newNum === 1) {return 2;}
  }

  possMaxFactor = Math.ceil(Math.sqrt(newNum));

  // Remove other factors
  // For each odd value upto the sqrt of the new number
  for (let i = 3; i < possMaxFactor; i += 2) {
    // eliminate all those factors as
    while (newNum % i === 0) {
      maxPrime = i;
      newNum /= i;
    }
  }

  // if the new number was the prime and wasn't factored any more
  if (newNum > possMaxFactor) {
    maxPrime = newNum;
  }

  return maxPrime;
}

module.exports = largestPrimeFactor;
