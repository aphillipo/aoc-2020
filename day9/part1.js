import * as fs from 'fs';

const data = fs.readFileSync('./data.txt').toString();

const input = data.split('\n').map((value) => parseInt(value, 10));

console.log(input);

const findNotSum = (inputNumbers, windowSize = 25) => {

  // find the inital 25 numbers
  const prev25Numbers = inputNumbers.slice(0, windowSize);

  for (let i = 25, len = inputNumbers.length; i < len; i++) {
    const number = inputNumbers[i];
    let isValid = false;
    for (let j = 0; j < prev25Numbers.length; j++) {
      const candidateFactor = number - prev25Numbers[j];
      if (prev25Numbers.includes(candidateFactor)) {
        isValid = true;
        break;
      }
    }
    if (isValid) {
      // remove the first item and add this new number
      prev25Numbers.shift();
      prev25Numbers.push(number);
    } else {
      // fail and don't carry on.
      console.log('FAILS ON: ', number);
      break;
    }
  }
}

findNotSum(input);
