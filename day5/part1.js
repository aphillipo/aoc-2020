import * as fs from 'fs';

const data = fs.readFileSync('./data.txt').toString();

const decodeBoardingPass = (boardingPass) => {
  const bp = boardingPass.replace(/[FL]/g, '0').replace(/[BR]/g, '1');
  return { row: parseInt(bp.substring(0, 7), 2), col: parseInt(bp.substring(7, 10), 2) };
};

const covertToSeatId = ({ row, col }) => 8 * row + col;

const seats = data.split('\n');
const seatsData = seats.map(decodeBoardingPass);

// test it
// console.log(decodeBoardingPass('FBFBBFFRLR')); -> r44, c5 

const seatIds = seatsData.map(covertToSeatId);

console.log(Math.max(...seatIds));