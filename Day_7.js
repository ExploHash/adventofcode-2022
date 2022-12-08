/*
 Not the best solution, but it works.
*/

const fs = require('fs');
const readline = require('readline');
const fileName = "./inputs/7.txt";
async function main(){
  const treeItems = await buildDirectoryTree();
  const root = treeItems.find(item => item.path === "/");

  const sumSizes = [];
  calculateDirectorySizes(root, sumSizes);

  //Calculate sum of dirs
  const sum = sumSizes.reduce((sum, val) => sum + val, 0);
  console.log(sum);
  //Calculate smallest directory
  const totalSpace = 70000000;
  const requirement = 30000000;
  const spaceNeeded = requirement - (totalSpace - root.size);

  const dirsOnly = treeItems.filter(item => item.dir);
  dirsOnly.sort((a,b) => a.size - b.size)
  const dir = dirsOnly.find(dir => dir.size > spaceNeeded);
  console.log(dir);

}

function calculateDirectorySizes(tree, sumSizes){
  let size = 0;
  for(const item of tree.children){
    if(item.dir){
      size += calculateDirectorySizes(item, sumSizes);
    }else{
      size += +item.size;
    }
  }

  tree.size = size;

  if(size <= 100000) {
    sumSizes.push(size);
  }
  return size;
}

async function buildDirectoryTree(){
  const stream = fs.createReadStream(fileName);
  
  const rl = readline.createInterface({
    input: stream,
    crlfDelay: Infinity
  });

  const treeItems = [];
  let currentCommand = [];
  let outputBuffer = [];
  const cwd = [];

  for await (const line of rl) {
    if(line[0] === "$"){
      //Run previous command
      currentCommand.length && handleCommand(currentCommand, outputBuffer, cwd, treeItems);
      //Initialize new command
      const command = line.substring(2).split(" ");
      currentCommand = command;
      outputBuffer = [];
    }else{
      //Add line to output buffer
      outputBuffer.push(line);
    }
  }

  //Run last command
  currentCommand.length && handleCommand(currentCommand, outputBuffer, cwd, treeItems);

  return treeItems;
}

function handleCommand(command, outputBuffer, cwd, treeItems){
  console.log(command);
  switch(command[0]){
    case "cd":
      handleCd(command[1], cwd, treeItems);
      break;
    case "ls":
      handleLs(outputBuffer, cwd, treeItems);
      break;
  }
}

function handleCd(path, cwd, treeItems){
  if(path[0] === "/"){
    cwd.forEach(() => cwd.pop());
  } else if(path === ".."){
    cwd.pop();
  }else{
    cwd.push(path);
  }

  if(!treeItems.some(item => item.path === "/" + cwd.join("/"))){
    treeItems.push({
      name: cwd[cwd.length - 1],
      path: "/" + cwd.join("/"),
      children: [],
      dir: true
    });
  }
  
}

function handleLs(outputBuffer, cwd, treeItems){
  const currentItem = treeItems.find(item => item.path === "/" + cwd.join("/"));
  for(const line of outputBuffer){
    let item;
    if(line.startsWith("dir ")){
      const [, name] = line.split(" ");
      item = treeItems.find(item => item.path === "/" + cwd.join("/") + "/" + name);
      if(!item){
        item = {
          name,
          path: "/" + [...cwd, name].join("/"),
          children: [],
          dir: true
        };
      }
    }else{
      const [size, name] = line.split(" ");
      item = {
        name,
        path: "/" + [...cwd, name].join("/"),
        size,
        dir: false
      };
    }
    //Add to current item and tree
    currentItem.children.push(item);
    treeItems.push(item);
  }
}

main();