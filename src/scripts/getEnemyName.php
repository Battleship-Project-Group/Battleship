<?php
$username = (isset($_POST['uname'])) ? $_POST['uname'] : "test";
$lobbyname = (isset($_POST['lobbyname'])) ? $_POST['lobbyname'] : $username . "-Lobby";
$servername = "localhost";
$dbusername = "BattleshipProjectUser";
$dbpass = "shipbattle321";
$dbname = "gamesdb";

//Used to get other player's name
$sql = "SELECT * FROM `" . $lobbyname . "` WHERE NOT `PlayerName`='" . $username . "';";

$conn = new mysqli($servername,$dbusername,$dbpass,$dbname);

if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

$tmp = $conn->query($sql);
if ($tmp->num_rows == 1) {
  $entry = $tmp->fetch_assoc();
  $response = array("Result"=>"Success", "Name"=>$entry["PlayerName"]);
} else {
  $response = array("Result"=>"Failure");
}

$conn->close();

echo json_encode($response);
