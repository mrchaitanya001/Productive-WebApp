"use strict";
const display = document.getElementById("display");
function appendValue(value) {
    display.value += value;
}
function clearDisplay() {
    display.value = "";
}
function deleteLast() {
    display.value = display.value.slice(0, -1);
}
function calculate() {
    try {
        const expression = display.value
            .replace(/×/g, "*")
            .replace(/÷/g, "/");
        if (!expression) {
            return;
        }
        // Simple calculator evaluation
        const result = Function(`"use strict"; return (${expression})`)();
        display.value = String(result);
    }
    catch {
        display.value = "Error";
    }
}
