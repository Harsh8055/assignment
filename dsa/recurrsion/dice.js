
function dice() {
   const target = 4;
   let ans = [];

    let answer = findPossibleCombinations("", target, ans.slice());
    console.log(answer, ans);
}

function findPossibleCombinations(processed, unprocessed, ans) {
    if(unprocessed == 0) {
        if(ans.includes(processed)) {
            return ans;
         }
        ans.push(processed);       
        return ans;
    }
    for(let i = 1; i <= unprocessed && i <= 6; i++) {
   
        findPossibleCombinations(processed.concat(i.toString()), unprocessed-i , ans);
    }

    return ans;

}


dice()