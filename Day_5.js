const fileName = "./inputs/5.txt";
const fs = require('fs');
const readline = require("readline");

async function main(craneModel = 9000){
  //Read header
  const stacks = await readHeader(fileName);
  //Execute moves
  await executeMoves(stacks, craneModel === 9000);

  //Log top container of each stack
  console.log(`Top containers with crane ${craneModel} : ` + stacks.map(stack => stack[stack.length - 1]).join(""));
}

async function executeMoves(stacks, reverse = true){
  const stream = fs.createReadStream(fileName);
  
  const rl = readline.createInterface({
    input: stream,
    crlfDelay: Infinity
  });

  for await (const line of rl) {
    //Check if line is instuction
    if(line.substring(0, 4) !== "move") continue;

    //Get instruction
    const [,amount,,fromStack,,toStack] = line.split(" ");
    //Move containers
    const stack = stacks[parseInt(fromStack) - 1];
    const containers = stack.splice(stack.length - amount, amount);
    stacks[toStack - 1].push(...(reverse ? containers.reverse() : containers));
  }

}

async function readHeader(input){
  const stream = fs.createReadStream(fileName);
  const stacks = []; //Row of stacks of containers
  
  const rl = readline.createInterface({
    input: stream,
    crlfDelay: Infinity
  });

  for await (const line of rl) {
    //If end of header break
    if(line.substring(0, 2) === " 1"){
      break;
    }
    //Loop through line
    for(let i = 0; i < line.length; i++){
      const char = line[i];
      if(char === '['){//If start of container indicator
        if(!stacks[i / 4]) stacks[i / 4] = [];
        stacks[i / 4].push(line[i + 1]);
      }
    }
  }

  //Reverse at the end because its read from top to bottom
  return stacks.map(stack => stack.reverse());
}

main(9000);
main(9001);