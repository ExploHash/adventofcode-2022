const fs = require('fs');
const readline = require('readline');
const fileName = "./inputs/9.txt";

async function main(amount = 2){
  const stream = fs.createReadStream(fileName);
  
  const rl = readline.createInterface({
    input: stream,
    crlfDelay: Infinity
  });

  let knots = [];
  for(let knotIndex = 0; knotIndex < amount; knotIndex++){
    knots[knotIndex] = [0,0];
  }

  const posSet = [];

  for await (const line of rl) {
    const [direction, amount] = line.split(" ");

    for(let i = 0; i < +amount; i++){
      calculateHeadPos(knots[0], direction);
      for(let knotIndex = 1; knotIndex < knots.length; knotIndex++){
        calculateTailPos(knots[knotIndex - 1], knots[knotIndex]);
      }

      const pos = knots[knots.length - 1].toString();
      if(!posSet.includes(pos)) posSet.push(pos);
    }
  }

  console.log(posSet.length);
}

function debugRenderFrame(actors, frameSize = 6){
  let output = "";
  
  for(let y = frameSize - 1; y >= 0; y--){
    let line = "";
    for(let x = 0; x < frameSize; x++){
      let val = ".";
      for(const [actor, [actorX, actorY]] of Object.entries(actors).reverse()){
        if(x === actorX && y === actorY){
          val = actor;
        }
      }
      line += val;
    }
    output += line + "\n";
  }

  return output;
}

function calculateHeadPos(h, direction){
  const directionMap = {
    L: [0, -1],
    R: [0, 1],
    U: [1, 1],
    D: [1, -1]
  }

  const calc = directionMap[direction];
  h[calc[0]] += calc[1];
}

function calculateTailPos(h, t){
  let xDist = h[0] - t[0];
  let yDist = h[1] - t[1];

  //Too tired to think of a better way to do this
  //But this exception works
  if(Math.abs(xDist) === 2 && Math.abs(yDist) === 2){
    t[0] = t[0] + (xDist / Math.abs(xDist));
    t[1] = t[1] + (yDist / Math.abs(yDist));
    return;
  }

  if(Math.abs(xDist) > 1){
    t[0] = t[0] + (xDist / Math.abs(xDist));
    t[1] = h[1]
  }

  if(Math.abs(yDist) > 1){
    t[1] = t[1] + (yDist / Math.abs(yDist))
    t[0] = h[0]
  }
}


main(10);