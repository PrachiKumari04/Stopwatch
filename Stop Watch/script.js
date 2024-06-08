let startBtn = document.getElementById('start');
let stopBtn = document.getElementById('stop');
let resetBtn = document.getElementById('reset');
let lapBtn = document.getElementById('lap');
let container = document.querySelector('.container');
let lapTimesContainer = document.getElementById('lapTimes');

let hour = 00;
let minute = 00;
let second = 00;
let count = 00;
let lapTimes = [];
let timer;

startBtn.addEventListener('click', function () {
    timer = true;
    container.style.backgroundColor = 'rgba(0, 255, 0, 0.1)'; // Light transparent green
    stopWatch();
});

stopBtn.addEventListener('click', function () {
    timer = false;
    container.style.backgroundColor = 'rgba(255, 0, 0, 0.1)'; // Light transparent red
});

resetBtn.addEventListener('click', function () {
    timer = false;
    hour = 0;
    minute = 0;
    second = 0;
    count = 0;
    lapTimes = [];
    document.getElementById('hr').innerHTML = "00";
    document.getElementById('min').innerHTML = "00";
    document.getElementById('sec').innerHTML = "00";
    document.getElementById('count').innerHTML = "00";
    container.style.backgroundColor = 'white'; // White
    displayLapTimes(); // Clear lap times display
});

lapBtn.addEventListener('click', function () {
    if (timer) {
        let lapTime = pad(hour) + ":" + pad(minute) + ":" + pad(second) + ":" + pad(count);
        lapTimes.push(lapTime);
        displayLapTimes();
    }
});

function stopWatch() {
    if (timer) {
        count++;

        if (count == 100) {
            second++;
            count = 0;
        }

        if (second == 60) {
            minute++;
            second = 0;
        }

        if (minute == 60) {
            hour++;
            minute = 0;
            second = 0;
        }

        let hrString = pad(hour);
        let minString = pad(minute);
        let secString = pad(second);
        let countString = pad(count);

        document.getElementById('hr').innerHTML = hrString;
        document.getElementById('min').innerHTML = minString;
        document.getElementById('sec').innerHTML = secString;
        document.getElementById('count').innerHTML = countString;
        setTimeout(stopWatch, 10);
    }
}

// Function to display lap times
function displayLapTimes() {
    // Get lapTimes container
    let lapTimesContainer = document.getElementById('lapTimes');
    // Clear previous lap times
    lapTimesContainer.innerHTML = "";
    // Display lap times
    lapTimes.forEach(function (lap, index) {
        let lapItem = document.createElement('div');
        lapItem.textContent = "Lap " + (index + 1) + ": " + lap;
        lapTimesContainer.appendChild(lapItem);
    });
}

// Function to pad single digit numbers with leading zero
function pad(num) {
    return num < 10 ? "0" + num : num;
}
