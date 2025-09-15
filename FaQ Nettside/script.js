// Henter alle spørsmålene
const questions = document.querySelectorAll(".question");

// Legger til klikkfunksjon på hvert spørsmål
questions.forEach(btn => {
    btn.addEventListener("click", () => {
        const answer = btn.nextElementSibling;

        // Skru av alle andre svar først (accordion-effekt)
        document.querySelectorAll(".answer").forEach(a => {
            if (a !== answer) a.style.display = "none";
        });

        // Toggle synlighet
        answer.style.display = answer.style.display === "block" ? "none" : "block";
    });
});
