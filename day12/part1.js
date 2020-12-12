import * as fs from 'fs';

const data = fs.readFileSync('./data.txt').toString();

const shipCommands = data.split('\n').map((row) => {
  const [_, command, amount] = row.match(/([NSEWFLR])(\d+)/);
  return { command, amount: parseInt(amount, 10) };
});

const navigateShip = () => {
  // might as well deal with direction in degrees
  let direction = 90;

  // going to use x and y coords, south and west are negative.
  let y = 0;
  let x = 0;

  // could be a foreach... 
  for (let i = 0; i < shipCommands.length; i++) {
    const {command, amount} = shipCommands[i];
    switch(command) {
      case 'N': 
        y += amount;
        break;
      case 'S':
        y += -amount;
        break;
      case 'E':
        x += amount;
        break;
      case 'W':
        x += -amount;
        break;
      // make sure we return to zero at 360 degrees!
      case 'R':
        direction = (direction + amount) % 360;
        break;
      case 'L':
        direction = (direction - amount) % 360;
        // don't let the direction become negative.
        if (direction < 0) {
          direction = 360 + direction;
        }
        break;
      case 'F':
        // I sneakily checked the input and L + R are thankfully always in 
        // 90 degree granularity (i.e. 270, 180, 90 etc.)
        switch (direction) {
          case 0:
            y += amount;
            break;
          case 90:
            x += amount;
            break;
          case 180:
            y += -amount;
            break;
          case 270:
            x += -amount;
            break;
          default:
            throw new Error("Unknown ship direction! Abort abort! Direction was: " + direction)
        }
        break;
      default:
        throw new Error("Unknown ship command! Abort abort!")
    }
  }

  const manhattenDistance = Math.abs(x) + Math.abs(y);
  return manhattenDistance;
}

console.log(navigateShip());