document.addEventListener("DOMContentLoaded", () => {
    const stylesheet1 = document.getElementById("stylesheet1");
    const stylesheet2 = document.getElementById("stylesheet2");
    const switchButton = document.getElementById("switchButton");
    let isOriginalText = true;

    // Funksjon for å sette en cookie  
    const setCookie = (name, value, days) => {
        const date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        const expires = `; expires=${date.toUTCString()}`;
        document.cookie = `${name}=${value}${expires}; path=/`;
    };

    // Funksjon for å hente cookie  
    const getCookie = (name) => {
        const nameEQ = `${name}=`;
        const ca = document.cookie.split(';');
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) === ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
        }
        return null;
    };

    // Sjekk om det finnes en cookie for tema  
    const savedTheme = getCookie("theme");

    if (savedTheme === "dark") {
        // Hvis mørk modus er lagret i cookie, sett den tilstand  
        stylesheet1.disabled = true;
        stylesheet2.disabled = false;
        switchButton.textContent = "Lys";
        isOriginalText = false;
    } else {
        // Standard tilstand  
        stylesheet1.disabled = false;
        stylesheet2.disabled = true;
        switchButton.textContent = "Mørk";
        isOriginalText = true;
    }

    // Bytt mellom stilark og oppdater knappetekst  
    switchButton.addEventListener("click", (event) => {
        event.preventDefault(); // Forhindre at lenken oppdaterer siden

        // Bytt stilark  
        if (stylesheet1.disabled) {
            stylesheet1.disabled = false;
            stylesheet2.disabled = true;
            switchButton.textContent = "Mørk";
            setCookie("theme", "light", 7); // Lagre cookie for lys tilstand  
        } else {
            stylesheet1.disabled = true;
            stylesheet2.disabled = false;
            switchButton.textContent = "Lys";
            setCookie("theme", "dark", 7); // Lagre cookie for mørk tilstand  
        }
    });
});