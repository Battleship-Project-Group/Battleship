<?php
//Used to add player to game lobby
//If player is already in lobby, do nothing return successful response
$username = (isset($_POST['uname'])) ? $_POST['uname'] : "test";
$lobbyname = (isset($_POST['lobbyname'])) ? $_POST['lobbyname'] : $username . "-Lobby";
$servername = "localhost";
$dbusername = "BattleshipProjectUser";
$dbpass = "shipbattle321";
$dbname = "gamesdb";

//Used to get number of players in the lobby
$sql00 = "SELECT * FROM `" . $lobbyname . "`";
//Used to check if player is already in the lobby
$sql0 = "SELECT * FROM `" . $lobbyname . "` WHERE `PlayerName`='" . $username . "'";
//Used add player to the lobby
$sql = "INSERT INTO `" . $lobbyname . "` (`PlayerName`, `ReadyStatus`, `MyTurn`)";
$sql .= " VALUES ('" . $username . "', '0', '0')";

$conn = new mysqli($servername,$dbusername,$dbpass,$dbname);

if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

if ($conn->query($sql00)->num_rows < 2) {
  if ($conn->query($sql0)->num_rows == 0) {
    //Add user to lobby
    if ($conn->query($sql) === TRUE) {
      $response = "Success";
    } else {
      $response = "Failure";
    }
  } else {
    //User already in lobby
    $response = "Success";
  }
} else {
  $response = "Lobby is already full!";
}


$conn->close();

echo ($response);

?>
