const tempInput = document.getElementById("tempInput");
const fromUnit = document.getElementById("fromUnit");
const toUnit = document.getElementById("toUnit");
const swapBtn = document.getElementById("swapBtn");
const convertBtn = document.getElementById("convertBtn");
const resetBtn = document.getElementById("resetBtn");
const resultBox = document.getElementById("resultBox");
const resultValue = document.getElementById("resultValue");
const formulaExplanation = document.getElementById("formulaExplanation");

function convertTemperature() {
  const inputVal = parseFloat(tempInput.value);

  if (isNaN(inputVal)) {
    alert("Please enter a valid numeric temperature value.");
    tempInput.focus();
    return;
  }

  const from = fromUnit.value;
  const to = toUnit.value;

  if (from === to) {
    displayResult(inputVal, getUnitSymbol(to), "Same units selected (No conversion applied).");
    return;
  }

  // 1. Convert input to Celsius first as baseline
  let tempInCelsius;
  if (from === "celsius") {
    tempInCelsius = inputVal;
  } else if (from === "fahrenheit") {
    tempInCelsius = (inputVal - 32) * (5 / 9);
  } else if (from === "kelvin") {
    tempInCelsius = inputVal - 273.15;
  }

  // 2. Convert from Celsius to Target Unit
  let finalResult;
  let formulaDesc = "";

  if (to === "celsius") {
    finalResult = tempInCelsius;
    formulaDesc = from === "fahrenheit" ? "Formula: (°F − 32) × 5/9" : "Formula: K − 273.15";
  } else if (to === "fahrenheit") {
    finalResult = (tempInCelsius * (9 / 5)) + 32;
    formulaDesc = from === "celsius" ? "Formula: (°C × 9/5) + 32" : "Formula: (K − 273.15) × 9/5 + 32";
  } else if (to === "kelvin") {
    finalResult = tempInCelsius + 273.15;
    formulaDesc = from === "celsius" ? "Formula: °C + 273.15" : "Formula: (°F − 32) × 5/9 + 273.15";
  }

  displayResult(finalResult.toFixed(2), getUnitSymbol(to), formulaDesc);
}

function displayResult(value, symbol, formula) {
  resultValue.textContent = `${value} ${symbol}`;
  formulaExplanation.textContent = formula;
  resultBox.style.display = "block";
}

function getUnitSymbol(unit) {
  switch (unit) {
    case "celsius": return "°C";
    case "fahrenheit": return "°F";
    case "kelvin": return "K";
    default: return "";
  }
}

// Swap Units
swapBtn.addEventListener("click", () => {
  const temp = fromUnit.value;
  fromUnit.value = toUnit.value;
  toUnit.value = temp;

  if (tempInput.value !== "") {
    convertTemperature();
  }
});

// Convert on Click or Pressing Enter
convertBtn.addEventListener("click", convertTemperature);
tempInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") convertTemperature();
});

// Reset
resetBtn.addEventListener("click", () => {
  tempInput.value = "";
  fromUnit.value = "celsius";
  toUnit.value = "fahrenheit";
  resultBox.style.display = "none";
  tempInput.focus();
});