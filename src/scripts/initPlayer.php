<?php
$username = (isset($_POST['uname'])) ? $_POST['uname'] : "test";
$lobbyname = (isset($_POST['lobbyname'])) ? $_POST['lobbyname'] : $username . "-Lobby";
$carrier = (isset($_POST['carrier'])) ? $_POST['carrier'] : "A1B1C1D1E1";
$bship = (isset($_POST['battleship'])) ? $_POST['battleship'] : "B1C1D1E1";
$destroyer = (isset($_POST['destroyer'])) ? $_POST['destroyer'] : "C1D1E1";
$submarine = (isset($_POST['submarine'])) ? $_POST['submarine'] : "C1D1E1";
$patrol = (isset($_POST['patrolboat'])) ? $_POST['patrolboat'] : "D1E1";
$servername = "localhost";
$dbusername = "BattleshipProjectUser";
$dbpass = "shipbattle321";
$dbname = "gamesdb";

$sql = "INSERT INTO `" . $lobbyname . "` (`PlayerName`, `ReadyStatus`, `MyTurn`, `CarrierLocation`, `BattleshipLocation`, `DestroyerLocation`, `SubmarineLocation`, `PatrolLocation`)";
$sql .= " VALUES ('" . $username . "', '0', '0', '" . $carrier . "', '" . $bship . "', '" . $destroyer . "', '" . $submarine . "', '" . $patrol . "')";

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
