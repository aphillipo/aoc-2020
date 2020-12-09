import * as fs from 'fs';

const data = fs.readFileSync('./data.txt').toString();

const input = data.split('\n').map((value) => parseInt(value, 10));

const previousPuzzleAnswer = 373803594;

const findRangeThatSumsToTotal = (inputNumbers) => {
  for (let windowSize = 3; windowSize < inputNumbers.length; windowSize++) {
    for (let i = 0; i < inputNumbers.length; i++) {
      let total = 0;
      console.log('numbers');
      let prevNumber = inputNumbers[i];
      let smallest = Infinity;
      let largest = 0;
      for (let j = i; j <= i + windowSize; j++) {
        const number = inputNumbers[j];
        if (number < smallest) {
          smallest = number;
        }
        if (number > largest) {
          largest = number;
        }
        total += number;
      }
      if (total === previousPuzzleAnswer) {
        console.log('found - total', total);
        return { smallest, largest, total: smallest + largest, windowSize };
      }
    }
  }
}

console.log(findRangeThatSumsToTotal(input));
