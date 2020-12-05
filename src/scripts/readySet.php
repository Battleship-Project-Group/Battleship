<?php
//Set player as ready, returns response + players ready bool (true if both players are ready)
$username = (isset($_POST['uname'])) ? $_POST['uname'] : "test";
$lobbyname = (isset($_POST['lobbyname'])) ? $_POST['lobbyname'] : $username . "-Lobby";
$status = (isset($_POST['ready'])) ? $_POST['ready'] : "True";
$servername = "localhost";
$dbusername = "BattleshipProjectUser";
$dbpass = "shipbattle321";
$dbname = "gamesdb";
$players = array();
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
$sql3 = "SELECT * FROM `" . $lobbyname . "`";

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
      array_push($players, $row["PlayerName"]);
      if ($row["MyTurn"] == '1'){
        $goesFirst = $row["PlayerName"];
      }
    }
  }
} else {
  $response = "Failure";
}

$conn->close();

if ($playersReady) {
  $output = array("Result"=>$response, "playersReady"=>$playersReady, "p1"=>$players[0], "p2"=>$players[1], "firstPlayer"=>$goesFirst);
} else {
  $output = array("Result"=>$response, "playersReady"=>$playersReady, "firstPlayer"=>$goesFirst);
}
echo json_encode($output);

?>
