//Used as a sort of sleep() function
const sleepFor = (delay) => new Promise((resolve) => setTimeout(resolve, delay))

function setActivePlayer(name) {
  if (name == username) {
    myTurn = true;
    alert("Your turn");
    document.getElementById("player_name").style.border = "3px solid black";
    document.getElementById("enemy_name").style.border = "none";
  } else {
    myTurn = false;
    document.getElementById("enemy_name").style.border = "3px solid black";
    document.getElementById("player_name").style.border = "none";
    alert("Waiting for other player to take their turn: " + enemy);
    wasHit(name);
  }
}

//Retrieves lastTarget from specified user in game table then checks if it hit against the other user
//Can be used to see if we landed an attack or if an attack hit us, username is source of attack
function wasHit(name) {
  var xmlhttp = new XMLHttpRequest();
  var url = "./scripts/isHit.php";
  if (name != username) url = "./scripts/isHitWithUpdate.php";
  xmlhttp.onreadystatechange = async function() {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
      var response = JSON.parse(xmlhttp.responseText);
      if (response["Result"] == "Success") {
        //Variables pulled from php
        var target;
        if (response["targetString"] != "ERROR") target = response["targetString"];
        var shipDestroyedAmount = response["shipDestroyedAmount"];
        var hitArr = response["hitLocations"];
        var missArr = response["missLocations"];

        if (name != username) { //Attack source: enemy player
          if (target != enemyLastTurn && target != null) { //Enemy has taken their turn
            // Update board if player was hit here or where the miss is
            for (let i = 0; i < hitArr.length; i++) {
              document.getElementById("my-" + hitArr[i]).innerHTML = "X";
              console.log("Hit at (" + hitArr[i] + ") player side");
            }
            for (let i = 0; i < missArr.length; i++) {
              document.getElementById("my-" + missArr[i]).innerHTML = "O";
              console.log("Miss at (" + missArr[i] + ") player side");
            }

            playerShips -= response["shipDestroyedAmount"];
            document.getElementById("player_ships").innerHTML = playerShips + " ships remaining";
            if (playerShips == 0) {
              endgame(0);
            }
            enemyLastTurn = target;
            if (ongoing) { setActivePlayer(username); }
          } else { //Still waiting on enemy to take their turn
            await sleepFor(5000);
            wasHit(name);
          }
        } else { //Attack source: current player
          // Update board if enemy was hit here or where the miss is
          alert(hitArr.length + " hits!");
          for (let i = 0; i < hitArr.length; i++) {
            document.getElementById("enemy-" + hitArr[i]).innerHTML = "X";
            console.log("Hit at (" + hitArr[i] + ") enemy side");
          }
          for (let i = 0; i < missArr.length; i++) {
            document.getElementById("enemy-" + missArr[i]).innerHTML = "O";
            console.log("Miss at (" + missArr[i] + ") enemy side");
          }
          enemyShips -= response["shipDestroyedAmount"];
          document.getElementById("enemy_ships").innerHTML = enemyShips + " ships remaining";
          if (enemyShips == 0) { endgame(1); }
          if (ongoing) { setActivePlayer(enemy); }
        }
      } else {
        alert("An error occurred: " + response["Result"]);
      }
    }
  };
  xmlhttp.open("POST", url, true);
  xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xmlhttp.send("uname=" + name + "&lobbyname=" + lobbyname);
}

function attCell(cell) {
  if (ongoing && myTurn) {
    if (targetCell != "") {
      if (!(document.getElementById(targetCell).innerHTML == "X" || document.getElementById(targetCell).innerHTML == "O")) {
        document.getElementById(targetCell).innerHTML = "";
      }
    }
    targetCell = cell;
    document.getElementById(targetCell).innerHTML = "?";

    switch (targetCells.length) {
      case 0:
        targetCells.push(cell);
        break;
      case 1:
        targetCells.push(cell);
        break;
      case 2:
        targetCells.push(cell);
        break;
      default:
        targetCells.shift();
        targetCells.push(cell);
        break;
    }
  }
}

