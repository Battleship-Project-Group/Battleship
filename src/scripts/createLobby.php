<?php
$username = (isset($_POST['uname'])) ? $_POST['uname'] : "test";
$lobbyname = (isset($_POST['lobbyname'])) ? $_POST['lobbyname'] : $username . "-Lobby";
$servername = "localhost";
$dbusername = "BattleshipProjectUser";
$dbpass = "shipbattle321";
$dbname = "gamesdb";

$sql = "CREATE TABLE `" . $dbname . "`.`" . $lobbyname . "` ( `PlayerName` VARCHAR(255) NOT NULL , `ReadyStatus` BOOLEAN NOT NULL , `MyTurn` BOOLEAN NOT NULL , `CarrierLocation` VARCHAR(10) NULL DEFAULT NULL , `BattleshipLocation` VARCHAR(8) NULL DEFAULT NULL , `DestroyerLocation` VARCHAR(6) NULL DEFAULT NULL , `SubmarineLocation` VARCHAR(6) NULL DEFAULT NULL , `PatrolLocation` VARCHAR(4) NULL DEFAULT NULL , `LastTarget` VARCHAR(10) NULL DEFAULT NULL, `StartTime` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ) ENGINE = InnoDB;";

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
