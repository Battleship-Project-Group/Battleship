function startTimer() {
  if (!running) {
    running = true;
    startTime = new Date().getTime();
    timeI = setInterval(getShowTime, 1);
  }
}

function getShowTime() {
  updatedTime = new Date().getTime();
  if (savedTime) {
    difference = (updatedTime - startTime) + savedTime;
  } else {
    difference = updatedTime - startTime;
  }
  var hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((difference % (1000 * 60)) / 1000);

  hours = (hours < 10) ? "0" + hours : hours;
  minutes = (minutes < 10) ? "0" + minutes : minutes;
  seconds = (seconds < 10) ? "0" + seconds : seconds;
  document.getElementById("timer").innerHTML = hours + ':' + minutes + ':' + seconds;
}

function stopTimer() {
  clearInterval(timeI);
  savedTime = difference;
  running = false;
}
