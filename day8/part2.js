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

const emulator = (opcodeToSwap) => {

  let programCounter = 0;
  let acc = 0;
  const callCounts = {};

  while(true) {
    if (programCounter === program.length) {
      console.log(`FIN - ${opcodeToSwap} - ${acc}`);
      break;
    }
    let [inst, param] = program[programCounter];
    // nop <-> jmp when not acc
    if (inst !== 'acc' && opcodeToSwap === programCounter) {
      inst = inst === 'nop' ? 'jmp' : 'nop';
    }

    //console.log(acc, programCounter, program[programCounter]);
    if (programCounter in callCounts) {
      // stop iteration
      callCounts[programCounter] += 1;
      //console.log(programCounter, program[programCounter]);
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

// find the one swapped opcode
for (let i = 0; i < program.length; i++) {
  emulator(i);
}
