document.addEventListener("DOMContentLoaded", () => {
    const startButton = document.getElementById("start-button");
    const typingArea = document.getElementById("typing-area");
    const textToType = document.getElementById("text-to-type").innerText;
    const resultDisplay = document.getElementById("result");
  
    let startTime = null;
  
    // Start test
    startButton.addEventListener("click", () => {
      if (startButton.innerText === "Start Test") {
        startTime = new Date();
        typingArea.value = "";
        typingArea.disabled = false;
        typingArea.focus();
        startButton.innerText = "Stop Test";
        resultDisplay.innerText = "";
      } else {
        // Stop test and calculate WPM
        const endTime = new Date();
        const elapsedTime = (endTime - startTime) / 1000 / 60; // Minutes
        const typedText = typingArea.value.trim();
        const wordsTyped = typedText.split(/\s+/).length;
        const wpm = Math.round(wordsTyped / elapsedTime);
  
        typingArea.disabled = true;
        startButton.innerText = "Start Test";
        resultDisplay.innerText = `Your WPM: ${wpm}`;
      }
    });
  });
  