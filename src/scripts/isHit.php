<?php
$username = (isset($_POST['uname'])) ? $_POST['uname'] : "test";
$nemesis = (isset($_POST['enemyname'])) ? $_POST['enemyname'] : "test";
$target = (isset($_POST['target'])) ? $_POST['target'] : "A1";
$lobbyname = (isset($_POST['lobbyname'])) ? $_POST['lobbyname'] : $username . "-Lobby";
$servername = "localhost";
$dbusername = "BattleshipProjectUser";
$dbpass = "shipbattle321";
$dbname = "gamesdb";

$sql = "SELECT * FROM `" . $lobbyname . "` WHERE PlayerName='" . $nemesis . "';";

$conn = new mysqli($servername,$dbusername,$dbpass,$dbname);

if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

$result = $conn->query($sql);
if ($result->num_rows == 1) {
  $entry = $result->fetch_assoc();
  if (stristr($entry["CarrierLocation"],$target) || stristr($entry["BattleshipLocation"],$target) || stristr($entry["DestroyerLocation"],$target) || stristr($entry["SubmarineLocation"],$target) || stristr($entry["PatrolLocation"],$target) ) {
    $response = "Hit!";
  } else {
    $response = "Miss!";
  }
} else {
  $response = "Miss!";
}

$conn->close();

echo ($response);
