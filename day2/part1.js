import * as fs from 'fs';

const data = fs.readFileSync('./data.txt').toString();

const getRuleParts = (line) => {
  const [range, letter, password] = line.split(' ');
  const [min, max] = range.split('-').map(value => parseInt(value, 10));
  return {
    min,
    max,
    letter: letter.replace(':', ''),
    password
  }
}

function countCharacters(char, string) {
  return string.split('').reduce((acc, ch) => ch === char ? acc + 1: acc, 0)
}

const passwordsAndRules = data.split('\n').map(getRuleParts);

const findValidPasswords = (passwordsAndRules) => {
  return passwordsAndRules.map(({ letter, password, min, max }) => [countCharacters(letter, password), min, max]).map(([count, min, max]) => {
    return count >= min && count <= max;
  }).reduce((acc, value) => {
    if (value) {
      acc += 1;
    }
    return acc;
  }, 0);
}

console.log(findValidPasswords(passwordsAndRules))

