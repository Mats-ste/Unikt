// Funksjon som sjekker svarene og viser resultatet
function sjekkQuiz() {
    // Hent alle valgene for spørsmålene
    const svar1 = document.querySelector('input[name="spm1"]:checked');
    const svar2 = document.querySelector('input[name="spm2"]:checked');
    const svar3 = document.querySelector('input[name="spm3"]:checked');
  
    // Hvis alle spørsmålene har blitt besvart
    if (svar1 && svar2 && svar3) {
      let riktigSvar = 0;
  
      // Sjekk om svarene er riktige
      if (svar1.value === "correct") {
        riktigSvar++;
      }
      if (svar2.value === "correct") {
        riktigSvar++;
      }
      if (svar3.value === "correct") {
        riktigSvar++;
      }
  
      // Vis resultatet
      const resultatText = `Du fikk ${riktigSvar} av 3 riktige.`;
      document.getElementById("quizResult").innerText = resultatText;
    } else {
      // Hvis noen spørsmål ikke er besvart
      document.getElementById("quizResult").innerText = "Vennligst svar på alle spørsmålene.";
    }
  }
  