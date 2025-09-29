// Hent HTML-elementer
const input = document.getElementById("input");
const timerDisplay = document.getElementById("normal-time");
const bestDisplay = document.getElementById("normal-best");
const reverseTimerDisplay = document.getElementById("reverse-time");
const reverseBestDisplay = document.getElementById("reverse-best-time-display");
const restartButton = document.getElementById("restart");
const reverseButton = document.getElementById("reverse");
const normalButton = document.getElementById("normal");

// Ny tekst i stedet for alfabetet
let targetText = "nei takk";
let reverseText = targetText.split("").reverse().join("");

// Variabler
let startTime = null;
let timer = null;

// --- Lokal storage-nøkler ---
const normalKey = "spill1_bestTid";         // unik nøkkel for normal modus
const reverseKey = "spill1_bestTidBaklengs"; // unik nøkkel for baklengs modus

let bestTime = localStorage.getItem(normalKey);
let reverseBestTime = localStorage.getItem(reverseKey);

let reverseMode = false;

// Tilbakestill input-feltet når siden lastes inn
window.addEventListener("load", () => {
  input.value = ""; 
});

// Oppdater beste tider
if (bestTime) bestDisplay.textContent = `${parseFloat(bestTime).toFixed(2)} sekunder`;
if (reverseBestTime) reverseBestDisplay.textContent = `${parseFloat(reverseBestTime).toFixed(2)} sekunder`;

// Tilbakestill spillet
function resetGame() {
  clearInterval(timer);
  startTime = null;
  input.value = "";
  input.classList.remove("error");
  timerDisplay.textContent = "0.00";
  reverseTimerDisplay.textContent = "0.00";
  input.focus();
}

// Forhindre liming
input.addEventListener("paste", (e) => {
  e.preventDefault();
  alert("Juks er ikke lov! Skriv 'nei takk' i stedet.");
});

// Reset beste tider
restartButton.addEventListener("click", () => {
  const password = prompt("Skriv inn passord for å tilbakestille beste tid:");
  if (password === "hemmelig123") {
    localStorage.removeItem(normalKey);
    localStorage.removeItem(reverseKey);
    alert("Beste tid er nå tilbakestilt!");
    bestDisplay.textContent = "Ingen";
    reverseBestDisplay.textContent = "Ingen";
  } else {
    alert("Feil passord.");
  }
});

// Bytt til baklengs modus
reverseButton.addEventListener("click", () => {
  reverseMode = true;
  resetGame();
});

// Gå tilbake til normal modus
normalButton.addEventListener("click", () => {
  reverseMode = false;
  resetGame();
});

// Start spillet
input.addEventListener("input", () => {
  const userInput = input.value.toLowerCase();
  const currentTarget = reverseMode ? reverseText : targetText;

  if (!startTime) {
    startTime = Date.now();
    timer = setInterval(() => {
      const elapsed = (Date.now() - startTime) / 1000;
      if (reverseMode) {
        reverseTimerDisplay.textContent = elapsed.toFixed(2);
      } else {
        timerDisplay.textContent = elapsed.toFixed(2);
      }
    }, 10);
  }

  // Sjekk bokstav for bokstav
  if (!currentTarget.startsWith(userInput)) {
    input.classList.add("error");
    input.value = input.value.slice(0, -1);
  } else {
    input.classList.remove("error");
  }

  // Hvis teksten er fullført
  if (userInput === currentTarget) {
    clearInterval(timer);
    const elapsedTime = (Date.now() - startTime) / 1000;

    if (reverseMode) {
      if (!reverseBestTime || elapsedTime < parseFloat(reverseBestTime)) {
        reverseBestTime = elapsedTime.toFixed(2);
        localStorage.setItem(reverseKey, reverseBestTime);
        reverseBestDisplay.textContent = `${reverseBestTime} sekunder`;
      }
    } else {
      if (!bestTime || elapsedTime < parseFloat(bestTime)) {
        bestTime = elapsedTime.toFixed(2);
        localStorage.setItem(normalKey, bestTime);
        bestDisplay.textContent = `${bestTime} sekunder`;
      }
    }

    alert(`Bra jobbet! Du skrev '${currentTarget}' på ${elapsedTime.toFixed(2)} sekunder`);
    resetGame();
  }
});
