// Data for avfallsmengder
let avfallData = [];

// Graf for avfallsmengder
let graf = null;

// Funksjon for å lage grafen
function lagGraf() {
  const ctx = document.getElementById('avfallGraf').getContext('2d');
  graf = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: [],
      datasets: [{
        label: 'Kg avfall brent',
        data: [],
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: false, // Fjerner 0 som startpunkt for y-aksen
          suggestedMin: 0,    // Settes til 0 for å starte fra 0, kan justeres etter behov
          suggestedMax: 10,   // Øvre grense for y-aksen
          stepSize: 1,        // Intervall på 1 for y-aksen (verdiene vil være 1, 2, 3, ...)
          ticks: {
            precision: 0      // Forhindrer desimaler på y-aksen
          }
        }
      }
    }
  });
}


// Funksjon for å legge til en ny rad i tabellen
function leggTilRad() {
  const tabell = document.getElementById("avfallTabell").getElementsByTagName("tbody")[0];
  const nyRad = tabell.insertRow();
  const celleDag = nyRad.insertCell(0);
  const celleKg = nyRad.insertCell(1);

  celleDag.innerHTML = `Dag ${avfallData.length + 1}`;
  celleKg.innerHTML = `<input type="number" placeholder="Kg" style="background-color: #333; color: #e0e0e0; border: 1px solid #76a78e;" onchange="oppdaterData(this, ${avfallData.length})">`;
  avfallData.push(0);

  console.log('Data etter å ha lagt til rad:', avfallData);  // Debugging: Sjekk at data er lagt til
  oppdaterGraf();  // Oppdater grafen automatisk
}

// Oppdaterer data i tabellen
function oppdaterData(input, index) {
  avfallData[index] = parseInt(input.value) || 0;
  console.log(`Oppdatert data på indeks ${index}:`, avfallData);  // Debugging: Sjekk dataendringer
}

// Beregner total avfall
function beregnSum() {
  const total = avfallData.reduce((sum, kg) => sum + kg, 0);
  document.getElementById("totalAvfall").innerText = `Total avfall: ${total} kg`;
  beregnStrom(total);
}

// Beregner hvor mye strøm som kan produseres
function beregnStrom(totalKg) {
  const kWhPerKg = 0.5; // Estimert energi produsert per kg avfall
  const totalKWh = (totalKg * kWhPerKg).toFixed(2);
  document.getElementById("stromProduksjon").innerText = `Estimert strømproduksjon: ${totalKWh} kWh`;
}

// Oppdater grafen basert på tabellen
function oppdaterGraf() {
  console.log('Data før oppdatering av graf:', avfallData);  // Debugging: Sjekk innholdet i avfallData før oppdatering
  if (graf) {
    graf.data.labels = avfallData.map((_, index) => `Dag ${index + 1}`);
    graf.data.datasets[0].data = avfallData;
    graf.update();
    console.log('Graf oppdatert med data:', avfallData);  // Debugging: Bekreft at grafen er oppdatert
  } else {
    console.log('Graf er ikke initialisert enda.');
  }
}

// Sørg for at grafen blir initialisert når siden lastes
window.onload = function() {
  lagGraf();
};
