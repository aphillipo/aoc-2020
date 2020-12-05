import * as fs from 'fs';

const data = fs.readFileSync('./data.txt').toString();

console.log(data);

const expenses = data.split('\n').map((expenseString) => parseInt(expenseString, 10));

// algorithm => 
// with a number - find 2020 - number

const find2020Pair = (expenses) => {
  const [a, b] = expenses.filter(expense => {
    const remainder = 2020 - expense;
    return expenses.includes(remainder);
  });

  return a * b;
}

console.log(find2020Pair(expenses));