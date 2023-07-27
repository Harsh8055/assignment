 function main() {
  const board = [
    [3, 0, 6, 5, 0, 8, 4, 0, 0],
    [5, 2, 0, 0, 0, 0, 0, 0, 0],
    [0, 8, 7, 0, 0, 0, 0, 3, 1],
    [0, 0, 3, 0, 1, 0, 0, 8, 0],
    [9, 0, 0, 8, 6, 3, 0, 0, 5],
    [0, 5, 0, 0, 9, 0, 6, 0, 0],
    [1, 3, 0, 0, 0, 0, 2, 5, 0],
    [0, 0, 0, 0, 0, 0, 0, 7, 4],
    [0, 0, 5, 2, 0, 6, 3, 0, 0],
  ];

  if (solveSudoku(board)) {
    displayBoard(board);
  } else {
    console.log("Cannot solve");
  }

}

function solveSudoku(board) {
  const n = board.length;
  let row = -1;
  let col = -1;
  let emptyLeft = true;

  // Find the first empty cell in the board
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      if (board[i][j] === 0) {
        row = i;
        col = j;
        emptyLeft = false;
        break;
      }
    }
    if (emptyLeft === false) {
      break;
    }
  }

  // If no empty cell is left, the Sudoku is solved
  if (emptyLeft === true) {
    return true;
  }

  // Backtrack and try different numbers for the empty cell
  for (let num = 1; num <= 9; num++) {
    if (isSafe(board, row, col, num)) {
      board[row][col] = num;
      if (solveSudoku(board)) {
        return true; // Found the solution
      } else {
        board[row][col] = 0; // Backtrack
      }
    }
  }

  return false; // No solution found
}

function displayBoard(board) {
  for (const row of board) {
    console.log(row.join(" "));
  }
}

function isSafe(board, row, col, num) {
  const n = board.length;
  // Check if the number is in the current row
  for (let i = 0; i < n; i++) {
    if (board[row][i] === num) {
      return false;
    }
  }

  // Check if the number is in the current column
  for (let i = 0; i < n; i++) {
    if (board[i][col] === num) {
      return false;
    }
  }

  // Check if the number is in the current 3x3 box
  const sqrt = Math.sqrt(n); // Get the square root of the board size to get the size of the 3x3 box 

  const rowStart = row - (row % sqrt); // Get the starting row of the current size of small box in the board (mxm ) here m is 3 could be different
  const colStart = col - (col % sqrt); // Get the starting column of the current 3x3 box in the board
  for (let r = rowStart; r < rowStart + sqrt; r++) {
    for (let c = colStart; c < colStart + sqrt; c++) {
      if (board[r][c] === num) {
        return false;
      }
    }
  }

  return true; // The number can be placed at this position
}

main(); // Call the main function to solve the Sudoku
