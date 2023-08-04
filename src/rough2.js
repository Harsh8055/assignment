


module.exports = {
    grayCode
}

// check https://youtu.be/KOD2BFauQbA for solution
var grayCode = function(n) {

    let narray = [];


    for(let i = 0; i < Math.pow(2, n); i++) {
        narray.push(i);
    }



    binaryArray = decimalArrayToBinary(narray);
    let ans = [];
console.log("binaryArray", binaryArray, narray)

    // for(let i = 0; i < binaryArray.length; i++) {
    findNextBi(binaryArray,0); 
    // }


    let finalAns = binaryArraryToDecimalArray(ans)

    console.log("finalAns", ans,finalAns)
    // for(let i = 0; i < arr.length; i++) {
    //     let num = parseInt(arr[i], 2);
    //     arr[i] = num;
    // }




    function findNextBi(array, currentI) {

        // base case

        if(currentI == array.length - 1 ) {
            console.log("ans inside", array)
            ans = array.slice();
            return array;
        }


        let current = array[currentI];


        for (let i = 0; i < current.length; i++) { 

       

            let newVal;

            if(current[i] == "0") {
                newVal = "1";
            } else {
                newVal = "0";
            }

            let newBinary = current.slice(0, i) + newVal + current.slice(i+1);
            // console.log(newBinary)

            let index = linearSearch(array, newBinary, currentI);

            if(index == -1 || currentI+1 > index) {
                if(currentI == 0 && i == current.length - 1) {
                    console.log("last", i)
                 }
                continue
            }

            if(currentI+1 == index) {
                // don't swap 
                findNextBi(array, currentI+1);
            } else {
                // swap
                let temp = array[index];
                array[index] = array[currentI+1];
                array[currentI+1] =  temp;
    
                console.log("array did",currentI+1,"switch", array)
    
                findNextBi(array, currentI+1);

             // swap
                 temp = array[index];
                 array[index] = array[currentI+1];
                 array[currentI+1] =  temp;

              

                 console.log("removed swap did",currentI,"switch", array)

            }

        }

        return array;

    }


    function linearSearch(array, target, curr) {
        for (let i = curr+1; i < array.length; i++) {
          if (array[i] === target) {
            return i;
          }
        }
        return -1;
      }

    function decimalArrayToBinary(arrayInt) {

        let binarLast = decimalToBinaryHelper(arrayInt[arrayInt.length-1]);
        let lengthEach = binarLast.length;

        let binaryArr = [];

        for(let i = 0; i < arrayInt.length; i++) {
            let binary = decimalToBinaryHelper(arrayInt[i]);
            if(binary.length < lengthEach) {
                let diff = lengthEach - binary.length;
                for(let j = 0; j < diff; j++) {
                    binary = "0" + binary;
                }
            }
            binaryArr.push(binary);
        }

        return binaryArr;

        

        function decimalToBinaryHelper(decimalNumber) {

            if(decimalNumber == 0) {
                return "0";
            }

            let binary = "";

            while (decimalNumber >= 0) {
                if(decimalNumber == 0) {
                    binary = "0" + binary;
                    return binary;
                }

            binary = (decimalNumber % 2) + binary;
            decimalNumber = Math.floor(decimalNumber / 2);
         }
          return binary;

        }

     
     }

     function binaryArraryToDecimalArray(arrBinaryString) {

        let arrDecimal = [];

        for(let i = 0; i < arrBinaryString.length; i++) {
            let num = parseInt(arrBinaryString[i], 2);
            arrDecimal.push(num);
        }

        return arrDecimal;

     }
    
};






