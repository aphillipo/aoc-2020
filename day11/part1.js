import * as fs from 'fs';

const data = fs.readFileSync('./data.txt').toString();

const layout = data.split('\n').map((row) => row.split(''));

const getSeat = (row, column, input) => {
  if (row >= input.length) {
    return '.';
  }

  if (row < 0) {
    return '.';
  }

  if (column >= input[0].length) {
    return '.';
  }

  if (column < 0) {
    return '.';
  }

  return input[row][column];
}

const getAdjacentSeatsCount = (row, column, input) => {
  const seatUp = getSeat(row - 1, column, input);
  const seatUpRight = getSeat(row - 1, column + 1, input);
  const seatRight = getSeat(row, column + 1, input);
  const seatDownRight = getSeat(row + 1, column + 1, input);
  const seatDown = getSeat(row + 1, column, input);
  const seatDownLeft = getSeat(row + 1, column - 1, input);
  const seatLeft = getSeat(row, column - 1, input);
  const seatUpLeft = getSeat(row - 1, column - 1, input);

  const seatsCount = [
    seatUp, seatUpRight, seatRight, seatDownRight, 
    seatDown, seatDownLeft, seatLeft, seatUpLeft
  ].reduce((acc, seat) => {
    if (seat === '#') {
      acc++;
    }
    return acc;
  }, 0);

  return seatsCount;
}

const simulateSeating = (input) => {
  const output = input.map(row => row.slice());
  for (let row = 0; row < input.length; row++) {
    for (let col = 0; col < input[0].length; col++) {
      const seat = input[row][col];
      const adjacentSeatsCount = getAdjacentSeatsCount(row, col, input);
      
      if (seat === 'L' && adjacentSeatsCount === 0) {
        output[row][col] = '#';
      }

      if (seat === '#' && adjacentSeatsCount >= 4) {
        output[row][col] = 'L';
      }
    }
  }
  return output;
}

const layoutToString = (layout) => {
  return layout.map(row => row.join('')).join('\n');
}

const iterateSeatingSim = () => {
  let stateChanged = true;
  let newLayout = null;
  let prevLayout = layout;

  while (true) {
    newLayout = simulateSeating(prevLayout);
    // console.log(newLayout);
    // comparing strings is easier
    const newLayoutString = layoutToString(newLayout);
    const prevLayoutString = layoutToString(prevLayout);

    console.log(newLayoutString);
    // console.log('')
    // console.log(prevLayoutString);
    console.log('----------');

    if (newLayoutString === prevLayoutString) {
      // out sim hasn't changed so count the seats and return it
      return (newLayoutString.match(/#/g) || []).length;
    }
    prevLayout = newLayout;
  }
}

console.log(iterateSeatingSim());

