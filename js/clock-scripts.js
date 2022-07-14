// clock numbers
const clockNumber = document.querySelectorAll('.number');
// clock hands
const handHour = document.querySelector('.hand.hour');
const handMin = document.querySelector('.hand.minute');
const handSec = document.querySelector('.hand.second');
// digital time
const digitalDate = document.querySelector('.digital-clock p')
const digitalNum = document.querySelector('.digital-clock h3');

// rotate each number in the clock by 30
for (let i = 0; i < clockNumber.length; i++) {
                                            // add 30 for 12 on top
    clockNumber[i].style.transform = `rotate(${(30 * i) + 30}deg)`;
}

// Call function every interval (for this example it would be every sec)
setInterval(setClock, 1000);

function setClock () {
    // Gets the current date
    const currentDate = new Date()
    const month = currentDate.getMonth();
    const date = currentDate.getDate();
    const year = currentDate.getFullYear();

    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul","Aug", "Sep", "Oct", "Nov", "Dec"];
    // time
    const sec = currentDate.getSeconds();
    const min = currentDate.getMinutes();
    const hr = currentDate.getHours();

    // Time ratios for clock
    const secondsRatio = sec / 60;
    const minutesRatio = (secondsRatio + min) / 60;
    const hoursRatio = (minutesRatio + hr) / 12;

    setRotation(handSec, secondsRatio);
    setRotation(handMin, minutesRatio);
    setRotation(handHour, hoursRatio);

    // Set digital date & time, will have 0 in second digit if lower than 10
    digitalDate.innerHTML = `${monthNames[month]}/${date}/${year}`;
    digitalNum.innerHTML = `${hr > 9 ? hr : '0' + hr}:${min > 9 ? min : '0' + min}:${sec > 9 ? sec : '0' + sec}`;
}

// sets the css --rotation
function setRotation (element, rotationRatio) {
    element.style.setProperty(`--rotation`, rotationRatio * 360);
}

// Sets the clock to your time when page loaded
setClock();