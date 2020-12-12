<?php
$username = (isset($_POST['uname'])) ? $_POST['uname'] : "";
$pass = (isset($_POST['pw'])) ? $_POST['pw'] : "";
$email = (isset($_POST['email'])) ? $_POST['email'] : "";
$servername = "localhost";
$dbusername = "BattleshipProjectUser";
$dbpass = "shipbattle321";
$dbname = "usersdb";
$tname = "users";
$sql = "INSERT INTO " . $tname . "
VALUES (NULL,'" . $username . "', '" . $email . "', MD5('" . $pass . "'), '0', '0', '00:00:00.000000')";

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
