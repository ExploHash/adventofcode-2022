const fs = require('fs');
const fileName = "./inputs/6.txt";

async function main(amount = 4){
  const data = fs.readFileSync(fileName, "utf8");
  const buffer = [];

  for(const charIndex in data){
    const char = data[charIndex];

    //Add char to buffer
    buffer.push(char);
    if(buffer.length > amount) buffer.shift();

    if(buffer.length === amount){
      //Create sorted buffer
      const sortedBuffer = [...buffer];
      sortedBuffer.sort();
  
      //Check of whole buffer is unique
      if(sortedBuffer.every((char, i) => char !== sortedBuffer[i + 1])){
        console.log(`Start of message signal with ${amount} found after ${+charIndex + 1} chars`);
        break;
      }
    }
  }
}



main(4);
main(14);