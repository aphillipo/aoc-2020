import * as fs from 'fs';

const data = fs.readFileSync('./data.txt').toString();

const opcodes = {
  JMP: 'jmp',
  ACC: 'acc',
  NOP: 'nop'
}

const decodeInstructions = (instruction) => {
  const [inst, param] = instruction.replace('+', '').split(' ');
  return [inst, parseInt(param, 10)];
};

const program = data.split('\n').map(decodeInstructions);

const emulator = () => {

  let programCounter = 0;
  let acc = 0;
  const callCounts = {};

  while(true) {
    let [inst, param] = program[programCounter];
    console.log(acc, programCounter, program[programCounter]);
    if (programCounter in callCounts) {
      // stop iteration
      callCounts[programCounter] += 1;
      console.log(programCounter, program[programCounter]);
      break;
    } else {
      callCounts[programCounter] = 1;
    }
    switch (inst) {
      case opcodes.JMP:
        programCounter += param;
        break;
      case opcodes.ACC:
        acc += param;
        programCounter += 1;
        break;
      case opcodes.NOP:
        programCounter += 1;
        break;
      default:
        throw new Error('We don\t support that opcode');
    }
  }
}

emulator();
