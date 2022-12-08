const fs = require("fs");

function main() {
  const data = fs.readFileSync("./inputs/8.txt", "utf8");
  const grid = data.split("\n").map((x) => x.split(""));

  let amountVisible = grid.length * 2 + grid[0].length * 2 - 4;

  for (let y = 1; y < grid.length - 1; y++) {
    for (let x = 1; x < grid[y].length - 1; x++) {
      if(treeVisible(grid, x, y)) amountVisible++;
    }
  }

  console.log(amountVisible);
}

function treeVisible(grid, x, y) {
  let treeHeight = +grid[y][x];
  //Check up
  let topVisible = true;
  for (let i = y - 1; i >= 0; i--) {
    if (+grid[i][x] >= treeHeight) {
      topVisible = false;
      break;
    }
  }
  if(topVisible) return true;
  //Check down
  let bottomVisible = true;
  for (let i = y + 1; i < grid.length; i++) {
    if (+grid[i][x] >= treeHeight) {
      bottomVisible = false;
      break;
    }
  }
  if(bottomVisible) return true;
  //Check left
  let leftVisible = true;
  for (let i = x - 1; i >= 0; i--) {
    if (+grid[y][i] >= treeHeight) {
      leftVisible = false;
      break;
    }
  }
  if(leftVisible) return true;
  //Check right
  let rightVisible = true;
  for (let i = x + 1; i < grid[y].length; i++) {
    if (+grid[y][i] >= treeHeight) {
      rightVisible = false;
      break;
    }
  }
  if(rightVisible) return true;
}

main();
