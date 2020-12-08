import * as fs from 'fs';

const data = fs.readFileSync('./data.txt').toString();

const processBags = (containingBags) => {
  return containingBags.split(',').reduce((acc, bag) => {
    if (bag === 'no other bags') {
      return acc;
    }
    const parts = /\s*(\d+) ([a-z ]+) bag/g.exec(bag);
    acc.push({ number: parts[1], bagName: parts[2] });
    return acc;
  }, []);
}

const buildRuleObj = (rules, rule) => {
  const ruleObj = rule.replace('.', '').split(/ bags contain /);

  const [bag, containsBags] = ruleObj;

  rules[bag] = processBags(containsBags);
  return rules;
}

const bagRules = data.split('\n').reduce(buildRuleObj, {});

const countInnerBags = (innerBag = 'shiny gold') => {
  let bagCounts = 0;

  const lookupChildBags = (child, multiplier = 1) => {
    if (!(child in bagRules)) {
      return;
    } else {
      bagRules[child].forEach(({ bagName, number }) => {
        // add all unique bags only in the paths.
        const bagsWithinBags = multiplier * parseInt(number, 10);
        bagCounts += bagsWithinBags;
        lookupChildBags(bagName, bagsWithinBags);
      });
    }
  }
  lookupChildBags(innerBag);

  return bagCounts;
}

console.log(countInnerBags());
