// core
const root = document.documentElement;
const clockBaseColor = '--c-clock'
const clockNumberColor = '--c-p'
const clockOutlineColor = '--c-clock-ol'
const clockGlowColor = '--c-clock-glow'
const clockTickHandColor = '--c-hand-sec'
const clockHandsColor = '--c-hands'
// popups
const crBtn = document.querySelector('#color-range-button');
const crBtnBox = document.querySelector('#color-range-box-btn');
// Color Range Box Buttons
const crBoxBtns = document.querySelectorAll('.cr-button');
// Color Range Slider Box
const crBoxSlider = document.querySelector('#color-range-box-slider');
const crBoxSliderHeader = document.querySelector('#color-range-box-slider h2');
const crBoxSliders = document.querySelectorAll('#color-range-box-slider p');
const crBoxSliderRange = document.querySelectorAll('#color-range-box-slider input');

// Window Load
window.onload = function () {
    ColorNumber();

    // Default Clock Color Variables
    checkDefault();
    setClockColors();
}

// Shows the crBtnBox when pressed
crBtn.addEventListener('click', e => {
    e.preventDefault();

    crBtn.classList.toggle('selected');
    crBtnBox.classList.toggle('hidden');

    // hides slider box if the boxbtns are also hidden
    if (crBtnBox.classList.contains('hidden')) {
        crBoxSlider.classList.add('hidden');

        for (let i = 0; i < crBoxBtns.length; i++) {
            crBoxBtns[i].classList.remove('selected')
        }
    }
})


// toggles selected class if user clicked on any cr-button
for (let i = 0; i < crBoxBtns.length; i++) {
    crBoxBtns[i].addEventListener('click', function () {
        // Sees if the box have selected class or not
        // If do, remove all selected class but the one being clicked
        if (!crBoxBtns[i].classList.contains('selected')) {
            for (let select = 0; select < crBoxBtns.length; select++) {
                crBoxBtns[select].classList.remove('selected');
            }

            crBoxBtns[i].classList.add('selected')
            checkSliderBox(i);
            SliderRangeChange(i);
        }
        // if clicked is same as selected remove the selected class form it
        else {
            crBoxBtns[i].classList.remove('selected') 
            checkSliderBox(i)
        }
    })
}


// sliders
for (let i = 0; i < crBoxSliderRange.length; i++) {
    // When the slider is sliding it will change
    crBoxSliderRange[i].oninput = function () {
        // Change the number next to slider equal to the value
        crBoxSliders[i].innerHTML = crBoxSliderRange[i].value;

        // Change Clock Color
        root.style.setProperty(`${currentProperty}`, `rgb(${crBoxSliderRange[0].value}, ${crBoxSliderRange[1].value}, ${crBoxSliderRange[2].value})`);


        saveSlidersToLocal(currentProperty, crBoxSliderRange[0].value, crBoxSliderRange[1].value, crBoxSliderRange[2].value);
    }
}

// Sets the default value for the slider s
for (let i = 0; i < crBoxSliderRange.length; i++) {
    crBoxSliderRange[0].value = 0;
    crBoxSliderRange[1].value = 234;
    crBoxSliderRange[2].value = 255;
}

// shows box slider when a cr-button is selected
function checkSliderBox(num) {
    if (crBoxBtns[num].classList.contains('selected')) {
        crBoxSliderHeader.innerHTML = crBoxBtns[num].textContent;

        crBoxSlider.classList.remove('hidden');
    }
    else {
        crBoxSlider.classList.add('hidden');
    }

    propertyFocusChange(num);
}

// cr-button selected changes the property name on which the sliders would change
function propertyFocusChange(num) {
    switch (num) {
        case 0:
            return currentProperty = clockBaseColor;
        case 1:
            return currentProperty = clockNumberColor;
        case 2:
            return currentProperty = clockOutlineColor;
        case 3:
            return currentProperty = clockGlowColor;
        case 4:
            return currentProperty = clockTickHandColor;
        case 5:
            return currentProperty = clockHandsColor;
    }
}

// slider color number
function ColorNumber() {
    for (let i = 0; i < crBoxSliderRange.length; i++) {
        crBoxSliders[i].innerHTML = crBoxSliderRange[i].value;
    }
}

