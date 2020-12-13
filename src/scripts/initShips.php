<?php

$username = (isset($_POST['uname'])) ? $_POST['uname'] : "test";
$lobbyname = (isset($_POST['lobbyname'])) ? $_POST['lobbyname'] : $username . "-Lobby";
$carrier = (isset($_POST['carrier'])) ? ($_POST['carrier']) : "E7F7G7H7I7";
$bship = (isset($_POST['battleship'])) ? ($_POST['battleship']) : "C9D9E9F9";
$destroyer = (isset($_POST['destroyer'])) ? ($_POST['destroyer']) : "I3I4I5";
$submarine = (isset($_POST['submarine'])) ? ($_POST['submarine']) : "D3E3F3";
$patrol = (isset($_POST['patrolboat'])) ? ($_POST['patrolboat']) : "A1B1";
$servername = "localhost";
$dbusername = "BattleshipProjectUser";
$dbpass = "shipbattle321";
$dbname = "gamesdb";

$sql = "UPDATE `" . $lobbyname . "` SET `CarrierLocation`='" . $carrier . "',`BattleshipLocation`='" . $bship . "',`DestroyerLocation`='" . $destroyer . "',`SubmarineLocation`='" . $submarine . "',`PatrolLocation`='" . $patrol . "'";
$sql .= " WHERE `PlayerName`='" . $username . "';";

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
