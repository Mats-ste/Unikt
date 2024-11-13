document.addEventListener("DOMContentLoaded", function () {
    const stylesheet1 = document.getElementById("stylesheet1");
    const stylesheet2 = document.getElementById("stylesheet2");
    const switchButton = document.getElementById("switchButton");

    // Sett standard tilstand
    stylesheet1.disabled = false;
    stylesheet2.disabled = true;

    // Bytt mellom stilarkene
    switchButton.addEventListener("click", function () {
        stylesheet1.disabled = !stylesheet1.disabled;
        stylesheet2.disabled = !stylesheet2.disabled;
    });
});
