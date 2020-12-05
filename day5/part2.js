import * as fs from 'fs';

const data = fs.readFileSync('./data.txt').toString();

const decodeBoardingPass = (boardingPass) => {
  const bp = boardingPass.replace(/[FL]/g, '0').replace(/[BR]/g, '1');
  return { row: parseInt(bp.substring(0, 7), 2), col: parseInt(bp.substring(7, 10), 2) };
};

const getSeatId = ({ row, col }) => 8 * row + col;

const seats = data.split('\n');
const seatsData = seats.map(decodeBoardingPass);

const seatIds = seatsData.map(getSeatId).sort((seatIdA, seatIdB) => seatIdA - seatIdB);

const initialSeatId = seatIds[0]

const findSeatId = () => {
  for (var i = 0; i < seatIds.length; i++) {
    const nextSeatId = initialSeatId + i;
    const indexedSeatId = seatIds[i];

    if (nextSeatId != indexedSeatId) {
      return nextSeatId;
    }
  }
}

console.log(findSeatId());