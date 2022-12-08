const fs = require("fs");

function main() {
  const data = fs.readFileSync("./inputs/8.txt", "utf8");
  const grid = data.split("\n").map((x) => x.split(""));

  let bestScore = 0;

  for (let y = 1; y < grid.length - 1; y++) {
    for (let x = 1; x < grid[y].length - 1; x++) {
      const score = calculateScenicScore(grid, x, y);
      if (score > bestScore) {
        bestScore = score;
      }
    }
  }

  console.log(bestScore);
}

function calculateScenicScore(grid, x, y) {
  let treeHeight = +grid[y][x];
  //Check up
  let topScore = 0;
  for (let i = y - 1; i >= 0; i--) {
    topScore++
    if (+grid[i][x] >= treeHeight) {
      break;
    }
  }
  //Check down
  let bottomScore = 0;
  for (let i = y + 1; i < grid.length; i++) {
    bottomScore++;
    if (+grid[i][x] >= treeHeight) {
      break;
    }
  }
  //Check left
  let leftScore = 0;
  for (let i = x - 1; i >= 0; i--) {
    leftScore++;
    if (+grid[y][i] >= treeHeight) {
      break;
    }
  }
  //Check right
  let rightScore = 0;
  for (let i = x + 1; i < grid[y].length; i++) {
    rightScore++;
    if (+grid[y][i] >= treeHeight) {
      break;
    }
  }

  return topScore * bottomScore * leftScore * rightScore;
}

main();
