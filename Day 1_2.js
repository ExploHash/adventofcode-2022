const fs = require('fs');
const readline = require("readline");


async function main(){
  const stream = fs.createReadStream("./inputs/1.txt");

  const rl = readline.createInterface({
    input: stream,
    crlfDelay: Infinity
  });
  
  const top3Calories = [0,0,0];
  let currentCalories = 0;

  for await (const line of rl) {
    if(line.trim().length === 0){//Empty line
      //Check if calories can be placed in top 3
      if(top3Calories.some(topCalorie => topCalorie < currentCalories)){
        top3Calories.push(currentCalories);
        top3Calories.sort((a,b) => b - a);
        top3Calories.pop();
      }
      //Next elf
      currentCalories = 0;
    }else{//Line with number
      currentCalories += parseInt(line);
    }
  }

  //Calculate sum
  const sum = top3Calories.reduce((acc, val) => acc + val, 0);
  console.log(`The three elves with the most calorees have ${sum} calories`);
}

main();