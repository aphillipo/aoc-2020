import * as fs from 'fs';

const data = fs.readFileSync('./data.txt').toString();

const passports = data.split('\n\n');
const passportData = passports
  .map(
    passport => passport.replace(/\s/g, '\n').split('\n').map(field => field.split(':'))
  ).map(
    p => p.reduce((acc, [key, value]) => {
      acc[key] = value;
      return acc;
    }, {})
  );

const requiredFields = [
  'ecl',
  'pid',
  'eyr',
  'hcl',
  'byr',
  'iyr',
  'hgt'
];

const passportValidArray = passportData.map((passport) => {
  return requiredFields.reduce(
    (acc, field) => {
      if (acc === true && !(field in passport)) {
        acc = false;
      }
      return acc;
    },
    true
  );
});

console.log(passportValidArray.reduce((acc, passportValid) => {
  if (passportValid) {
    acc++;
  }
  return acc;
}, 0));

