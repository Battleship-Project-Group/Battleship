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
$goesFirst = NULL;

$sql = "UPDATE `" . $lobbyname . "` SET ReadyStatus = ";
if ($status == "True"){
  $sql .= "'1'";
} else {
  $sql .= "'0'";
}
$sql .= " WHERE PlayerName = '" . $username . "';";
$sql2 = "SELECT * FROM `" . $lobbyname . "` WHERE `ReadyStatus`='1'";
$sql3 = "SELECT `PlayerName` FROM `" . $lobbyname . "` WHERE `MyTurn`='1'";

$conn = new mysqli($servername,$dbusername,$dbpass,$dbname);

if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

if ($conn->query($sql) === TRUE) {
  $response = "Success";
  if ($conn->query($sql2)->num_rows == 2) {
    $playersReady = TRUE;
    //Return who goes first (guest always goes first)
    $tmp = $conn->query($sql3);
    while($row = $tmp->fetch_assoc()){
      $goesFirst = $row["PlayerName"];
    }
  }
} else {
  $response = "Failure";
}

$conn->close();

if ($goesFirst === NULL){
  $output = array("Result"=>$response, "playersReady"=>$playersReady);
} else {
  $output = array("Result"=>$response, "playersReady"=>$playersReady, "firstPlayer"=>$goesFirst);
}
array_push($output,$goesFirst);
echo json_encode($output);

?>
