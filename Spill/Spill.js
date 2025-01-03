// Hent HTML-elementer for input-felt, tidtaker, beste tid, restart-knappen og baklengs-knappene
const input = document.getElementById("input");
const timerDisplay = document.getElementById("time");
const bestDisplay = document.getElementById("best");
const restartButton = document.getElementById("restart");
const reverseButton = document.getElementById("reverse");
const normalButton = document.getElementById("normal");
const reverseBestDisplay = document.getElementById("reverse-best");
const reverseBestTimeDisplay = document.getElementById("reverse-best-time-display");

// Norsk alfabet inkludert Æ, Ø, Å
let targetAlphabet = "abcdefghijklmnopqrstuvwxyzæøå"; // Standard alfabet
let startTime = null;
let timer = null;
let bestTime = localStorage.getItem("besteTid");
let reverseMode = false; // Variabel for å holde styr på om vi er i baklengs modus eller ikke
let reverseStartTime = null; // Tid for baklengs modus
let reverseTimer = null; // Tidtaker for baklengs modus
let reverseBestTime = localStorage.getItem("besteBaklengsTid"); // Lagre beste baklengs tid

// Oppdater visning for beste tid hvis en lagret tid eksisterer
if (bestTime) {
  bestDisplay.textContent = `${parseFloat(bestTime).toFixed(2)} sekunder`;
}

if (reverseBestTime) {
  reverseBestTimeDisplay.textContent = `${parseFloat(reverseBestTime).toFixed(2)} sekunder`;
}

// Funksjon for å tilbakestille spillet
function resetGame() {
  clearInterval(timer); // Stopp tidtakeren
  clearInterval(reverseTimer); // Stopp baklengs tidtaker
  timer = null; // Nullstill tidtaker
  reverseTimer = null; // Nullstill baklengs tidtaker
  startTime = null; // Nullstill starttid for normal modus
  reverseStartTime = null; // Nullstill starttid for baklengs modus
  input.value = ""; // Tøm input-feltet
  input.classList.remove("error"); // Fjern feilstil
  timerDisplay.textContent = "0.00"; // Nullstill tidtaker-visningen
  reverseBestDisplay.textContent = "Ingen"; // Nullstill baklengs tid
  input.focus(); // Sett fokus på input-feltet
}

// Forhindrer brukere fra å lime inn tekst (for å hindre juks)
input.addEventListener("paste", (e) => {
  e.preventDefault();
  alert("Juks er ikke lov! Skriv alfabetet i stedet.");
});

// Tilbakestill beste tid ved å klikke på restart-knappen
restartButton.addEventListener("click", () => {
  const password = prompt("Skriv inn passord for å tilbakestille beste tid:");
  if (password === "hemmelig123") { // Passord for å tilbakestille
    localStorage.removeItem("besteTid"); // Fjern lagret beste tid
    localStorage.removeItem("besteBaklengsTid"); // Fjern lagret baklengs tid
    alert("Beste tid er nå tilbakestilt!");
    bestDisplay.textContent = "Ingen"; // Oppdater visningen
    reverseBestTimeDisplay.textContent = "Ingen"; // Oppdater visningen for baklengs beste tid
  } else {
    alert("Feil passord. Du har ikke tilgang til å tilbakestille.");
  }
});

// Håndter når brukeren trykker på knappen for å skrive baklengs
reverseButton.addEventListener("click", () => {
  reverseMode = true; // Aktiver baklengs modus
  targetAlphabet = "åøæzyxwvutsrqponmlkjihgfedcba"; // Sett alfabetet til baklengs
  resetGame(); // Tilbakestill spillet for den nye rekkefølgen
  timerDisplay.textContent = "0.00"; // Nullstill tidtaker-visningen
  reverseBestDisplay.textContent = "0.00"; // Nullstill baklengs tid
});

// Håndter når brukeren trykker på knappen for å gå tilbake til normal modus
normalButton.addEventListener("click", () => {
  reverseMode = false; // Deaktiver baklengs modus
  targetAlphabet = "abcdefghijklmnopqrstuvwxyzæøå"; // Sett alfabetet tilbake til normalt
  resetGame(); // Tilbakestill spillet til normal modus
  timerDisplay.textContent = "0.00"; // Nullstill tidtaker-visningen
  reverseBestDisplay.textContent = "Ingen"; // Nullstill baklengs tid
});

