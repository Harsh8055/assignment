//

// n -> 3 chars



// 2 -> a,b,c
// 3 -> d,e,f


function findPossibleCombinations(processed, unprocessed, ans) {


    // base case
    if (unprocessed.length == 0) {

        if(ans.includes(processed)) {
            return ans;
        }

        ans.push(processed);
        return ans;
    }

    let firstChar = unprocessed[0];

    let restOfString = bh.slice(1);
    

    let string = getStringByNumber(firstChar);
    console.log(string);
    for (let i = 0; i < string.length; i++) {
        console.log( ans);
        findPossibleCombinations(processed + string[i], restOfString, ans);
    }
    
    return ans;

}



function findCombinations(string) {

    let ans = [];

   let answer =  findPossibleCombinations("", string, ans);

    console.log("final asnwer", answer);
}


function getStringByNumber(number) {

    if(number == "2") {
   
         return "abc";
      
    }

    if(number == "3") {
        return "def";
    }

    if(number == "4") {
        return "ghi";
    }

    if(number == "5") {
        return "jkl";
    }

    if(number == "6") {
        return "mno";
    }

    if(number == "7") {
        return "pqrs";
    }

    if(number == "8") {
        return "tuv";
    }

    if(number == "9") {
        return "wxyz";
    }
}


// function findLength(p,un) {
//  // first, return if the loop breaks

//  let firstChar = un[0];

//  if(firstChar === " ") {
//     console.log("space", p.length, p, un);
//     return p.length + 1;
//  }

//  if(un.length == 0) {
//     return p.length;
//  }

//  if(p.includes(firstChar)) {
//     return p.length;
//  }

//  // reccursive case
// return findLength(p + firstChar, un.slice(1));

        
// }


// var lengthOfLongestSubstring = function(s) {
//     highest = 0;

//     for(let i = 0; i < s.length; i++) {
//         console.log(i);
//         let un = s.slice(i);
//         let ans = findLength("", un);
        
//         if(ans > highest) {
//             highest = ans;
//         }
//     }
//     console.log(highest);

//     return highest;
// }


// console.log(lengthOfLongestSubstring(" "))


