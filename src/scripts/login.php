<?php
$username = (isset($_POST['uname'])) ? $_POST['uname'] : "";
$pass = (isset($_POST['pw'])) ? $_POST['pw'] : "";
$servername = "localhost";
$dbusername = "BattleshipProjectUser";
$dbpass = "shipbattle321";
$dbname = "usersdb";
$tname = "users";
$sql = "SELECT * FROM " . $tname . " WHERE USERNAME='" . $username . "' AND PASSWORD=(MD5('" . $pass . "'));";

$conn = new mysqli($servername,$dbusername,$dbpass,$dbname);

if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

$result = $conn->query($sql);
if ($result->num_rows == 1) {
  while ($row = $result->fetch_assoc()) {
    $response = "Success";
  }
} else {
  $response = "Failure";
}

$conn->close();

echo ($response);
?>
