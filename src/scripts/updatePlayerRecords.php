<?php

$username = (isset($_POST['uname'])) ? $_POST['uname'] : "test";
$time = (isset($_POST['time'])) ? $_POST['time'] : "00:00:00";
$wasWinner = (isset($_POST['win'])) ? $_POST['win'] : "False";
$servername = "localhost";
$dbusername = "BattleshipProjectUser";
$dbpass = "shipbattle321";
$dbname = "usersdb";
$tbname = "user2";

$conn = new mysqli($servername,$dbusername,$dbpass,$dbname);

if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

$sql = "SELECT * FROM `" . $tbname . "` WHERE `USERNAME`='" . $username . "'";

$tmp = $conn->query($sql);
if ($tmp->num_rows == 1) {
  //Get old data
  $entry = $tmp->fetch_assoc();
  $previousTime = $entry["TIMEPLAYED"];
  $gamesCount = $entry["GAMESPLAYED"];
  //Update old data
  $gamesCount += 1;
  $winCount = $entry["GAMESWON"];
  if ($wasWinner == "True") {
    $winCount += 1;
  }
  //Send updated data to table
  $timeSum = "ADDTIME('" . $previousTime . "','" . $time . "')";
  $sql = "UPDATE `" . $tbname . "` SET `GAMESPLAYED`='" . $gamesCount . "',`GAMESWON`='" . $winCount . "',`TIMEPLAYED`=" . $timeSum . " WHERE `USERNAME`='" . $username . "'";

  //Log whether or not queries were successful
  if ($conn->query($sql) === TRUE) {
    $response = "Success";
  } else {
    $response = "Failure";
  }
} else {
  $response = "Failure";
}

$conn->close();

echo $response;

?>
