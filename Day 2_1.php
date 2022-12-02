<?php

function main(){
  $lines = file("./inputs/2.txt");

  $myThings = ["X", "Y", "Z"];
  $opponentThings = ["A", "B", "C"];

  $points = 0;
  
  foreach($lines as $line) {
    $line = trim($line);
    [$opponentPick, $myPick] = explode(" ", $line);

    $myIndex = array_search($myPick, $myThings);
    $opponentIndex = array_search($opponentPick, $opponentThings);
    
    //Add pick points
    $points += $myIndex + 1;

    //Calculate win
    if($opponentThings[(3 + ($myIndex - 1)) % 3] === $opponentPick){
      $points += 6;
    }else if ($myIndex === $opponentIndex){
      $points += 3;
    }
  }

  echo "My total points are: " . $points;
}

main();