import * as fs from 'fs';

const data = fs.readFileSync('./data.txt').toString();
const expenses = data.split('\n').map((expenseString) => parseInt(expenseString, 10));

const find2020Pair = (expenses) => {
  const len = expenses.length;
  for (var x = 0; x < len; x++) {
    const expense1 = expenses[x];
    for (var y = 0; y < len; y++) {
      const expense2 = expenses[y];
      const remainder = 2020 - expense1 - expense2;
      if (expenses.includes(remainder)) {
        return [expense1, expense2, remainder];
      };
    }
  }
}

console.log(find2020Pair(expenses));

const [a, b, c] =  find2020Pair(expenses);

console.log(a * b * c);