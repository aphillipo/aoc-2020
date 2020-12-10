import * as fs from 'fs';

const data = fs.readFileSync('./data.txt').toString();

const input = data.split('\n').map((value) => parseInt(value, 10)).sort((a, b) => a - b);

const memoizer = (func) => {
  const cache = {}
  return (n) => {
    if (cache[n] != undefined ) {
      return cache[n];
    } else {
      const result = func(n);
      cache[n] = result;
      return result;
    }
  }
}

// hack our input
input.unshift(0); // input 
input.push(input[input.length - 1] + 3); // laptop adapter 

const computeAllAdapters = () => {

  const computeNextAdapters = (i = 0) => {
    // we reached the end
    if (i === input.length - 1) {
      return 1;
    }

    // for this node count the branches - each branch may have man other branches
    let answer = 0;
    for (let j = i + 1; j < input.length; j++) {
      // we can only jump 3 steps max
      if (input[j] - input[i] <= 3) {
        answer += memoizeComputerNextAdapter(j);
      }
    }
    return answer;
  }

  const memoizeComputerNextAdapter = memoizer(computeNextAdapters)

  console.log({ answer: memoizeComputerNextAdapter(0) })
}

computeAllAdapters();