//Updates lastTarget in game table
//Then calls wasHit() to see if the attack was successful
function tempAttack(superatt) {
  if ((targetCell != "") && (document.getElementById(targetCell).innerHTML != "X") && (document.getElementById(targetCell).innerHTML != "O")) {
    var targets = "";
    switch (superatt) {
      case 0: //Regular Attack, 1 tile selection
        targets = targetCell.slice(6);
        break;
      case 1: //3-Hit Attack, 3 tile selection
        if ((superattuse == false) && (playerShips <= 2)) {
          targets = targetCells[0].slice(6);
          targets += targetCells[1].slice(6);
          targets += targetCells[2].slice(6);
          superattuse = true;
        } else {
          targets = targetCell.slice(6);
        }
        break;
      case 2: //Super Attack, 1 tile selection with neighboring tiles hit (cross)
        if ((superattuse == false) && (playerShips <= 2)) {
          targets = targetCell.slice(6);
          var letter = targetCell.slice(6, 7);
          var number = targetCell.slice(7);
          if (Number(number) + 1 != 10) {
            targets += letter + String(Number(number) + 1);
          }
          if (Number(number) - 1 != -1) {
            targets += letter + String(Number(number) - 1);
          }
          switch (letter) {
            case 'A':
              targets += "B" + number;
              break;
            case 'B':
              targets += "A" + number;
              targets += "C" + number;
              break;
            case 'C':
              targets += "B" + number;
              targets += "D" + number;
              break;
            case 'D':
              targets += "C" + number;
              targets += "E" + number;
              break;
            case 'E':
              targets += "D" + number;
              targets += "F" + number;
              break;
            case 'F':
              targets += "E" + number;
              targets += "G" + number;
              break;
            case 'G':
              targets += "F" + number;
              targets += "H" + number;
              break;
            case 'H':
              targets += "G" + number;
              targets += "I" + number;
              break;
            case 'I':
              targets += "H" + number;
              targets += "J" + number;
              break;
            case 'J':
              targets += "I" + number;
              break;
          }
          superattuse = true;
          document.getElementById("s-attack-button1").style.display = "none";
          document.getElementById("s-attack-button2").style.display = "none";
        } else {
          targets = targetCell.slice(6);
        }
        break;
        /*
        case 3: // Purely for debugging purposes; will break the game for the enemy
          enemyShips = 0;
          endgame(1);
          break;
        */
    }
    var xmlhttp = new XMLHttpRequest();
    var url = "./scripts/attack.php";
    xmlhttp.onreadystatechange = function() {
      if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
        var response = xmlhttp.responseText;
        if (response == "Success") {
          wasHit(username); //Check if player hit anything
        } else {
          alert(response);
        }
      }
    };
    xmlhttp.open("POST", url, true);
    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlhttp.send("uname=" + username + "&lobbyname=" + lobbyname + "&targets=" + targets);
  } else {
    alert("Your attack didn't go through!");
  }
}

//Used to set username, for testing purposes only
//Otherwise username should come from login
function tempUpdateUsername() {
  input = prompt("Username: ");
  if (input) {
    this.username = input;
    console.log("username updated to: ", this.username);
  }
}

function tempShips() {
  cellArr = ["my-E7", "my-F7", "my-G7", "my-H7", "my-I7"];
  selectedShip = "carrier";
  placeShip();
  cellArr = ["my-A1", "my-B1"];
  selectedShip = "patrol";
  placeShip();
  cellArr = ["my-I3", "my-I4", "my-I5"];
  selectedShip = "destroyer";
  placeShip();
  cellArr = ["my-C9", "my-D9", "my-E9", "my-F9"];
  selectedShip = "battleship";
  placeShip();
  cellArr = ["my-D3", "my-E3", "my-F3"];
  selectedShip = "sub";
  placeShip();
  var xmlhttp = new XMLHttpRequest();
  var url = "./scripts/initShips.php";
  xmlhttp.onreadystatechange = function() {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
      var response = xmlhttp.responseText;
      alert(response);
    }
  };
  xmlhttp.open("POST", url, true);
  xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xmlhttp.send("uname=" + username + "&lobbyname=" + lobbyname);
}

function startGame() {
  //createLobby.php, send username(required) and lobbyname (not required)
  input = prompt("Lobby Name: ");
  if (input) {
    var xmlhttp = new XMLHttpRequest();
    var url = "./scripts/createLobby.php";
    xmlhttp.onreadystatechange = function() {
      if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
        var response = xmlhttp.responseText;
        if (response == "Success") {
          joinGame(input);
          ongoing = true;
        } else {
          alert(response + ", lobby may already exist");
        }
      }
    };
    xmlhttp.open("POST", url, true);
    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlhttp.send("uname=" + username + "&lobbyname=" + input);
  }
}

