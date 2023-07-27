// ignoring in loops
// finding subsets of a string using recursion and backtracking method (take it or leave it) method
function findSubSetsOfString(string) {
  let answer = [];
  let b = [];
  console.log(findSubset("", string));

  function findSubset(processed, unprocessed) {
    // take it or leave it
    let b = [];
    // base case
    if (unprocessed.length === 0) {
       if (processed.length == 0) {
        return b;
        }
        answer.push(processed);
        b.push(processed);
        console.log();
        return b;
      
    }

    //take it

    let processed1 = processed + unprocessed[0];

    let ans1 = findSubset(processed1, unprocessed.slice(1));

    // leave it

    let ans2 = findSubset(processed, unprocessed.slice(1));

    let merged = ans1.concat(ans2);
    return merged;
    
  }
  return answer;
}


function asciiValue(string) {
    let sum = 0;
    for (let i = 0; i < string.length; i++) {
        sum += string.charCodeAt(i);
    }
    return sum;
}

let ans = findSubSetsOfString("aab");
console.log(ans, ans.length);
