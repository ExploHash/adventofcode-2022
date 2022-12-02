<?php

function main(){
  $lines = file("./inputs/2.txt");
  $opponentThings = ["A", "B", "C"];

  $points = 0;
  
  foreach($lines as $line) {
    $line = trim($line);
    [$opponentPick, $whatHappens] = explode(" ", $line);
    $opponentIndex = array_search($opponentPick, $opponentThings);

    //Calculate pick
    switch($whatHappens){
      case "X":
        $myIndex = (3 + ($opponentIndex - 1)) % 3;
        break;
      case "Y":
        $points += 3;
        $myIndex = $opponentIndex;
        break;
      case "Z":
        $points += 6;
        $myIndex = (3 + ($opponentIndex + 1)) % 3;
        break;
    }
    
    //Add pick points
    $points += $myIndex + 1;
  }

  echo "My total points are: " . $points;
}

main();