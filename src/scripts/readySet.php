<?php
//Set player as ready, returns response + players ready bool (true if both players are ready)
$username = (isset($_POST['uname'])) ? $_POST['uname'] : "test";
$lobbyname = (isset($_POST['lobbyname'])) ? $_POST['lobbyname'] : $username . "-Lobby";
$status = (isset($_POST['ready'])) ? $_POST['ready'] : "True";
$servername = "localhost";
$dbusername = "BattleshipProjectUser";
$dbpass = "shipbattle321";
$dbname = "gamesdb";
$playersReady = FALSE;

$sql = "UPDATE `" . $lobbyname . "` SET ReadyStatus = ";
if ($status == "True"){
  $sql .= "'1'";
} else {
  $sql .= "'0'";
}
$sql .= " WHERE PlayerName = '" . $username . "';";
$sql2 = "SELECT * FROM `" . $lobbyname . "` WHERE `ReadyStatus`='1'";

$conn = new mysqli($servername,$dbusername,$dbpass,$dbname);

if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

if ($conn->query($sql) === TRUE) {
  $response = "Success";
  if ($conn->query($sql2)->num_rows == 2) {
    $playersReady = TRUE;
  }
} else {
  $response = "Failure";
}

$conn->close();

$output = array("Result"=>$response, "playersReady"=>$playersReady);
echo json_encode($output);

?>
