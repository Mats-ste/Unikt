// Be om brukerens navn
let name = prompt("Hva er navnet ditt?");

// Be om brukerens alder
let age = prompt("Hvor gammel er du?");

// Be om to tall
let firstNumber = prompt("Skriv inn det første tallet:");
let secondNumber = prompt("Skriv inn det andre tallet:");

// Konverter tallene til heltall
firstNumber = parseInt(firstNumber);
secondNumber = parseInt(secondNumber);

// Beregn summen av de to tallene
let sum = firstNumber + secondNumber;

// Vis brukerens navn, alder, og summen av tallene på nettsiden
document.getElementById("userData").innerHTML = "Navn: " + name + ", Alder: " + age;
document.getElementById("sumResult").innerHTML = "Summen av tallene: " + sum;

// Logg informasjonen i konsollen
console.log("Navn: " + name + ", Alder: " + age);
console.log("Summen av tallene: " + sum);
