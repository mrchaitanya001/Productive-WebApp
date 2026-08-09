const display = document.getElementById("display") as HTMLInputElement;

function appendValue(value: string): void {
  display.value += value;
}

function clearDisplay(): void {
  display.value = "";
}

function deleteLast(): void {
  display.value = display.value.slice(0, -1);
}

function calculate(): void {
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
  } catch {
    display.value = "Error";
  }
}