var timerData;
var currentTimeSet;
var updater;

const timerEl = document.getElementById("Timer");
const btnStart = document.getElementById("start-timer-btn");
const btnStop = document.getElementById("stop-timer-btn");
const btnReset = document.getElementById("reset-timer-btn");

const hoursCount = document.getElementById("hours-count");
const minutesCount = document.getElementById("minutes-count");
const secondsCount = document.getElementById("seconds-count");

const alert_sound = new Audio("resources/digital-clock-alarm.mp3");
alert_sound.loop = true;

function increment(id) {
    const el = document.getElementById(id);
    const current = parseInt(el.value);

    console.log(el.value);

    const max = parseInt(el.getAttribute("max"));
    const min = parseInt(el.getAttribute("min"));

    if (current + 1 <= max) {
        if (current + 1 <= 9) {
            el.value = "0" + (current + 1).toString();
        } else {
            el.value = (current + 1).toString();
        }
    } else {
        el.value = "0" + min.toString();
    }
}

function decrement(id) {
    const el = document.getElementById(id);
    const current = parseInt(el.value);

    const max = parseInt(el.getAttribute("max"));
    const min = parseInt(el.getAttribute("min"));

    if (current - 1 >= min) {
        if (current - 1 <= 9) {
            el.value = "0" + (current - 1).toString();
        } else {
            el.value = (current - 1).toString();
        }
    } else {
        el.value = max;
    }
}

function start() {
    const [hoursTxt, minutesTxt, secondsTxt] = [hoursCount.value, minutesCount.value, secondsCount.value];

    btnReset.style.display = "none";
    btnStart.style.display = "none";
    btnStop.style.display = "block";
    timerEl.style.pointerEvents = "none";

    const hours = parseInt(hoursTxt);
    const minutes = parseInt(minutesTxt);
    const seconds = parseInt(secondsTxt);

    currentTimeSet = {
        hours,
        minutes,
        seconds
    };

    timerData = {
        hours,
        minutes,
        seconds
    }

    console.log(timerData);

    
    updater = setInterval(update, 1000);
}

function finish() {
    
    timerEl.style.backgroundColor = "red";
    timerEl.style.border = "10px solid red";
    alert_sound.play();
    clearInterval(updater);
    updater = undefined;
}

function update() { 

    var seconds = timerData.seconds;
    var minutes = timerData.minutes;
    var hours = timerData.hours;

    if (seconds - 1 <= 0) {
        if (minutes > 0) {
            minutes--;
            seconds = 59;
        } else {
            if (hours > 0) {
                hours--;
                minutes = 59;
                seconds = 59;
            } else {
                minutes = 0;
                hours = 0;
                seconds = 0;
                finish();
            }
        }
    } else {
        seconds--;
    }
    timerData.seconds = seconds;
    timerData.minutes = minutes;
    timerData.hours = hours;

    hoursCount.value = hours <= 9 ? "0" + hours.toString() : hours;
    minutesCount.value = minutes <= 9 ? "0" + minutes.toString() : minutes;
    secondsCount.value = seconds <= 9 ? "0" + seconds.toString() : seconds;
}

function stopTimer() {

    if (updater != undefined) {
        clearInterval(updater);
    }

    timerEl.style.pointerEvents = "auto";

    timer = undefined;
    updater = undefined;
    alert_sound.pause();
    alert_sound.currentTime = 0;
    timerEl.removeAttribute("style");
    btnReset.style.display = "block";
    btnStart.style.display = "block";
    btnStop.style.display = "none";

    hoursCount.value = numberToCount(currentTimeSet.hours);
    minutesCount.value = numberToCount(currentTimeSet.minutes);
    secondsCount.value = numberToCount(currentTimeSet.seconds);

    currentTimeSet = undefined;
}

function numberToCount(num) {
    return num <= 9 ? "0" + num.toString() : num;
}

function fixInput(el) {
    var max = parseInt(el.max);
    var min = parseInt(el.min);
    var value = parseInt(el.value);

    if (value > max) {
        el.value = max.toString();
    }

    if (value < min) {
        el.value = min.toString();
    }

    if (value <= 9) {
        el.value = "0" + value.toString();
    }

}

function reset() {
    const hoursTxt = document.getElementById("hours-count");
    const minutesTxt = document.getElementById("minutes-count");
    const secondsTxt = document.getElementById("seconds-count");

    hoursTxt.value = "00";
    minutesTxt.value = "00";
    secondsTxt.value = "00";
}