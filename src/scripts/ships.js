function selectShip(ship) {
  document.getElementById("patrol").style.border = "none";
  document.getElementById("sub").style.border = "none";
  document.getElementById("destroyer").style.border = "none";
  document.getElementById("battleship").style.border = "none";
  document.getElementById("carrier").style.border = "none";
  selectedShip = ship;
  document.getElementById(ship).style.border = "3px solid black";
}

function add2Arr(cell) {
  cellArr.push(cell);
  document.getElementById(cell).style.backgroundColor = "white";
}

function verifyAdj() {
  let valid = false;
  let letter = "";
  let number = "";
  var table = document.getElementById("player-table")
  for (let i = 0; i < cellArr.length - 1; i++) {
    valid = false;
    if (cellArr[i].includes("A")) {
      letter = 1;
    } else if (cellArr[i].includes("B")) {
      letter = 2;
    } else if (cellArr[i].includes("C")) {
      letter = 3;
    } else if (cellArr[i].includes("D")) {
      letter = 4;
    } else if (cellArr[i].includes("E")) {
      letter = 5;
    } else if (cellArr[i].includes("F")) {
      letter = 6;
    } else if (cellArr[i].includes("G")) {
      letter = 7;
    } else if (cellArr[i].includes("H")) {
      letter = 8;
    } else if (cellArr[i].includes("I")) {
      letter = 9;
    } else if (cellArr[i].includes("J")) {
      letter = 10;
    } else {
      return false;
    }

    if (cellArr[i].includes("0")) {
      number = 0;
    } else if (cellArr[i].includes("1")) {
      number = 1;
    } else if (cellArr[i].includes("2")) {
      number = 2;
    } else if (cellArr[i].includes("3")) {
      number = 3;
    } else if (cellArr[i].includes("4")) {
      number = 4;
    } else if (cellArr[i].includes("5")) {
      number = 5;
    } else if (cellArr[i].includes("6")) {
      number = 6;
    } else if (cellArr[i].includes("7")) {
      number = 7;
    } else if (cellArr[i].includes("8")) {
      number = 8;
    } else if (cellArr[i].includes("9")) {
      number = 9;
    } else {
      return false;
    }

    console.log("Checking adj of " + cellArr[i + 1] + " with " + cellArr[i] + ": (" + letter + ", " + number + ")");

    switch (letter) {
      case 1: // my-A#
        switch (true) { // my-A0, my-A9, my-A1..my-A8
          case ((number === 0) && ((cellArr[i + 1] === "my-A1") || (cellArr[i + 1] === "my-B0"))):
            valid = true;
            console.log(cellArr[i + 1] + " valid");
            break;
          case ((number === 9) && ((cellArr[i + 1] === "my-A8") || (cellArr[i + 1] === "my-B9"))):
            valid = true;
            console.log(cellArr[i + 1] + " valid");
            break;
          case (((cellArr[i + 1] == "my-A" + String(number + 1)) || (cellArr[i + 1] == "my-A" + String(number - 1)) || (cellArr[i + 1] == "my-B" + number))):
            valid = true;
            console.log(cellArr[i + 1] + " valid");
            break;
          default:
            console.log(cellArr[i + 1] + " invalid");
            return false;
        }
        break;
      case 2: // my-B#
        switch (true) { // my-B0, my-B9, my-B1..my-B8
          case ((number === 0) && ((cellArr[i + 1] == "my-A0") || (cellArr[i + 1] == "my-C0") || (cellArr[i + 1] == "my-B1"))):
            valid = true;
            console.log(cellArr[i + 1] + " valid");
            break;
          case ((number === 9) && ((cellArr[i + 1] == "my-A9") || (cellArr[i + 1] == "my-C9") || (cellArr[i + 1] == "my-B8"))):
            valid = true;
            console.log(cellArr[i + 1] + " valid");
            break;
          case ((cellArr[i + 1] == "my-B" + String(number + 1)) || (cellArr[i + 1] == "my-B" + String(number - 1)) || (cellArr[i + 1] == "my-A" + number) || (cellArr[i + 1] == "my-C" + number)):
            valid = true;
            console.log(cellArr[i + 1] + " valid");
            break;
          default:
            console.log(cellArr[i + 1] + " invalid");
            return false;
        }
        break;
      case 3: // my-C#
        switch (true) { // my-C0, my-C9, my-C1..my-C8
          case ((number === 0) && ((cellArr[i + 1] == "my-B0") || (cellArr[i + 1] == "my-D0") || (cellArr[i + 1] == "my-C1"))):
            valid = true;
            console.log(cellArr[i + 1] + " valid");
            break;
          case ((number === 9) && ((cellArr[i + 1] == "my-B9") || (cellArr[i + 1] == "my-D9") || (cellArr[i + 1] == "my-C8"))):
            valid = true;
            console.log(cellArr[i + 1] + " valid");
            break;
          case ((cellArr[i + 1] == "my-C" + String(number + 1)) || (cellArr[i + 1] == "my-C" + String(number - 1)) || (cellArr[i + 1] == "my-B" + number) || (cellArr[i + 1] == "my-D" + number)):
            valid = true;
            console.log(cellArr[i + 1] + " valid");
            break;
          default:
            console.log(cellArr[i + 1] + " invalid");
            return false;
        }
        break;
      case 4: // my-D#
        switch (true) { // my-D0, my-D9, my-D1..my-D8
          case ((number === 0) && ((cellArr[i + 1] == "my-C0") || (cellArr[i + 1] == "my-E0") || (cellArr[i + 1] == "my-D1"))):
            valid = true;
            console.log(cellArr[i + 1] + " valid");
            break;
          case ((number === 9) && ((cellArr[i + 1] == "my-C9") || (cellArr[i + 1] == "my-E9") || (cellArr[i + 1] == "my-D8"))):
            valid = true;
            console.log(cellArr[i + 1] + " valid");
            break;
          case ((cellArr[i + 1] == "my-D" + String(number + 1)) || (cellArr[i + 1] == "my-D" + String(number - 1)) || (cellArr[i + 1] == "my-C" + number) || (cellArr[i + 1] == "my-E" + number)):
            valid = true;
            console.log(cellArr[i + 1] + " valid");
            break;
          default:
            console.log(cellArr[i + 1] + " invalid");
            return false;
        }
        break;
      case 5: // my-E#
        switch (true) { // my-E0, my-E9, my-E1..my-E8
          case ((number === 0) && ((cellArr[i + 1] == "my-D0") || (cellArr[i + 1] == "my-F0") || (cellArr[i + 1] == "my-E1"))):
            valid = true;
            console.log(cellArr[i + 1] + " valid");
            break;
          case ((number === 9) && ((cellArr[i + 1] == "my-D9") || (cellArr[i + 1] == "my-F9") || (cellArr[i + 1] == "my-E8"))):
            valid = true;
            console.log(cellArr[i + 1] + " valid");
            break;
          case ((cellArr[i + 1] == "my-E" + String(number + 1)) || (cellArr[i + 1] == "my-E" + String(number - 1)) || (cellArr[i + 1] == "my-D" + number) || (cellArr[i + 1] == "my-F" + number)):
            valid = true;
            console.log(cellArr[i + 1] + " valid");
            break;
          default:
            console.log(cellArr[i + 1] + " invalid");
            return false;
        }
        break;
      case 6: // my-F#
        switch (true) { // my-F0, my-F9, my-F1..my-F8
          case ((number === 0) && ((cellArr[i + 1] == "my-E0") || (cellArr[i + 1] == "my-G0") || (cellArr[i + 1] == "my-F1"))):
            valid = true;
            console.log(cellArr[i + 1] + " valid");
            break;
          case ((number === 9) && ((cellArr[i + 1] == "my-E9") || (cellArr[i + 1] == "my-G9") || (cellArr[i + 1] == "my-F8"))):
            valid = true;
            console.log(cellArr[i + 1] + " valid");
            break;
          case ((cellArr[i + 1] == "my-F" + String(number + 1)) || (cellArr[i + 1] == "my-F" + String(number - 1)) || (cellArr[i + 1] == "my-E" + number) || (cellArr[i + 1] == "my-G" + number)):
            valid = true;
            console.log(cellArr[i + 1] + " valid");
            break;
          default:
            console.log(cellArr[i + 1] + " invalid");
            return false;
        }
        break;
      case 7: // my-G#
        switch (true) { // my-G0, my-G9, my-G1..my-G8
          case ((number === 0) && ((cellArr[i + 1] == "my-F0") || (cellArr[i + 1] == "my-H0") || (cellArr[i + 1] == "my-G1"))):
            valid = true;
            console.log(cellArr[i + 1] + " valid");
            break;
          case ((number === 9) && ((cellArr[i + 1] == "my-F9") || (cellArr[i + 1] == "my-H9") || (cellArr[i + 1] == "my-G8"))):
            valid = true;
            console.log(cellArr[i + 1] + " valid");
            break;
          case ((cellArr[i + 1] == "my-G" + String(number + 1)) || (cellArr[i + 1] == "my-G" + String(number - 1)) || (cellArr[i + 1] == "my-F" + number) || (cellArr[i + 1] == "my-H" + number)):
            valid = true;
            console.log(cellArr[i + 1] + " valid");
            break;
          default:
            console.log(cellArr[i + 1] + " invalid");
            return false;
        }
        break;
      case 8: // my-H#
        switch (true) { // my-H0, my-H9, my-H1..my-H8
          case ((number === 0) && ((cellArr[i + 1] == "my-G0") || (cellArr[i + 1] == "my-I0") || (cellArr[i + 1] == "my-H1"))):
            valid = true;
            console.log(cellArr[i + 1] + " valid");
            break;
          case ((number === 9) && ((cellArr[i + 1] == "my-G9") || (cellArr[i + 1] == "my-I9") || (cellArr[i + 1] == "my-H8"))):
            valid = true;
            console.log(cellArr[i + 1] + " valid");
            break;
          case ((cellArr[i + 1] == "my-H" + String(number + 1)) || (cellArr[i + 1] == "my-H" + String(number - 1)) || (cellArr[i + 1] == "my-G" + number) || (cellArr[i + 1] == "my-I" + number)):
            valid = true;
            console.log(cellArr[i + 1] + " valid");
            break;
          default:
            console.log(cellArr[i + 1] + " invalid");
            return false;
        }
        break;
      case 9: // my-I#
        switch (true) { // my-I0, my-I9, my-I1..my-I8
          case ((number === 0) && ((cellArr[i + 1] == "my-H0") || (cellArr[i + 1] == "my-J0") || (cellArr[i + 1] == "my-I1"))):
            valid = true;
            console.log(cellArr[i + 1] + " valid");
            break;
          case ((number === 9) && ((cellArr[i + 1] == "my-H9") || (cellArr[i + 1] == "my-J9") || (cellArr[i + 1] == "my-I8"))):
            valid = true;
            console.log(cellArr[i + 1] + " valid");
            break;
          case ((cellArr[i + 1] == "my-I" + String(number + 1)) || (cellArr[i + 1] == "my-I" + String(number - 1)) || (cellArr[i + 1] == "my-H" + number) || (cellArr[i + 1] == "my-J" + number)):
            valid = true;
            console.log(cellArr[i + 1] + " valid");
            break;
          default:
            console.log(cellArr[i + 1] + " invalid");
            return false;
        }
        break;
      case 10: // my-J#
        switch (true) { // my-J0, my-J9, my-J1..my-J8
          case ((number === 0) && ((cellArr[i + 1] === "my-J1") || (cellArr[i + 1] === "my-I0"))):
            valid = true;
            console.log(cellArr[i + 1] + " valid");
            break;
          case ((number === 9) && ((cellArr[i + 1] === "my-J8") || (cellArr[i + 1] === "my-I9"))):
            valid = true;
            console.log(cellArr[i + 1] + " valid");
            break;
          case (((cellArr[i + 1] == "my-J" + String(number + 1)) || (cellArr[i + 1] == "my-J" + String(number - 1)) || (cellArr[i + 1] == "my-J" + number))):
            valid = true;
            console.log(cellArr[i + 1] + " valid");
            break;
          default:
            console.log(cellArr[i + 1] + " invalid");
            return false;
        }
        break;
    }
  }
  return valid;
}

