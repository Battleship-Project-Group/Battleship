<?php
$servername = "localhost";
$dbusername = "BattleshipProjectUser";
$dbpass = "shipbattle321";

$gamesDBSQL = "CREATE DATABASE gamesdb;";
$userDBSQL = "CREATE DATABASE usersdb;";
$userDBTableSQL = "CREATE TABLE `usersdb`.`users` ( `USERID` INT(12) UNSIGNED NOT NULL AUTO_INCREMENT , `USERNAME` VARCHAR(255) NULL DEFAULT NULL , `EMAIL` VARCHAR(255) NULL DEFAULT NULL , `PASSWORD` VARCHAR(255) NULL DEFAULT NULL , `GAMESPLAYED` INT(32) NULL DEFAULT '0' , `GAMESWON` INT(32) NULL DEFAULT '0' , `TIMEPLAYED` TIME NULL DEFAULT '0' , PRIMARY KEY (`USERID`)) ENGINE = InnoDB; ";

$conn = new mysqli($servername,$dbusername,$dbpass);

if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

if ($conn->query($gamesDBSQL) === TRUE) {
  if ($conn->query($userDBSQL) === TRUE) {
    if ($conn->query($userDBTableSQL) === TRUE) {
      $response = "Success";
    }
  } else {
    $response = "Failed to create database for users!";
  }
} else {
  $response = "Failed to create database for game lobbies!";
}

echo $response;

?>
