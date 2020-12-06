import * as fs from 'fs';

const data = fs.readFileSync('./data.txt').toString();

const decodeLandingCard = (landingCard) => {
  const landingCardAnswers = landingCard.split('\n').join('').split('');
  const distinctLandingCardAnswers = [...new Set(landingCardAnswers)];
  return distinctLandingCardAnswers.length;
};

const landingGroupYesCounts = data.split('\n\n').map(decodeLandingCard);

const sum = (total, value) => {
  total += value;
  return total;
}

console.log(landingGroupYesCounts.reduce(sum));