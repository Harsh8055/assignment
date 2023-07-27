// code for maze problem, also with backtracking


function path(p, r, c) {
    if (r === 1 && c === 1) {
        console.log(p);
        return;
    }

    if (r > 1) {
        path(p + 'D', r - 1, c);
    }

    if (c > 1) {
        path(p + 'R', r, c - 1);
    }
}

function pathRet(p, r, c) {
    if (r === 1 && c === 1) {
        return [p];
    }

    let list = [];

    if (r > 1) {
        list = list.concat(pathRet(p + 'D', r - 1, c));
    }

    if (c > 1) {
        list = list.concat(pathRet(p + 'R', r, c - 1));
    }

    return list;
}

// maze with backtracking
function allPaths(maze, p, r, c) {
    let list = [];
    // if end, return
    if (r === maze.length - 1 && c === maze[0].length - 1) {
    list.push(p);
    console.log(p);
    return list;
    }

    if(maze[r][c] === false) {
        return list;
    }
    // right, if only possible
    if(c < maze[0].length - 1) {
       maze[r][c] = false;
       list = list.concat(allPaths(maze, p + 'R', r, c+1));
       maze[r][c] = true;

    }
    // down, if only possible
    if(r < maze.length - 1) {
       maze[r][c] = false;
       list = list.concat(allPaths(maze, p + 'D', r+1, c));
       maze[r][c] = true;
    }
    // up, if only possible
    if(r > 0) {
       maze[r][c] = false;
       list = list.concat(allPaths(maze, p + 'U', r-1, c));
       maze[r][c] = true;
    }
    // left, if only possible
    if(c > 0) {
       maze[r][c] = false;
       list = list.concat(allPaths(maze, p + 'L', r, c-1));
       maze[r][c] = true;
    }
    return list;
}
function allPaths2ndway(maze, p, r, c) {
    let list = [];
    // if end, return
    if (r === maze.length - 1 && c === maze[0].length - 1) {
    list.push(p);
    console.log(p);
    return list;
    }

    if(maze[r][c] === false) {
        return list;
    }

    // backtracking step, false the current cell so that it is not visited again in the same path
    maze[r][c] = false;


    // right, if only possible
    if(c < maze[0].length - 1) {

       list = list.concat(allPaths(maze, p + 'R', r, c+1));


    }
    // down, if only possible
    if(r < maze.length - 1) {
 
       list = list.concat(allPaths(maze, p + 'D', r+1, c));
      
    }
    // up, if only possible
    if(r > 0) {
      
       list = list.concat(allPaths(maze, p + 'U', r-1, c));
      
    }
    // left, if only possible
    if(c > 0) {
   
       list = list.concat(allPaths(maze, p + 'L', r, c-1));

    }
    // backtracking step
    maze[r][c] = true;
    return list;
}


function main() {
let mazeRow = 3;
let mazeCol = 3;
let ans =[];
let maze = [
    [true, true, false],
    [true, true, true],
    [true, true, true]
]
// R and down only from top left to top down
// let answer = findPaths(mazeRow, mazeCol, p, up, ans);

let allPath = allPaths(maze, "", 0, 0);
let allPath2 = allPaths2ndway(maze, "", 0, 0);

console.log(allPath, allPath2);


}




main()