// Funksjon for å sette en cookie med navnet 'name', verdien 'value', og antall dager før den utløper
function setCookie(name, value, days) {
    // Beregner utløpsdatoen for cookien basert på nåværende tidspunkt pluss antall dager
    const expires = new Date(Date.now() + days * 864e5).toUTCString();
    
    // Setter cookien med navnet, verdien, utløpsdatoen og angir at den skal være tilgjengelig for hele nettstedet
    document.cookie = name + '=' + encodeURIComponent(value) + '; expires=' + expires + '; path=/';
}

// Funksjon for å hente verdien av en cookie med et spesifisert navn
function getCookie(name) {
    // Deler opp document.cookie i en array av enkeltcooker og reduserer den til å finne ønsket cookie
    return document.cookie.split('; ').reduce((r, v) => {
        const parts = v.split('=');
        // Sjekker om navnet på cookie matcher det som er ønsket
        return parts[0] === name ? decodeURIComponent(parts[1]) : r; // Returnerer verdien eller det eksisterende resultatet
    }, '');
}

// Eksempel på bruk:
document.addEventListener("DOMContentLoaded", function () {
    // Henter stilarkene og knappen fra DOM
    const stylesheet1 = document.getElementById("stylesheet1");
    const stylesheet2 = document.getElementById("stylesheet2");
    const switchButton = document.getElementById("switchButton");

    // Laster den innledende tilstanden fra cookies
    const isStylesheet1Enabled = getCookie("stylesheetEnabled") === "true";
    
    // Aktiverer eller deaktiverer stilarkene basert på verdien av cookien
    stylesheet1.disabled = !isStylesheet1Enabled; // Aktiverer eller deaktiverer stylesheet1
    stylesheet2.disabled = isStylesheet1Enabled; // Aktiverer eller deaktiverer stylesheet2

    // Lytter etter klikk på bytteknappen
    switchButton.addEventListener("click", function () {
        // Sjekker om stylesheet1 er deaktivert
        if (stylesheet1.disabled) {
            // Aktiverer stylesheet1 og deaktiverer stylesheet2
            stylesheet1.disabled = false;
            stylesheet2.disabled = true;
            // Setter en cookie for å huske at stylesheet1 er aktivert i 7 dager
            setCookie("stylesheetEnabled", "true", 7); // Utløper om 7 dager
        } else {
            // Aktiverer stylesheet2 og deaktiverer stylesheet1
            stylesheet1.disabled = true;
            stylesheet2.disabled = false;
            // Setter en cookie for å huske at stylesheet1 ikke er aktivert i 7 dager
            setCookie("stylesheetEnabled", "false", 7);
        }
    });
});
