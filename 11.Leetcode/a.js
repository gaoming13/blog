var kidsWithCandies = function(candies, extraCandies) {
  // 2,3,5,1,3 1
  let max = 0;
  for (const v of candies) {
    max = Math.max(max, v);
  }
  let diff = max - extraCandies;
  for (let i = 0; i < candies.length; i++) {
    candies[i] = candies[i] >= diff;
  }
  return candies;
};
console.log(kidsWithCandies([12,1,12], 10));