// Save sliders in local storage
function saveSlidersToLocal(propertyName, r, g ,b) {  
    let currentPropertyName;

    if (propertyName === clockBaseColor) {
        currentPropertyName = "clockBaseColor";
    }
    if (propertyName === clockNumberColor) {
        currentPropertyName = "clockNumberColor";
    }
    if (propertyName === clockOutlineColor) {
        currentPropertyName = "clockOutlineColor";
    }
    if (propertyName === clockGlowColor) {
        currentPropertyName = "clockGlowColor";
    }
    if (propertyName === clockTickHandColor) {
        currentPropertyName = "clockTickHandColor";
    }
    if (propertyName === clockHandsColor) {
        currentPropertyName = "clockHandsColor";
    }

    setPropertyNameAndColor(currentPropertyName, r, g, b);
}

// Following sets property defaults if 1st time
function checkDefault() {
    if (localStorage.getItem('beenHereBefore') === null) {
        localStorage.setItem('beenHereBefore', 'yes')
        
        for (let i = 0; i < 6; i++) {
            if (i === 0 || i === 3) {
                setPropertyNameAndColor(checkPropertyName(i), 0, 230, 255)
            }
            else if (i === 1 || i === 2 || i === 5) {
                setPropertyNameAndColor(checkPropertyName(i), 0, 0, 0)
            }
            else if (i === 4) {
                setPropertyNameAndColor(checkPropertyName(i), 255, 0, 0)
            }
        }
    }

}

function setPropertyNameAndColor (name, r, g, b) {
    for (let color = 0; color < 3; color++) {
        if (color === 0) {
            localStorage.setItem(`${name}R`, r)
        }
        else if (color === 1) {
            localStorage.setItem(`${name}G`, g)
        }
        else {
            localStorage.setItem(`${name}B`, b)
        }
    }
}

// Following sets the clock color base on the localStorage key and values
function SetPropertyColor(number, r, g, b) {
    if (number === 0) { root.style.setProperty('--c-clock', `rgb(${r},${g},${b})` )};
    if (number === 1) { root.style.setProperty('--c-p', `rgb(${r},${g},${b})` )};
    if (number === 2) { root.style.setProperty('--c-clock-ol', `rgb(${r},${g},${b})` )};
    if (number === 3) { root.style.setProperty('--c-clock-glow', `rgb(${r},${g},${b})` )};
    if (number === 4) { root.style.setProperty('--c-hand-sec', `rgb(${r},${g},${b})` )};
    if (number === 5) { root.style.setProperty('--c-hands', `rgb(${r},${g},${b})` )};
}

function getPropertyColor(name, num) {
    if (num === 0) {
        return localStorage.getItem(`${name}R`)
    }
    if (num === 1) {
        return localStorage.getItem(`${name}G`)
    }
    if (num === 2) {
        return localStorage.getItem(`${name}B`)
    }
}

function setClockColors() {
    for (let n = 0; n < 6; n++) {
        SetPropertyColor (
            n,
            getPropertyColor(checkPropertyName(n), 0), 
            getPropertyColor(checkPropertyName(n), 1), 
            getPropertyColor(checkPropertyName(n), 2)
        )
    }
}

// Basic name returner
function checkPropertyName(num) {
    if (num === 0) { return "clockBaseColor" };
    if (num === 1) { return "clockNumberColor" };
    if (num === 2) { return "clockOutlineColor" };
    if (num === 3) { return "clockGlowColor" };
    if (num === 4) { return "clockTickHandColor" };
    if (num === 5) { return "clockHandsColor" };
}

// Changes the SliderRanger to the cr-button selected values from LocalStorage 
function SliderRangeChange(btnNum) {
    let currentPropertyName = checkPropertyName(btnNum);
    let r = getPropertyColor(checkPropertyName(btnNum), 0);
    let g = getPropertyColor(checkPropertyName(btnNum), 1);
    let b = getPropertyColor(checkPropertyName(btnNum), 2);

    for (let c = 0; c < 3; c++) {
        if (c === 0) {
            crBoxSliders[c].innerHTML = r;
            crBoxSliderRange[c].value = r;
        }
        else if (c === 1) {
            crBoxSliders[c].innerHTML = g;
            crBoxSliderRange[c].value = g;
        }
        else {
            crBoxSliders[c].innerHTML = b;
            crBoxSliderRange[c].value = b;
        }
    }
}