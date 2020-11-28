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
    //Check for collision
    if (stristr($entry["CarrierLocation"],$target) || stristr($entry["BattleshipLocation"],$target) || stristr($entry["DestroyerLocation"],$target) || stristr($entry["SubmarineLocation"],$target) || stristr($entry["PatrolLocation"],$target) ) {
      $response = "Hit!";
    } else {
      $response = "Miss!";
    }
  } else {
    $response = "Miss!";
  }
} else {
  $response = "Miss!";
}

$conn->close();

echo ($response);
