import * as fs from 'fs';

const data = fs.readFileSync('./data.txt').toString();

const slopeData = data.split('\n').map(line => line.split(''));

const calculateTreeCollisions = (slopeData, rightStep = 3, downStep = 1) => {
  const loopLength = slopeData[0].length;
  const chars = []
  let x = 0;
  for (let y = 0; y < slopeData.length; y += downStep) {
    chars.push(slopeData[y][x % loopLength]);
    x += rightStep;
  }
  // turn the hashes into a number
  return chars.reduce((acc, val) => {
    if(val === '#') {
      acc++;
    }
    return acc;
  }, 0);
}

const output = calculateTreeCollisions(slopeData);
const output2 = calculateTreeCollisions(slopeData, 1, 1);
const output3 = calculateTreeCollisions(slopeData, 5, 1);
const output4 = calculateTreeCollisions(slopeData, 7, 1);
const output5 = calculateTreeCollisions(slopeData, 1, 2);

console.log(output, output2, output3, output4, output5);
console.log(output * output2 * output3 * output4 * output5);