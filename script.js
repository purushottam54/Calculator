// Calculator logic
const display = document.getElementById("display");
let currentInput = "";
let resetNext = false;

function updateDisplay() {
  display.value = currentInput || "0";
}

function appendValue(value) {
  if (resetNext) {
    currentInput = "";
    resetNext = false;
  }
  if (value === "." && currentInput.endsWith(".")) return;
  currentInput += value;
  updateDisplay();
}

function clearDisplay() {
  currentInput = "";
  updateDisplay();
}

function calculate() {
  try {
    // Replace × and ÷ with * and /
    let expression = currentInput
      .replace(/×/g, "*")
      .replace(/÷/g, "/")
      .replace(/−/g, "-");
    let result = eval(expression);
    currentInput = result.toString();
    updateDisplay();
    resetNext = true;
  } catch {
    display.value = "Error";
    resetNext = true;
  }
}

document.querySelectorAll(".btn").forEach((btn) => {
  btn.addEventListener("click", (e) => {
    const value = btn.getAttribute("data-value");
    if (value) {
      appendValue(value);
    } else if (btn.id === "clear") {
      clearDisplay();
    }
  });
});

document.getElementById("equals").addEventListener("click", calculate);

document.addEventListener("keydown", (e) => {
  if (
    (e.key >= "0" && e.key <= "9") ||
    ["+", "-", "*", "/", "."].includes(e.key)
  ) {
    appendValue(e.key);
  } else if (e.key === "Enter" || e.key === "=") {
    calculate();
  } else if (e.key === "Escape" || e.key.toLowerCase() === "c") {
    clearDisplay();
  }
});

updateDisplay();
