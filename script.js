const quoteEl = document.getElementById('quote');
const inputEl = document.getElementById('input');
const wpmEl = document.getElementById('wpm');
const accuracyEl = document.getElementById('accuracy');

let quote = '';


const quotes = [
  "dotnet ef migrations add InitialCreate",
  "dotnet ef database update",
  "dotnet ef migrations remove"
 
];

function getRandomQuote() {
  return quotes[Math.floor(Math.random() * quotes.length)];
}

function startTest() {
  quote = getRandomQuote();
  quoteEl.textContent = quote;
  inputEl.value = '';
  inputEl.style.display = 'block';
  wpmEl.textContent = 0;
  accuracyEl.textContent = 0;
}

function calculateResults() {
  const inputText = inputEl.value.trim();
  const inputWords = inputText.split(/\s+/).length;

  // Estimate WPM by assuming average word length is 5 characters
  const wpm = Math.round((inputText.length / 5));
  
  // Accuracy calculation
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
    startTest(); // Immediately load the next quote
  }
});

startTest(); // Initialize the first quote