function placeShip() {
  if (selectedShip != "" && cellArr.length >= 2 && cellArr.length <= 5) {
    let adj = verifyAdj();
    if (selectedShip == "patrol" && cellArr.length == 2 && adj) {
      for (let i = 0; i < cellArr.length; i++) {
        document.getElementById(cellArr[i]).innerHTML = "P";
        document.getElementById(cellArr[i]).style.backgroundColor = "#c41230";
        pArr.push(cellArr[i]);
        //cellArr.delete(i);
      }
      document.getElementById("patrol").style.visibility = "hidden";
    } else if (selectedShip == "sub" && cellArr.length == 3 && adj) {
      for (let i = 0; i < cellArr.length; i++) {
        document.getElementById(cellArr[i]).innerHTML = "S";
        document.getElementById(cellArr[i]).style.backgroundColor = "#c41230";
        sArr.push(cellArr[i]);
        //cellArr.delete(i);
      }
      document.getElementById("sub").style.visibility = "hidden";
    } else if (selectedShip = "destroyer" && cellArr.length == 3 && adj) {
      for (let i = 0; i < cellArr.length; i++) {
        document.getElementById(cellArr[i]).innerHTML = "D";
        document.getElementById(cellArr[i]).style.backgroundColor = "#c41230";
        dArr.push(cellArr[i]);
        //cellArr.delete(i);
      }
      document.getElementById("destroyer").style.visibility = "hidden";
    } else if (selectedShip = "battleship" && cellArr.length == 4 && adj) {
      for (let i = 0; i < cellArr.length; i++) {
        document.getElementById(cellArr[i]).innerHTML = "B";
        document.getElementById(cellArr[i]).style.backgroundColor = "#c41230";
        bArr.push(cellArr[i]);
        //cellArr.delete(i);
      }
      document.getElementById("battleship").style.visibility = "hidden";
    } else if (selectedShip = "carrier" && cellArr.length == 5 && adj) {
      for (let i = 0; i < cellArr.length; i++) {
        document.getElementById(cellArr[i]).innerHTML = "C";
        document.getElementById(cellArr[i]).style.backgroundColor = "#c41230";
        cArr.push(cellArr[i]);
        //cellArr.delete(i);
      }
      document.getElementById("carrier").style.visibility = "hidden";
    } else {
      alert("Error: Check selected cells and ship. Selected cells must equal ship length.");
      for (let i = 0; i < cellArr.length; i++) {
        document.getElementById(cellArr[i]).style.backgroundColor = "#c41230";
      }
    }
  } else {
    alert("Error: Check selected cells and ship. Selected cells must equal ship length.");
    for (let i = 0; i < cellArr.length; i++) {
      document.getElementById(cellArr[i]).style.backgroundColor = "#c41230";
    }
  }
  selectedShip = "";
  cellArr = [];
}

function postShips() {
  if (pArr.length == 2 && sArr.length == 3 && dArr.length == 3 && bArr.length == 4 && cArr.length == 5) {
    document.getElementById("ships").style.display = "hidden";
    var pArr_str = String(pArr[0].slice(3) + pArr[1].slice(3));
    var sArr_str = String(sArr[0].slice(3) + sArr[1].slice(3) + sArr[2].slice(3));
    var dArr_str = String(dArr[0].slice(3) + dArr[1].slice(3) + dArr[2].slice(3));
    var bArr_str = String(bArr[0].slice(3) + bArr[1].slice(3) + bArr[2].slice(3) + bArr[3].slice(3));
    var cArr_str = String(cArr[0].slice(3) + cArr[1].slice(3) + cArr[2].slice(3) + cArr[3].slice(3) + cArr[4].slice(3));
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
    xmlhttp.send("uname=" + username + "&lobbyname=" + lobbyname + "&carrier=" + cArr_str + "&battleship=" + bArr_str + "&destroyer=" + dArr_str + "&submarine=" + sArr_str + "&patrolboat=" + pArr_str);
    return true;
  } else {
    alert("Have all ships been placed?");
    return false;
  }
}
