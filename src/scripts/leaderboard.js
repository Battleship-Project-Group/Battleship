function fetchEntries() {
  var selection = document.getElementById('sort-select').value;
  var selections = selection.split('-');
  var sortBy = selections[0];
  var sortOrder = selections[1];

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
  xmlhttp.send("sortBy=" + sortBy + "&order=" + sortOrder);
}
