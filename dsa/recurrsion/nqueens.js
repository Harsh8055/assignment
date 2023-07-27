function main() {
    const n = 4;
    const board = new Array(n).fill(null).map(() => new Array(n).fill(false));
    console.log(queens(board, 0));
    console.log(board);
  }
  
  function queens(board, row) {

    // Base case - when all queens are placed successfully on the board 
    if (row === board.length) {
      display(board);
      console.log();
      return 1;
    }
  
    let count = 0;
  
    // Placing the queen and checking for every row and column
    for (let col = 0; col < board.length; col++) {
      // Place the queen if it is safe
      if (isSafe(board, row, col)) {
        board[row][col] = true; // Place the queen
        count += queens(board, row + 1);    // Check for the next row
        board[row][col] = false; // Backtrack and remove the queen from the board 
      } 
    }
  
    return count;
  }
  
  function isSafe(board, row, col) {
    // Check vertical row
    for (let i = 0; i < row; i++) {
      if (board[i][col]) {
        return false;
      }
    }
  
    // Diagonal left
    const maxLeft = Math.min(row, col);
    for (let i = 1; i <= maxLeft; i++) {
      if (board[row - i][col - i]) {
        return false;
      }
    }
  
    // Diagonal right
    const maxRight = Math.min(row, board.length - col - 1);
    for (let i = 1; i <= maxRight; i++) {
      if (board[row - i][col + i]) {
        return false;
      }
    }
  
    return true;
  }
  
  function display(board) {
    for (const row of board) {
      for (const element of row) {
        if (element) {
          process.stdout.write("Q ");
        } else {
          process.stdout.write("X ");
        }
      }
      console.log();

    }
  }
  
  main();
  