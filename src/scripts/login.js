var httpRequest;

function login() {
  let username = document.getElementById('username').value;
  let password = document.getElementById('pw').value;
  httpRequest = new XMLHttpRequest();
  if (!httpRequest) {
    alert('Cannot create an XMLHTTP instance');
    return false;
  }
  httpRequest.onreadystatechange = function() {
    try {
      if (httpRequest.readyState == XMLHttpRequest.DONE) {
        if (httpRequest.status == 200) {
          var response = httpRequest.responseText;
          alert(response);
          if (response == "Success"){
            localStorage.username = username;
          }
        }
      }
    } catch (e) {
      console.log("Caught exception: " + e.description + ", while attempting to log in");
    }
  }
  httpRequest.open('POST','scripts/login.php');
  httpRequest.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  httpRequest.send('uname=' + username + '&pw=' + password);
}
