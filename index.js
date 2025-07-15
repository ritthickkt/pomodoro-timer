const timerCompleteSound = new Audio('./timerdone.mp3');

const start = "S T A R T";
const pause = "P A U S E";
const twentyfiveMinute = "25:00";
const fiveMinute = "05:00";
const fiftyMinute = "50:00";
const tenMinute = "10:00";
const pomodoroTime = "pomodoro";
const breakTimeVar = "break" 

let timer = document.getElementById("timer");
let startstop = document.getElementById("startpause");
let circle = document.getElementById("mainbutton");
let clear = document.getElementById("clear");
let title = document.getElementById("title");
let settings = document.getElementById("settings");
let twentyfive = document.getElementById("25+5");
let fifty = document.getElementById("50+10");
let pomodoro = document.getElementById("pomodoro");
let breakPhase = document.getElementById("break");

let shortBreak = "00:00";
let firstTimer = "00:00";
timer.textContent = "00:00";
startstop.textContent = start;

let twentyfiveBoolean = false;
let fiftytenBoolean = false;

pomodoro.onclick = function(){
  title.textContent = pomodoroTime;

  if (twentyfiveBoolean) {
    timer.textContent = twentyfiveMinute;
    shortBreak = fiveMinute;
  } else if (fiftytenBoolean) {
    timer.textContent = fiftyMinute;
    shortBreak = tenMinute;
  }
  
  document.querySelector('.phase-indicator').classList.remove('break-active');
}

breakPhase.onclick = function(){
  title.textContent = breakTimeVar;

  if (twentyfiveBoolean) {
    timer.textContent = shortBreak;
  } else if (fiftytenBoolean) {
    timer.textContent = shortBreak;
  }

  document.querySelector('.phase-indicator').classList.add('break-active');
}

twentyfive.onclick = function() {
  title.textContent = pomodoroTime;
  timer.textContent = twentyfiveMinute;
  firstTimer = twentyfiveMinute;
  shortBreak = fiveMinute;
  
  twentyfiveBoolean = true;
  fiftytenBoolean = false;

  document.querySelector('.phase-indicator').classList.remove('break-active');
}

fifty.onclick = function() {
  timer.textContent = fiftyMinute;
  firstTimer = fiftyMinute;
  shortBreak = tenMinute;

  fiftytenBoolean = true;
  twentyfiveBoolean = false;

  document.querySelector('.phase-indicator').classList.remove('break-active');
}

clear.onclick = function() {
  if (title.textContent === pomodoroTime) {
    clearInterval(countdownInterval);
    timer.textContent = "00:00";
    startstop.textContent = start;
  } else if (title.textContent === breakTimeVar) {
    clearInterval(breakTimeCountDownInterval);
    timer.textContent = "00:00";
    startstop.textContent = start;
  }
}

circle.onclick = function() {
  if (startstop.textContent === start) {
    // Check if we're in break mode or pomodoro mode
    if (title.textContent === breakTimeVar) {
      // Resume break timer
      let timeText = timer.textContent;
      let [minutes, seconds] = timeText.split(':').map(Number);
      let breaktotalSeconds = (minutes * 60) + seconds;
      
      breakTimeCountDownInterval = setInterval(() => {
        if (breaktotalSeconds <= 0) {
          clearInterval(breakTimeCountDownInterval);
          timer.textContent = firstTimer;
          title.textContent = pomodoroTime;

          document.querySelector('.phase-indicator').classList.remove('break-active');

          startstop.textContent = start;
          return;
        }

        breaktotalSeconds--;

        let mins = Math.floor(breaktotalSeconds / 60);
        let secs = breaktotalSeconds % 60; 
        timer.textContent = `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;

      }, 1000);
    } else {
      // Normal pomodoro timer
      let timeText = timer.textContent;
      let [minutes, seconds] = timeText.split(':').map(Number);
      let totalSeconds = (minutes * 60) + seconds;

      countdownInterval = setInterval(() => {
        if (totalSeconds <= 0) {
          clearInterval(countdownInterval);

          timerCompleteSound.play().catch(error => {
            console.log('Could not play sound:', error);
          });

          breakTime();
          return;
        }

        totalSeconds--;

        let mins = Math.floor(totalSeconds / 60);
        let secs = totalSeconds % 60; 
        timer.textContent = `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;

      }, 1000);
    }

    startstop.textContent = pause;
  } else if (startstop.textContent === pause) {
    // Pause - clear the appropriate timer
    clearInterval(countdownInterval);
    clearInterval(breakTimeCountDownInterval);
    startstop.textContent = start;
  }
}


function breakTime() {
  title.textContent = breakTimeVar;
  timer.textContent = shortBreak;
  startstop.textContent = pause;
  
  document.querySelector('.phase-indicator').classList.add('break-active');

  let timeText = timer.textContent;
  let [minutes, seconds] = timeText.split(':').map(Number);

  let breaktotalSeconds = (minutes * 60) + seconds;
  breakTimeCountDownInterval = setInterval(() => {
    if (breaktotalSeconds <= 0) {
      clearInterval(breakTimeCountDownInterval);

      timerCompleteSound.play().catch(error => {
        console.log('Could not play sound:', error);
      });

      timer.textContent = firstTimer;
      title.textContent = pomodoroTime;

      document.querySelector('.phase-indicator').classList.remove('break-active');

      startstop.textContent = start;
      return;
    }

    breaktotalSeconds--;

    let mins = Math.floor(breaktotalSeconds / 60);
    let secs = breaktotalSeconds % 60; 
    timer.textContent = `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;

  }, 1000);
}



