<?php
//Used to split special attacks into seperate coordinates
function toArray($str) {
  $result = array();
  for ($x = 0; $x < strlen($str); $x+=2) {
    array_push($result, substr($str, $x, 2));
  }
  return $result;
}

//Inputs
$username = (isset($_POST['uname'])) ? $_POST['uname'] : "not jese";
$lobbyname = (isset($_POST['lobbyname'])) ? $_POST['lobbyname'] : "1";
//$lobbyname = (isset($_POST['lobbyname'])) ? $_POST['lobbyname'] : $username . "-Lobby";
//DB variables
$servername = "localhost";
$dbusername = "BattleshipProjectUser";
$dbpass = "shipbattle321";
$dbname = "gamesdb";
//Other variables
$targetStr = "ERROR";
$hitCount = 0;
$shipDestroyedAmount = 0;
$coordsHit = array();
$coordsMissed = array();

//Used to get target location
$sql = "SELECT `LastTarget` FROM `" . $lobbyname . "` WHERE `PlayerName`='" . $username . "';";
//Used to get other player's ship locations
$sql2 = "SELECT * FROM `" . $lobbyname . "` WHERE NOT `PlayerName`='" . $username . "';";

$conn = new mysqli($servername,$dbusername,$dbpass,$dbname);

if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

//Try to get player's LastTarget entry from gametable
$tmp = $conn->query($sql);
if ($tmp->num_rows == 1) {
  //Get target
  $entry = $tmp->fetch_assoc();
  $targetStr = $entry["LastTarget"];

  //Try to get enemy player's ship locations
  $tmp = $conn->query($sql2);
  if ($tmp->num_rows == 1) {
    $entry = $tmp->fetch_assoc();
    //Loop through each target in the string
    foreach (toArray($targetStr) as $target){
      //$newLocation used to see if the hit destroyed any ships
      //Set $newlocation to anything but empty string at start,
      //this prevents a miss from triggering any destroyed flags
      $newLocation = "!";
      $hitCount++;
      //Check for collision
      if (stristr($entry["CarrierLocation"],$target)) {
        $entry["CarrierLocation"] = $newLocation = str_replace($target, "", $entry["CarrierLocation"]);
      } else if (stristr($entry["BattleshipLocation"],$target)) {
        $entry["BattleshipLocation"] = $newLocation = str_replace($target, "", $entry["BattleshipLocation"]);
      } else if (stristr($entry["DestroyerLocation"],$target)) {
        $entry["DestroyerLocation"] = $newLocation = str_replace($target, "", $entry["DestroyerLocation"]);
      } else if (stristr($entry["SubmarineLocation"],$target)) {
        $entry["SubmarineLocation"] = $newLocation = str_replace($target, "", $entry["SubmarineLocation"]);
      } else if (stristr($entry["PatrolLocation"],$target)) {
        $entry["PatrolLocation"] = $newLocation = str_replace($target, "", $entry["PatrolLocation"]);
      }
      if ($newLocation == "!") {
        $hitCount--;
        array_push($coordsMissed,$target);
      }
      //Set destroyed flags
      else if ($newLocation == ""){
        $shipDestroyedAmount++;
        array_push($coordsHit,$target);
      }
      else {
        array_push($coordsHit,$target);
      }
    }

    $response = "Success";

    //Update enemy ship locations if there was a hit
    /*
    if ($hitCount > 0){
      $sqlFinal = "UPDATE `" . $lobbyname . "` SET
      `CarrierLocation`='" . $entry["CarrierLocation"] . "',
      `BattleshipLocation`='" . $entry["BattleshipLocation"] . "',
      `DestroyerLocation`='" . $entry["DestroyerLocation"] . "',
      `SubmarineLocation`='" . $entry["SubmarineLocation"] . "',
      `PatrolLocation`='" . $entry["PatrolLocation"] . "'
      WHERE NOT `PlayerName`='" . $username . "';";
      if ($conn->query($sqlFinal) === TRUE) {
        $response = "Success";
      } else {
        //Could not update enemy player's ships
        $response = "Could not update enemy player's ships";
      }
    } else {
      //Nothing else to do
      $response = "Success";
    }
    */

  } else {
    //Could not get enemy player's ships
    $response = "Could not get enemy player's ships";
  }
} else {
  //Could not get player's LastTarget
  $response = "Could not player's LastTarget";
}

$conn->close();

$output = array("Result"=>$response, "shipDestroyedAmount"=>$shipDestroyedAmount, "hitLocations"=>$coordsHit, "missLocations"=>$coordsMissed, "targetString"=>$targetStr);
//Return $response, $hitCount, $shipDestroyed, $shipDestroyedAmount
echo json_encode($output);