// Klargjør spillet når brukeren klikker på input-feltet
input.addEventListener("focus", () => {
  input.value = ""; // Tøm input-feltet
  input.classList.remove("error"); // Fjern feilstil
  startTime = null; // Nullstill starttid for normal modus
  reverseStartTime = null; // Nullstill starttid for baklengs modus
  clearInterval(timer); // Stopp tidtakeren
  clearInterval(reverseTimer); // Stopp baklengs tidtaker
  timerDisplay.textContent = "0.00"; // Nullstill tidtaker-visningen
  reverseBestDisplay.textContent = "Ingen"; // Nullstill baklengs tid
});

// Håndter brukerens input (for både normal og baklengs)
input.addEventListener("input", () => {
  const userInput = input.value.toLowerCase(); // Konverter input til små bokstaver

  // Start tidtakeren for normal modus
  if (!startTime && !reverseMode) {
    startTime = Date.now(); // Sett starttid for normal modus
    timer = setInterval(() => {
      const currentTime = (Date.now() - startTime) / 1000; // Beregn forløpt tid
      timerDisplay.textContent = currentTime.toFixed(2); // Oppdater tidtaker-visningen for normal modus
    }, 10); // Oppdatering hvert 10. millisekund
  }

  // Start baklengs tidtaker for baklengs modus
  if (!reverseStartTime && reverseMode) {
    reverseStartTime = Date.now(); // Sett starttid for baklengs modus
    reverseTimer = setInterval(() => {
      const currentTime = (Date.now() - reverseStartTime) / 1000; // Beregn forløpt tid
      reverseBestDisplay.textContent = currentTime.toFixed(2); // Oppdater baklengs tid
    }, 10); // Oppdatering hvert 10. millisekund
  }

  // Sjekk om brukerens input matcher alfabetet (enten normalt eller baklengs)
  if (!targetAlphabet.startsWith(userInput)) {
    input.classList.add("error"); // Marker feil
    input.value = input.value.slice(0, -1); // Fjern siste feilaktige bokstav
  } else {
    input.classList.remove("error"); // Fjern feilstil hvis alt stemmer
  }

  // Sjekk om brukeren har skrevet hele alfabetet korrekt
  if (userInput === targetAlphabet) {
    clearInterval(timer); // Stopp tidtakeren
    clearInterval(reverseTimer); // Stopp baklengs tidtaker
    const elapsedTime = (Date.now() - startTime) / 1000; // Beregn forløpt tid for normal modus
    const reverseElapsedTime = (Date.now() - reverseStartTime) / 1000; // Beregn forløpt tid for baklengs modus

    if (!reverseMode) {
      timerDisplay.textContent = elapsedTime.toFixed(2); // Oppdater tidtaker-visningen for normal modus
      if (!bestTime || elapsedTime < parseFloat(bestTime)) {
        bestTime = elapsedTime.toFixed(2);
        localStorage.setItem("besteTid", bestTime); // Lagre ny beste tid
        bestDisplay.textContent = `${bestTime} sekunder`; // Oppdater visningen
      }
    } else {
      reverseBestDisplay.textContent = reverseElapsedTime.toFixed(2); // Oppdater tidtaker-visningen for baklengs
      if (!reverseBestTime || reverseElapsedTime < parseFloat(reverseBestTime)) {
        reverseBestTime = reverseElapsedTime.toFixed(2);
        localStorage.setItem("besteBaklengsTid", reverseBestTime); // Lagre ny beste baklengs tid
        reverseBestTimeDisplay.textContent = `${reverseBestTime} sekunder`; // Oppdater beste baklengs tid
      }
    }

    alert(`Bra jobbet! Tiden din: ${reverseMode ? reverseElapsedTime.toFixed(2) : elapsedTime.toFixed(2)} sekunder`);

    // Tilbakestill spillet for en ny runde
    resetGame();
  }
});
