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

let isNum = (val) => /^\d+$/.test(val);

const yearValidation = (from, to) => (val) => {
  if (val.length !== 4 || !isNum(val)) return false;
  const year = parseInt(val, 10);
  return year >= from && year <= to;
}

const heightValidation = () => (val) => {
  if (val.includes('in')) {
    const height = parseInt(val.replace('in', ''), 10);
    return height <= 76 && height >= 59;
  }
  else if (val.includes('cm')) {
    const height = parseInt(val.replace('cm', ''), 10);
    return height <= 193 && height >= 150;
  }
  return false;
}

const colorValidation = () => (val) => {
  return /^\#([0-9a-f]){6,6}$/.test(val);
}

const eyeColorValidation = () => (val) => {
  return ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'].includes(val);
}

const passportIdValidation = () => (val) => {
  return val.length === 9 && isNum(val);
}

const validateFields = {
  'byr': yearValidation(1920, 2002),
  'iyr': yearValidation(2010, 2020),
  'eyr': yearValidation(2020, 2030),
  'hgt': heightValidation(),
  'ecl': eyeColorValidation(),
  'pid': passportIdValidation(),
  'hcl': colorValidation(),
};

const passportValidArray = passportData.map((passport) => {
  return Object.keys(validateFields).reduce(
    (acc, field) => {
      if (acc === true && !(field in passport)) {
        acc = false;
      } 

      if (acc === true && field in passport) {
        acc = validateFields[field](passport[field]);
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

