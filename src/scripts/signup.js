var httpRequest;
var validEmail = false;
var validPassword = false;
var matchingEmail = false;
var matchingPassword = false;

function validatePassword() {
  //code this later, for now return true always
  validPassword = true;
  canSubmit();
}

function validateEmail() {
  //code this later, for now return true always
  validEmail = true;
  canSubmit();
}

function pwMatch() {
  let pw1 = document.getElementById('password').value;
  let pw2 = document.getElementById('cpassword').value;
  if (pw1 == pw2){
    matchingPassword = true;
  } else {
    matchingPassword = false;
  }
  canSubmit();
}

function emailMatch() {
  let e1 = document.getElementById('email').value;
  let e2 = document.getElementById('cemail').value;
  if (e1 == e2){
    matchingEmail = true;
  } else {
    matchingEmail = false;
  }
  canSubmit();
}

function canSubmit() {
  console.log("canSubmit() call", validEmail, validPassword, matchingEmail, matchingPassword);
  if (validEmail && validPassword && matchingEmail && matchingPassword){
    showSubmit();
    return true;
  } else {
    hideSubmit();
    return false;
  }
}

function hideSubmit() {
  let button = document.getElementById('signup');
  button.disabled = true;
}

function showSubmit() {
  let button = document.getElementById('signup');
  button.disabled = false;
}

function submit() {
  let username = document.getElementById('username').value;
  let password = document.getElementById('password').value;
  let email = document.getElementById('email').value;
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
          if (response == "Success") {
            window.location.href = "login.html";
          }
        }
      }
    } catch (e) {
      console.log("Caught exception: " + e.description + ", while attempting to register");
    }
  }
  httpRequest.open('POST','scripts/signup.php');
  httpRequest.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  httpRequest.send('uname=' + username + '&pw=' + password + '&email=' + email);
}
