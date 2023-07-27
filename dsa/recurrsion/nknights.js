function main() {
    const n = 4;
    const board = new Array(n).fill(null).map(() => new Array(n).fill(false));
    console.log(nknights(board, 0, 0, 8));
    console.log(board);
  }
  
  function nknights(board, row, col, knights) {

    // Base case - when all queens are placed successfully on the board

    if(knights == 0) {
        display(board);
        console.log();
        return 1;
    }

  
    if (row == board.length - 1 && col == board.length) {
      return 0;
    }

    if (col == board.length) {
        return nknights(board, row + 1, 0, knights);
    }

    let countSum = 0;


    if(isSafe(board, row, col)) {
        // place the knight
        board[row][col] = true;

        countSum += nknights(board, row, col+1, knights - 1); // check for the next col in the same row

        board[row][col] = false; // backtrack and remove the knight from the board

    }  

    countSum += nknights(board, row, col+1, knights); // check for the next col in the same row

    return countSum;

  }


  
  function isSafe(board, row, col) {

    // check if the knight is safe from the other knights 


    if (isValid(board, row - 2, col - 1)) {
        if (board[row - 2][col - 1]) {
            return false;
        }
    }

    if (isValid(board, row - 1, col - 2)) {
        if (board[row - 1][col - 2]) {
            return false;
        }
    }

    if (isValid(board, row - 2, col + 1)) {
        if (board[row - 2][col + 1]) {
            return false;
        }
    }

    if (isValid(board, row - 1, col + 2)) {
        if (board[row - 1][col + 2]) {
            return false;
        }
    }



    return true;
    

  }
  
  function display(board) {
    for (const row of board) {
      for (const element of row) {
        if (element) {
          process.stdout.write("O ");
        } else {
          process.stdout.write("X ");
        }
      }
      console.log();

    }
  }


  function isValid(board, row, col) {
    if(row < 0 || col < 0 || row >= board.length || col >= board[0].length) {
        return false;
    }
    return true;
  }
  main();
  