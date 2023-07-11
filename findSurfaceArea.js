// let's try with finding all the coordinates of the surface area

// SOLUTION TO https://adventofcode.com/2022/day/18
function calculateSurfaceArea(coordinates) {
  surfaceArea = 0;

  // let's loop through the coordinates
  for (let i = 0; i < coordinates.length; i++) {
    let [x, y, z] = coordinates[i];

    // let's find all the adjacent coordinates for this face
    let adjacentCoordinates = [
      [x + 1, y, z],
      [x - 1, y, z],
      [x, y + 1, z],
      [x, y - 1, z],
      [x, y, z + 1],
      [x, y, z - 1],
    ];
    // now let's find if the adjacent exists in the coordinates array

    for (let j = 0; j < adjacentCoordinates.length; j++) {
      const adjacent = adjacentCoordinates[j];
      found = false
      for (let k = 0; k < coordinates.length; k++) {
        // const coor = coordinates[k];

        if(adjacent[0] == coordinates[k][0] && 
          adjacent[1] == coordinates[k][1] && 
          adjacent[2] == coordinates[k][2]) {
            found=true;
           break;
         }
         
        }

        if(!found){
           surfaceArea += 1;
        }

      
    }
  }
  return surfaceArea;
}


/// let's test this
testInput = [
  [1,2,2],
  [2,2,2],
  [3,2,2],
  [2,1,2],
  [2,3,2],
  [2,2,1],
  [2,2,3],
  [2,2,4],
  [2,2,6],
  [1,2,5],
  [3,2,5],
  [2,1,5],
  [2,3,5]
]
let ans = calculateSurfaceArea(testInput); 
console.log("answer is", ans)

