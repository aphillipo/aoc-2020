import * as fs from 'fs';

const data = fs.readFileSync('./data.txt').toString();

const intersection = (...lists) => {
  let result = [];
  // if we have one list "everyone" answered all questions
  if (lists.length === 1) {
    return lists[0];
  } else {
    for (let i = 0, len = lists.length; i < len; i++) {
      let currentList = lists[i];
      for (let j = 0, cardLen = currentList.length; j < cardLen; j++) {
        let currentValue = currentList[j];
        // if we have a value in result we don't add it again (no duplicates)
        if(!result.includes(currentValue)) {
          // find if all the other lists include this item
          const intersects = lists.reduce((acc, list) => {
            // once we have one false it's not an intersection
            if (acc === false) return false;
            // check if this array includes the intersecting item
            if (!list.includes(currentValue)) {
              acc = false;
            }
            return acc;
          }, true);

          // if the current value intersects all lists push into the result
          if (intersects) {
            result.push(currentValue);
          }
        }
      }
    }
    return result;
  }
}

const intersectingGroupYeses = (group) => {
  const groupCards = group.split('\n').map(landingCard => landingCard.split(''));
  return intersection(...groupCards);
}

const landingGroupYesCounts = data.split('\n\n').map(intersectingGroupYeses);

const sumLengths = (acc, value) => {
  acc += value.length;
  return acc;
}

console.log(landingGroupYesCounts.reduce(sumLengths, 0));


