document.addEventListener("DOMContentLoaded", () => {
    const startButton = document.getElementById("start-button");
    const typingArea = document.getElementById("typing-area");
    const textToTypeElement = document.getElementById("text-to-type");
    const resultDisplay = document.getElementById("result");
  
    let fullText = "";
    let timerStart = null;
    let typingStarted = false;
    let testActive = false;
  
    const words = [
      "quick", "brown", "fox", "jumps", "over", "the", "lazy", "dog",
      "hello", "world", "javascript", "coding", "challenge", "learning", "website",
      "internet", "type", "racer", "keyboard", "design", "front-end", "back-end"
    ];
  
    // Generer tilfeldig setning
    function generateRandomSentence() {
      return Array.from({ length: 7 }, () => words[Math.floor(Math.random() * words.length)]).join(' ');
    }
  
    // Start-knapp
    startButton.addEventListener("click", () => {
      if (testActive) return; // Hindre flere klikk mens test pågår
      testActive = true;
      fullText = generateRandomSentence();
      textToTypeElement.innerText = fullText; // Viser teksten som skal skrives
      typingArea.disabled = false;
      typingArea.value = "";
      resultDisplay.innerText = "Start å skrive!";
      timerStart = null;
      typingStarted = false;
    });
  
    // Lytt etter input
    typingArea.addEventListener("input", (e) => {
      const userInput = e.target.value;
  
      // Start timer ved første tastetrykk
      if (!typingStarted) {
        timerStart = Date.now();
        typingStarted = true;
      }
  
      // Hindrer input hvis det ikke stemmer
      if (userInput !== fullText.slice(0, userInput.length)) {
        e.target.value = userInput.slice(0, -1); // "Reverser" feil input
        return;
      }
  
      const elapsedTime = (Date.now() - timerStart) / 1000; // Konverter tid til sekunder
      const wpm = Math.round((userInput.split(" ").length / elapsedTime) * 60);
  
      // Vis gjenværende tekst og stopp testen ved fullført input
      const isComplete = userInput === fullText;
      if (isComplete) {
        resultDisplay.innerText = `Gratulerer! Du fullførte! WPM: ${wpm}`;
        typingArea.disabled = true;
        testActive = false;
      } else {
        resultDisplay.innerText = `WPM: ${wpm}`;
      }
    });
  });
  