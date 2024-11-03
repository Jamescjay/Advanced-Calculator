const display = document.getElementById("display");
const modeDisplay = document.getElementById("mode-display");
const radDegDisplay = document.getElementById("rad-deg-display");
const sinBtn = document.getElementById("sin-btn");
const cosBtn = document.getElementById("cos-btn");
const tanBtn = document.getElementById("tan-btn");

let isShiftActive = false;
let isRadMode = true; // True for RAD, false for DEG
let mode = "float"; // Display mode: float, fix, sci
let lastAnswer = 0;

function appendToDisplay(input) {
  if (["sin", "cos", "tan", "sqrt"].includes(input)) {
    if (isShiftActive) {
      input = "a" + input;
    }
    if (isRadMode) {
      display.value += `Math.${input}(`;
    } else {
      display.value += `Math.${input}(Math.PI/180*`;
    }
  } else if (input === "^2") {
    display.value += "**2";
  } else if (input === "^3") {
    display.value += "**3";
  } else {
    display.value += input;
  }
  isShiftActive = false; // Reset shift after a button press
  updateTrigButtons();
}

function clearDisplay() {
  display.value = "";
}

function deleteLastChar() {
  display.value = display.value.slice(0, -1);
}

function toggleRadDeg() {
  isRadMode = !isRadMode;
  radDegDisplay.textContent = isRadMode ? "RAD" : "DEG";
}

function changeMode() {
  const modes = ["float", "fix", "sci"];
  let currentIndex = modes.indexOf(mode);
  mode = modes[(currentIndex + 1) % modes.length];
  modeDisplay.textContent = mode.toUpperCase();
}

function toggleShift() {
  isShiftActive = !isShiftActive;
  document.getElementById("shift-btn").classList.toggle("active");
  updateTrigButtons();
}

function updateTrigButtons() {
  if (isShiftActive) {
    sinBtn.textContent = "asin";
    cosBtn.textContent = "acos";
    tanBtn.textContent = "atan";
  } else {
    sinBtn.textContent = "sin";
    cosBtn.textContent = "cos";
    tanBtn.textContent = "tan";
  }
}

function calculate() {
  try {
    let result = eval(display.value);

    // Apply mode formatting
    if (mode === "fix") {
      result = result.toFixed(2);
    } else if (mode === "sci") {
      result = result.toExponential(2);
    }

    display.value = result;
    lastAnswer = result;
  } catch (error) {
    display.value = "Error";
  }
}

function appendAns() {
  display.value += lastAnswer;
}
