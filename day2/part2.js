import * as fs from 'fs';

const data = fs.readFileSync('./data.txt').toString();

const getRuleParts = (line) => {
  const [range, letter, password] = line.split(' ');
  const [index1, index2] = range.split('-').map(value => parseInt(value, 10));
  return {
    index1,
    index2,
    letter: letter.replace(':', ''),
    password
  }
}

function countCharacters(char, string) {
  return string.split('').reduce((acc, ch) => ch === char ? acc + 1: acc, 0)
}

const passwordsAndRules = data.split('\n').map(getRuleParts);

const findValidPasswords = (passwordsAndRules) => {
  return passwordsAndRules.map(({ letter, password, index1, index2 }) => {
    const chars = password.split('')
    const char1 = chars[index1 - 1];
    const char2 = chars[index2 - 1];
    return (char1 === letter || char2 == letter) && char1 !== char2;
  }).reduce((acc, value) => {
    if (value) {
      acc += 1;
    }
    return acc;
  }, 0);
}

console.log(findValidPasswords(passwordsAndRules))

