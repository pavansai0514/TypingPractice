const quoteEl = document.getElementById('quote');
const inputEl = document.getElementById('input');
const typeSelect = document.getElementById('typeSelect');

let allData = {};
let currentData = [];
let quote = '';

function getRandomQuote() {
  let newQuote;
  do {
    newQuote = currentData[Math.floor(Math.random() * currentData.length)];
  } while (newQuote === quote && currentData.length > 1);
  return newQuote;
}

function startTest() {
  const selectedType = typeSelect.value;
  currentData = allData[selectedType] || [];
  if (currentData.length === 0) return;

  quote = getRandomQuote();
  quoteEl.textContent = quote;
  inputEl.value = '';
  inputEl.style.display = 'block';


}



inputEl.addEventListener('input', () => {
  if (inputEl.value.trim() === quote.trim()) {

    inputEl.value = '';
    inputEl.style.display = 'none';
    startTest(); // no delay now, loads instantly
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
