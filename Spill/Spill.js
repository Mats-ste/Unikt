const input = document.getElementById("input");
const timerDisplay = document.getElementById("time");
const bestDisplay = document.getElementById("best");
const restartButton = document.getElementById("restart");

// Norsk alfabet inkludert Æ, Ø, Å
const targetAlphabet = "abcdefghijklmnopqrstuvwxyzæøå";
let startTime = null;
let timer = null;
let bestTime = localStorage.getItem("besteTid");

if (bestTime) {
  bestDisplay.textContent = `${parseFloat(bestTime).toFixed(2)} sekunder`;
}

function resetGame() {
  clearInterval(timer);
  timer = null;
  startTime = null;
  input.value = "";
  input.classList.remove("error");
  timerDisplay.textContent = "0.00";
  input.focus();
}

// Deaktiver liming
input.addEventListener("paste", (e) => {
  e.preventDefault();
  alert("Juks er ikke lov! Skriv alfabetet i stedet.");
});

restartButton.addEventListener("click", () => {
  const password = prompt("Skriv inn passord for å tilbakestille beste tid:");
  if (password === "hemmelig123") { // Passord for å tilbakestille
    localStorage.removeItem("besteTid");
    alert("Beste tid er nå tilbakestilt!");
    bestDisplay.textContent = "Ingen";
  } else {
    alert("Feil passord. Du har ikke tilgang til å tilbakestille.");
  }
});

input.addEventListener("focus", () => {
  input.value = "";
  input.classList.remove("error");
  startTime = null;
  clearInterval(timer);
  timerDisplay.textContent = "0.00";
});

input.addEventListener("input", () => {
  const userInput = input.value.toLowerCase();

  if (!startTime) {
    startTime = Date.now();
    timer = setInterval(() => {
      const currentTime = (Date.now() - startTime) / 1000;
      timerDisplay.textContent = currentTime.toFixed(2);
    }, 10);
  }

  if (!targetAlphabet.startsWith(userInput)) {
    input.classList.add("error");
    input.value = input.value.slice(0, -1);
  } else {
    input.classList.remove("error");
  }

  if (userInput === targetAlphabet) {
    clearInterval(timer);
    const elapsedTime = (Date.now() - startTime) / 1000;
    timerDisplay.textContent = elapsedTime.toFixed(2);
    input.blur();

    if (!bestTime || elapsedTime < parseFloat(bestTime)) {
      bestTime = elapsedTime.toFixed(2);
      localStorage.setItem("besteTid", bestTime);
      bestDisplay.textContent = `${bestTime} sekunder`;
    }

    alert(`Bra jobbet! Tiden din: ${elapsedTime.toFixed(2)} sekunder`);

    // Tøm input-feltet og sett opp spillet på nytt
    resetGame();
  }
});
