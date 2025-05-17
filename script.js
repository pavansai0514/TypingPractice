const quoteEl = document.getElementById('quote');
const inputEl = document.getElementById('input');
const wpmEl = document.getElementById('wpm');
const accuracyEl = document.getElementById('accuracy');
const typeSelect = document.getElementById('typeSelect');

let allData = {};
let currentData = [];
let quote = '';

function getRandomQuote() {
  return currentData[Math.floor(Math.random() * currentData.length)];
}

function startTest() {
  const selectedType = typeSelect.value;
  currentData = allData[selectedType] || [];
  if (currentData.length === 0) return;

  quote = getRandomQuote();
  quoteEl.textContent = quote;
  inputEl.value = '';
  inputEl.style.display = 'block';
  wpmEl.textContent = 0;
  accuracyEl.textContent = 0;
}

function calculateResults() {
  const inputText = inputEl.value.trim();
  const wpm = Math.round((inputText.length / 5));
  let correct = 0;
  for (let i = 0; i < inputText.length; i++) {
    if (inputText[i] === quote[i]) correct++;
  }
  const accuracy = Math.round((correct / quote.length) * 100);

  wpmEl.textContent = isNaN(wpm) ? 0 : wpm;
  accuracyEl.textContent = isNaN(accuracy) ? 0 : accuracy;
}

inputEl.addEventListener('input', () => {
  if (inputEl.value === quote) {
    calculateResults();
    inputEl.value = '';
    inputEl.style.display = 'none';
    startTest(); // Immediately load next item
  }
});

typeSelect.addEventListener('change', () => {
  inputEl.style.display = 'block';
  startTest();
});

fetch('data.json')
  .then(response => response.json())
  .then(data => {
    allData = data;
    currentData = allData["quotes"]; // default
    startTest();
  })
  .catch(error => console.error("Error loading data:", error));
