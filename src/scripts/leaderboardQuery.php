<?php
$sortBy = (isset($_POST['sortBy'])) ? $_POST['sortBy'] : "GAMESWON";
$order = (isset($_POST['order'])) ? $_POST['order'] : "DESC";
$servername = "localhost";
$dbusername = "BattleshipProjectUser";
$dbpass = "shipbattle321";
$dbname = "usersdb";

$sql = "SELECT `USERNAME`, `GAMESPLAYED`, `GAMESWON`, `TIMEPLAYED` FROM `users` ORDER BY `" . $sortBy . "` " . $order;
$conn = new mysqli($servername,$dbusername,$dbpass,$dbname);

if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

print "<table>";

$result = $conn->query($sql);
$row = $result->fetch_assoc();

print " <tr> ";
foreach ($row as $field => $value){
  print " <th>$field</th> ";
}
print " </tr> ";

$data = $conn->query($sql);

while ($row = $data->fetch_assoc()) {
  print " <tr> ";
  foreach ($row as $name=>$value) {
    print " <td>$value</td> ";
  }
  print " </tr> ";
}

?>
