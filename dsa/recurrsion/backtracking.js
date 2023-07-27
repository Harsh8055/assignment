function main() {
  const n = 4;
  const chessboard = Array.from({ length: n }, () => Array(n).fill(0));

  // console.log(chessboard);

  let answer = nqueens(chessboard, 0, 0, n, 1);

  // console.log(answer);
  for (let i = 0; i < answer.length; i++) {
    console.log(answer[i]);
  }
}

function hasNonZeroElementsAboveCoordinate(board, row, col) {
  // Check above the given coordinate (row, col)
  for (let r = 0; r < row; r++) {
    if (board[r][col] !== 0) {
      return true;
    }
  }

  // Check the upper-left diagonal
  for (let r = row - 1, c = col - 1; r >= 0 && c >= 0; r--, c--) {
    if (board[r][c] !== 0) {
      return true;
    }
  }

  // Check the upper-right diagonal
  for (let r = row - 1, c = col + 1; r >= 0 && c < board.length; r--, c++) {
    if (board[r][c] !== 0) {
      return true;
    }
  }

  return false;
}


