// given
// addx V -> 2 cycles x is the value 1 in start, but changes
// noop -> no effect but takes one cycle to complete

// after 20, each 40 cycles later we need o calcultate the signal strength 
// 20th, 60th, 100th, 140th, 180th, and 220th cycles
//Find the signal strength during the 20th, 60th, 100th, 140th, 180th, and 220th cycles. What is the sum of these six signal strengths?

// Consider the following small program:

// noop
// addx 3
// addx -5
// Execution of this program proceeds as follows:

// At the start of the first cycle, the noop instruction begins execution. During the first cycle, X is 1. After the first cycle, the noop instruction finishes execution, doing nothing.
// At the start of the second cycle, the addx 3 instruction begins execution. During the second cycle, X is still 1.
// During the third cycle, X is still 1. After the third cycle, the addx 3 instruction finishes execution, setting X to 4.
// At the start of the fourth cycle, the addx -5 instruction begins execution. During the fourth cycle, X is still 4.
// During the fifth cycle, X is still 4. After the fifth cycle, the addx -5 instruction finishes execution, setting X to -1.


// program is array of strings
function calcultateStrength(program){

    let cycles = [3 ,4];

    // we can stop after 220 cycle anyways
    let maxCycles = cycles[cycles.length-1]; // can be mat.max
    let signalStrength = 0;
    let totalInstructions = program.length;
    let x = 1; // as it's one from beginning
    let cycleNum;
    let addxCycleC = 0;
    let currentI = 0;

    // let's loop through all cycles first, such that we don't go above maxCycle
    // for (let cycle = 1; cycle < maxCycles; cycle++) {
        // let lesThan;
        // if(maxCycles> program.length) {
        //     lesThan = maxCycles
        // } else {
        //     lesThan = program.length
        // }


        for (let i = 0; i < maxCycles; i++) {
            const instruction = program[currentI];
            if(!instruction) {
                break;
            }
            console.log('in', instruction, "i", i, currentI);
            
            if(cycles.includes(i+1)) {
                signalStrength =  signalStrength + (i+1)*x;
            }

            let [opcode, value] = instruction.split(" ");

            if(opcode == "addx") {
                
                if(addxCycleC == 1) {
                    x += parseInt(value);
                    console.log("x is", x, "after running cycle", i,"at index", currentI)
                    addxCycleC = 0
                    currentI += 1;
                } else if (addxCycleC == 0) {
                    addxCycleC++;
                }
            } 
            else if(opcode == "noop") {
                // do nothing, but increment cycle no by i
                // cycleNum += 1;
                currentI += 1;
                continue
            }
            else {
                return -1;
            }

            
        }
// console.log("c")
        return signalStrength;
    // }

}


let input = [
    "noop",
    "addx 3",
    "addx -5",
    ]

let ans = calcultateStrength(input);

// output test
// 2*1 + 3*1 = 5
console.log(ans)
