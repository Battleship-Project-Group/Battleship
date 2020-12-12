function fetchEntries() {
  var sortBy = "";
  //Ascending (ASC) or Descending (DESC)
  var sortOrder = "";
  var tableDiv = document.getElementById('leaderboard');
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function() {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
      var response = xmlhttp.responseText;
      tableDiv.innerHTML = response;
    }
  }
  xmlhttp.open("POST", 'scripts/leaderboardQuery.php');
  xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  if (!sortBy || !sortOrder) {
    xmlhttp.send();
  } else {
    xmlhttp.send("sortBy=" + sortBy + "&order=" + sortOrder);
  }
}