function joinGamePrompt() {
  //initPlayer.php, send username(required), lobbyname (required), and ship locations as strings
  input = prompt("Lobby Name: ");
  if (input) {
    var xmlhttp = new XMLHttpRequest();
    var url = "./scripts/initPlayer.php";
    xmlhttp.onreadystatechange = function() {
      if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
        var response = xmlhttp.responseText;
        alert(response);
        if (response == "Success") {
          inLobby = true;
          lobbyname = input;
        }
      }
    };
    xmlhttp.open("POST", url, true);
    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlhttp.send("uname=" + username + "&lobbyname=" + input);
  }
}

function joinGame(lobby) {
  //initPlayer.php, send username(required), lobbyname (required), and ship locations as strings
  var xmlhttp = new XMLHttpRequest();
  var url = "./scripts/initPlayer.php";
  xmlhttp.onreadystatechange = function() {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
      var response = xmlhttp.responseText;
      alert(response);
      if (response == "Success") {
        inLobby = true;
        lobbyname = lobby;
      }
    }
  };
  xmlhttp.open("POST", url, true);
  xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xmlhttp.send("uname=" + username + "&lobbyname=" + lobby);
}

function readyUp() {
  //readySet.php, send username(required), lobbyname (not required), and readyStatus (defaults to True if not specified)
  if (postShips()) {
    var xmlhttp = new XMLHttpRequest();
    var url = "./scripts/readySet.php";
    xmlhttp.onreadystatechange = async function() {
      if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
        var response = JSON.parse(xmlhttp.responseText);
        if (response["Result"] == "Success") {
          enemyReady = response["playersReady"];
          if (!playerReady && !enemyReady) {
            alert("Waiting for other player to ready up...");
          }
          playerReady = true; //Used to send above alert only once
          if (enemyReady) {
            alert("Game started");
            startTimer();
            enemyReady = true;
            ongoing = true;
            if (response["p1"] == username) {
              enemy = response["p2"];
            } else {
              enemy = response["p1"];
            }
            document.getElementById("player_name").innerHTML = username;
            document.getElementById("enemy_name").innerHTML = enemy;
            disableButtons();
            setActivePlayer(response["firstPlayer"]);
          } else {
            //Wait 0.5s, then call again to see if enemy has readied up since then
            await sleepFor(500);
            readyUp();
          }
        }
      }
    };
    xmlhttp.open("POST", url, true);
    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlhttp.send("uname=" + username + "&lobbyname=" + lobbyname);
  }
}

function readyUpSet(b) {
  //readySet.php, send username(required), lobbyname (not required), and readyStatus (defaults to True if not specified)
  var xmlhttp = new XMLHttpRequest();
  var url = "./scripts/readySet.php";
  xmlhttp.onreadystatechange = function() {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
      var response = xmlhttp.responseText;
      alert(response);
    }
  };
  xmlhttp.open("POST", url, true);
  xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  if (b) {
    xmlhttp.send("uname=" + username + "&lobbyname=" + lobbyname + "&ready=True");
  } else {
    xmlhttp.send("uname=" + username + "&lobbyname=" + lobbyname + "&ready=False");
  }
}

function endgame(result) {
  var finalTime = document.getElementById('timer').innerHTML;
  switch (result) {
    case 0:
      alert("You lose!");
      victory = false;
      break;
    case 1:
      alert("You win!");
      victory = true;
      break;
  }
  ongoing = false;
  stopTimer();
  document.getElementById("attack-button").style.display = "none";
  var xmlhttp = new XMLHttpRequest();
  var url = "./scripts/updatePlayerRecords.php";
  xmlhttp.onreadystatechange = function() {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
      var response = xmlhttp.responseText;
      alert(response);
    }
  };
  xmlhttp.open("POST", url, true);
  xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xmlhttp.send("uname=" + username + "&time=" + finalTime + "&win=" + victory);
}

function disableButtons() {
  document.getElementById("ships").style.display = "none";
  document.getElementById("game-buttons").style.display = "none";
  //document.getElementById("username-button").style.display = "none";
  //document.getElementById("default-ships-button").style.display = "none";
}
