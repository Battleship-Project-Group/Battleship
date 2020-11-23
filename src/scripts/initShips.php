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

$sql = "UPDATE `" . $lobbyname . "` SET `CarrierLocation`=" . $carrier . ",`BattleshipLocation`=" . $bship . ",`DestroyerLocation`=" . $destroyer . ",`SubmarineLocation`=" . $submarine . ",`PatrolLocation`=" . $patrol;
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
