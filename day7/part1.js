import * as fs from 'fs';

const data = fs.readFileSync('./data.txt').toString();

const processBags = (containingBags) => {
  return containingBags.split(',').reduce((acc, bag) => {
    if (bag === 'no other bags') {
      return acc;
    }
    const parts = /\s*(\d+) ([a-z ]+) bag/g.exec(bag);
    acc.push(parts[2]);
    return acc; //{ number: parts[1], bagName: parts[2] };
  }, []);
}

const buildRuleObj = (rules, rule) => {
  const ruleObj = rule.replace('.', '').split(/ bags contain /);

  const [bag, containsBags] = ruleObj;

  rules[bag] = processBags(containsBags);
  return rules;
}

const bagRules = data.split('\n').reduce(buildRuleObj, {});

// this allows a quick lookup of any parent from a child, we traverse the "tree" bottom up
const childParentLookup = Object.entries(bagRules).reduce((acc, [parentBag, childBags]) => {
  childBags.forEach((childBag) => {
    if (childBag in acc) {
      acc[childBag].push(parentBag);
    } else {
      acc[childBag] = [parentBag];
    }
  });
  return acc;
}, {});


const getNumberOfValidOuterBags = (innerBag = 'shiny gold') => {
  const validBags = new Set();

  const lookupChildBags = (child) => {
    if (!(child in childParentLookup)) {
      return;
    } else {
      childParentLookup[child].forEach((parent) => {
        // add all unique bags only in the paths.
        validBags.add(parent);
        lookupChildBags(parent);
      });
    }
  }
  lookupChildBags(innerBag);

  return validBags.size;
}

console.log(getNumberOfValidOuterBags());
