const textElement = document.getElementById("text");
const button = document.getElementById("switchButton");
let isOriginalText = true;

button.addEventListener("click", (event) => {
    event.preventDefault(); // Forhindre at lenken oppdaterer siden
    if (isOriginalText) {
        button.textContent = "Lys"; // Endre teksten på lenken
    } else {
        button.textContent = "Mørk"; // Tilbake til original tekst på lenken
    }
    isOriginalText = !isOriginalText; // Bytt tilstand
});