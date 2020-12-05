import * as fs from 'fs';

const data = fs.readFileSync('./data.txt').toString();

const slopeData = data.split('\n').map(line => line.split(''));

const calculateTreeCollisions = (slopeData) => {
  const loopLength = slopeData[0].length;
  const chars = []
  let x = 0;
  for (let y = 0; y < slopeData.length; y++) {
    chars.push(slopeData[y][x % loopLength]);
    x += 3;
  }
  return chars;
}

const output = calculateTreeCollisions(slopeData);

console.log(output.reduce((acc, val) => {
  if(val === '#') {
    acc++;
  }
  return acc;
}, 0));