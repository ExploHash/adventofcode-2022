const fs = require('fs');
const readline = require("readline");


async function main(){
  const stream = fs.createReadStream("./inputs/1.txt");
  
  const rl = readline.createInterface({
    input: stream,
    crlfDelay: Infinity
  });

  let highestElf;
  let highestCalories = 0;

  let currentElf = 1;
  let currentCalories = 0;

  for await (const line of rl) {
    if(line.trim().length === 0){
      //Check if current elf is highest
      if(currentCalories > highestCalories){
        highestElf = currentElf;
        highestCalories = currentCalories;
      }
      //Next elf
      currentElf++;
      currentCalories = 0;
    }else{
      currentCalories += parseInt(line);
    }
  }

  console.log(`Elf with the most calories is ${highestElf} with ${highestCalories} calories`);
}

main();