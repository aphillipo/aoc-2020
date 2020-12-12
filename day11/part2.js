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

const getVisibleSeat = (row, col, directionMatrix, input) => {
  const [dirRow, dirCol] = directionMatrix;

  const newRow = row + dirRow;
  const newCol = col + dirCol;

  if (newRow >= input.length) {
    return '.';
  }

  if (newRow < 0) {
    return '.';
  }

  if (newCol >= input[0].length) {
    return '.';
  }

  if (newCol < 0) {
    return '.';
  }


  // we have found a seat
  if (['L', '#'].includes(input[newRow][newCol])) {
    return input[newRow][newCol];
  } else {
    // otherwise keep collowing the direction matrix
    return getVisibleSeat(newRow, newCol, directionMatrix, input);
  }
}

const getAdjacentSeatsCount = (row, column, input) => {
  const seatUp = getVisibleSeat(row, column, [-1, 0], input);
  const seatUpRight = getVisibleSeat(row, column, [-1, 1], input);
  const seatRight = getVisibleSeat(row, column, [0, 1], input);
  const seatDownRight = getVisibleSeat(row, column, [1, 1], input);
  const seatDown = getVisibleSeat(row, column, [1, 0], input);
  const seatDownLeft = getVisibleSeat(row, column, [1, -1], input);
  const seatLeft = getVisibleSeat(row, column, [0, -1], input);
  const seatUpLeft = getVisibleSeat(row, column, [-1, -1], input);

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

      if (seat === '#' && adjacentSeatsCount >= 5) {
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

