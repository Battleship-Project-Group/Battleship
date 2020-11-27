<?php
$username = (isset($_POST['uname'])) ? $_POST['uname'] : "test";
$lobbyname = (isset($_POST['lobbyname'])) ? $_POST['lobbyname'] : $username . "-Lobby";
$status = (isset($_POST['ready'])) ? $_POST['ready'] : "True";
$servername = "localhost";
$dbusername = "BattleshipProjectUser";
$dbpass = "shipbattle321";
$dbname = "gamesdb";

$sql = "UPDATE `" . $lobbyname . "` SET ReadyStatus = ";
if ($status == "True"){
  $sql .= "'1'";
} else {
  $sql .= "'0'";
}
$sql .= " WHERE PlayerName = '" . $username . "';";

$conn = new mysqli($servername,$dbusername,$dbpass,$dbname);

if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

if ($conn->query($sql) === TRUE) {
  $response = "Success";
} else {
  $response = "Failure";
}

$conn->close();

echo ($response);

?>
