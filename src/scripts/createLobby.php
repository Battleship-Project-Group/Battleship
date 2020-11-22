<?php
$username = (isset($_POST['uname'])) ? $_POST['uname'] : "test";
$lobbyname = (isset($_POST['lobbyname'])) ? $_POST['lobbyname'] : $username . "-Lobby";
$servername = "localhost";
$dbusername = "BattleshipProjectUser";
$dbpass = "shipbattle321";
$dbname = "gamesdb";

$sql = "CREATE TABLE `" . $dbname . "`.`" . $lobbyname . "` ( `PlayerName` VARCHAR(255) NOT NULL , `ReadyStatus` BOOLEAN NOT NULL , `MyTurn` BOOLEAN NOT NULL , `CarrierLocation` VARCHAR(10) NOT NULL , `BattleshipLocation` VARCHAR(8) NOT NULL , `DestroyerLocation` VARCHAR(6) NOT NULL , `SubmarineLocation` VARCHAR(6) NOT NULL , `PatrolLocation` VARCHAR(4) NOT NULL , `LastTarget` VARCHAR(2) NOT NULL ) ENGINE = InnoDB;";

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
