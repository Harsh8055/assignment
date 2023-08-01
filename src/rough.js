var solveNQueens = function (n) {
  // create a board
  let board = new Array(n).fill(".".repeat(n)); // Create a board with "...." for each row
  console.log(board);
  let ans = [];
  nqueen([...board], 0, n); // Pass a copy of the board to the nqueen function

  console.log("ans", ans);

  function nqueen(board, r, queens) {
    if (queens == 0 && r == board.length) {
      let copy = [...board];
      ans.push(copy);

      return;
    }

    if (r == board.length) {
      return;
    }
    // let newBoard = board;

    for (let c = 0; c < board.length; c++) {
        console.log("isSafe? ", board, r, c, isSafe(board, r, c))
      if (isSafe(board, r, c)) {
        // place the qeen
        board = placeQueen(board, r, c);
        console.log("placed", board, r, c);

        nqueen(board, r + 1, queens - 1);

        board = removeQueen(board, r, c);
      }
    }

    return;
  }

  function isSafe(board, r, c) {
    // Check vertical row
 

    for (let i = 0; i < r; i++) {
      if (board[i][c] == "Q") {
        return false;
      }
    }

    // Check diagonal right row
    let maxRight = Math.min(r, board.length - c - 1);
    let maxleft = Math.min(r, c);

    for (let i = 0; i <= maxRight; i++) {
      if (board[r - i][c + i] == "Q") {
        return false;
      }
    }

    for (let i = 0; i <= maxleft; i++) {
      if (board[r - i][c - i] == "Q") {
        return false;
      }
    }
    return true;
  }

  function placeQueen(board, r, c) {
    board[r] = board[r].slice(0, c) + "Q" + board[r].slice(c + 1);
    return board;
  }
  function removeQueen(board, r, c) {
    board[r] = board[r].slice(0, c) + "." + board[r].slice(c + 1);
    return board;
  }
};

solveNQueens(4);

// var combinationSum2 = function(candidates, target) {

//     let candidate = sortArray(candidates)
//     let finalAns = []
//     let ans = findSum(candidate, target , [], finalAns);

//     console.log("n", finalAns)
//     return finalAns

//  };

//  function sortArray(candidates) {
//     candidates.sort(function(a, b){return a-b}); // sorts the array in ascending order
//     return candidates;
//  }

//  function findSum(candidates, target, ans, finalAns) {

//      if ( target == 0  ) {
//         let bool = isAnsInFinalAns(finalAns, ans) || ans.length == 0
//         if(bool) {
//             console.log("includes")
//             return finalAns
//         }
//         console.log("pushing", ans, bool )
//         finalAns.push(ans)
//         return finalAns
//      }

//   if (candidates.length === 0 || target < candidates[0]) {
//     return;
//   }

//      for (i = 0; i < candidates.length; i++) {
//         findSum(candidates.slice(i+1), target - candidates[i], ans.concat(candidates[i]), finalAns)
//      }

//  }

//  function isAnsInFinalAns(finalAns, ans) {
//     return finalAns.some(subArray => JSON.stringify(subArray) === JSON.stringify(ans));
//   }
//  combinationSum2([2,5,2,1,2], 5)

// function combinationSum(candidates, target) {
//     let finalAns = [];
//     findSum(candidates, target, [], finalAns);
//     return finalAns;
//   }

//   function findSum(candidates, target, ans, finalAns) {

//     if (target === 0) {
//       // If the target is reached (sum is 0), add the current combination to the final answer
//       if(isInArray(finalAns, ans) || ans.length == 0) {
//         return finalAns;
//       }
//       console.log("ans", ans)
//       finalAns.push([...ans]);
//       return finalAns;
//     }

//     if (candidates.length === 0 || target < candidates[0] || target < 0) {
//       console.log("ans in end", ans)

//       return findSum(candidates.slice(1), target-, ans, finalAns);
//     }
//         if(candidates[0] === candidates[1]) {
//             return finalAns;
//         }
//          // take it
//         ans.push(candidates[0]);
//         let takeAnswers = findSum(candidates.slice(1), target - candidates[0], ans, finalAns);
//         ans.pop()

//         // leave it

//         let leaveAns = findSum(candidates.slice(1), target, ans, finalAns);

//         console.log("take", takeAnswers, "leave", leaveAns)
//         return takeAnswers.concat(leaveAns)

//   }

//   function sortArray(array) {
//     array.sort(function(a, b){return a-b}); // sorts the array in ascending order
//     return array;
//   }

//   function isInArray(array, element) {
//     return array.some(subArray => JSON.stringify(subArray) === JSON.stringify(element));
//   }

// /**
//  * @param {number[]} candidates
//  * @param {number} target
//  * @return {number[][]}
//  */
// var combinationSum = function(candidates, target) {
//     candidates = candidates.sort((a, b) => a - b)
//     const result = []

//     const backtracking = (curr, remaining, target) => {
//         if (target < remaining[0] || !remaining.length) return

//         for (let i = 0; i < remaining.length; i++) {
//             if (i > 0 && remaining[i-1] === remaining[i]) {
//                 continue
//             }
//             const number = remaining[i]
//             if (number > target) return

//             const newCurr = [...curr]
//             newCurr.push(number)

//             if (target - number === 0) {
//                 return result.push(newCurr)
//             }

//             backtracking(newCurr, remaining.slice(i+1), target - number)
//         }
//     }

//     backtracking([], candidates, target)

//     return result
// }

// const candidates = [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,5,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1];
// const target = 30;
// const result = combinationSum(candidates, target);
// console.log(result); // Output: [[2, 2, 3], [7]]
