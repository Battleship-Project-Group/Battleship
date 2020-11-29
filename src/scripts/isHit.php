<?php
$username = (isset($_POST['uname'])) ? $_POST['uname'] : "test";
$lobbyname = (isset($_POST['lobbyname'])) ? $_POST['lobbyname'] : $username . "-Lobby";
$servername = "localhost";
$dbusername = "BattleshipProjectUser";
$dbpass = "shipbattle321";
$dbname = "gamesdb";

//Used to get target location
$sql = "SELECT `LastTarget` FROM `" . $lobbyname . "` WHERE `PlayerName`='" . $username . "';";
//Used to get other player's ship locations
$sql2 = "SELECT * FROM `" . $lobbyname . "` WHERE NOT `PlayerName`='" . $username . "';";
//Used to update ship location if the attack succeeded, remove the tile that was hit
$sql3 = "UPDATE `" . $lobbyname . "` SET ";

$conn = new mysqli($servername,$dbusername,$dbpass,$dbname);

if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

$tmp = $conn->query($sql);
if ($tmp->num_rows == 1) {
  //Get target
  $entry = $tmp->fetch_assoc();
  $target = $entry["LastTarget"];
  //Get enemy ships
  $tmp = $conn->query($sql2);
  if ($tmp->num_rows == 1) {
    $entry = $tmp->fetch_assoc();
    $shipDestroyed = "False";
    $response = "Hit!";

    //Check for collision
    if (stristr($entry["CarrierLocation"],$target)) {
      $newLocation = str_replace($target, "", $entry["CarrierLocation"]);
      $sql3 .= "`CarrierLocation`='" . $newLocation . "' ";
    } else if (stristr($entry["BattleshipLocation"],$target)) {
      $newLocation = str_replace($target, "", $entry["BattleshipLocation"]);
      $sql3 .= "`BattleshipLocation`='" . $newLocation . "' ";
    } else if (stristr($entry["DestroyerLocation"],$target)) {
      $newLocation = str_replace($target, "", $entry["DestroyerLocation"]);
      $sql3 .= "`DestroyerLocation`='" . $newLocation . "' ";
    } else if (stristr($entry["SubmarineLocation"],$target)) {
      $newLocation = str_replace($target, "", $entry["SubmarineLocation"]);
      $sql3 .= "`SubmarineLocation`='" . $newLocation . "' ";
    } else if (stristr($entry["PatrolLocation"],$target)) {
      $newLocation = str_replace($target, "", $entry["PatrolLocation"]);
      $sql3 .= "`PatrolLocation`='" . $newLocation . "' ";
    } else {
      $newLocation = "FALSE";
      $response = "Miss!";
    }
    if ($newLocation == ""){
      $shipDestroyed = "True";
    }

    if ($response == "Hit!") {
      $sql3 .= "WHERE NOT `PlayerName`='" . $username . "';";
      if ($conn->query($sql3) === FALSE) {
        $response = "Error";
      }
    }
  } else {
    $response = "Miss!";
  }
} else {
  $response = "Miss!";
}

$conn->close();

echo ($response);
