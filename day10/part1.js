import * as fs from 'fs';

const data = fs.readFileSync('./data.txt').toString();

const input = data.split('\n').map((value) => parseInt(value, 10)).sort((a, b) => a - b);

const computeJolts = () => {
  let oneJoltJumps = 0;
  let threeJoltJumps = 1; // your own device is always 3 higher
  let previousInput = 0;

  for (let i = 0; i < input.length; i++) {
    const joltDifference = input[i] - previousInput;
    if (joltDifference === 1) {
      oneJoltJumps++;
    }

    if (joltDifference === 3) {
      threeJoltJumps++;
    }

    previousInput = input[i];
  }

  console.log({ answer: oneJoltJumps * threeJoltJumps })
}

computeJolts();

