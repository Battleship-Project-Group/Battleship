//Board variables
var selectedShip = "";
var targetCell = "";
var targetCells = [];
var cellArr = [];
var cArr = [];
var pArr = [];
var dArr = [];
var bArr = [];
var sArr = [];
//Game variables
var username = "";
//Get username from local storage
if (localStorage.username) username = localStorage.username;
//Else redirect user to log-in page
else {
  //Comment this out for testing purposes
  alert("Please log-in before starting a game");
  window.location.href = "login.html";
  // username = ""; // If the above lines aren't commented, keep this commented
}
var lobbyname = "";
var inLobby = false; //Player has joined a game but session is not running yet
var ongoing = false; //Game is in session, both players ready, taking turns
var myTurn = false; //Bool for player's turn
var enemy = ""; //Enemy name
var enemyLastTurn = "";
var playerReady = false;
var enemyReady = false;
var victory;
var playerShips = 5;
var enemyShips = 5;
var superattuse = false;

var startTime;
var timeI;
var updatedTime;
var savedTime;
var difference;
var running = false;
