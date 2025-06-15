const quoteEl = document.getElementById('quote');
const inputEl = document.getElementById('input');
const typeSelect = document.getElementById('typeSelect');
const modeSelect = document.getElementById('modeSelect');

let currentMode = 'normal';
let allData = {};
let questionData = {};
let currentData = [];
let currentItem = null;
const skipBtn = document.getElementById('skipBtn');

skipBtn.addEventListener('click', () => {
  inputEl.value = '';
  startTest(); // Load a new question or command
});


// Populate dropdown based on selected data source
function populateTypeOptions(dataObj) {
  typeSelect.innerHTML = '';
  for (let key in dataObj) {
    const option = document.createElement('option');
    option.value = key;
    option.textContent = key.charAt(0).toUpperCase() + key.slice(1);
    typeSelect.appendChild(option);
  }
}

// Get a new random item (command or question)
function getRandomItem() {
  if (!currentData.length) return null;
  let newItem;
  do {
    newItem = currentData[Math.floor(Math.random() * currentData.length)];
  } while (newItem === currentItem && currentData.length > 1);
  return newItem;
}

// Start or restart the typing test
function startTest() {
  const selectedType = typeSelect.value;
  currentData = currentMode === 'qa' ? questionData[selectedType] || [] : allData[selectedType] || [];

  if (!currentData.length) {
    quoteEl.textContent = 'No data available.';
    return;
  }

  currentItem = getRandomItem();

  quoteEl.textContent =
    currentMode === 'qa'
      ? `Q: ${currentItem.question}`
      : currentItem;

  inputEl.value = '';
  inputEl.style.display = 'block';
}

// Handle Enter key for validation
inputEl.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    const userInput = inputEl.value.trim();
    const expected =
      currentMode === 'qa'
        ? currentItem.answer.trim()
        : currentItem.trim();

    if (userInput === expected) {
      inputEl.value = '';
      inputEl.style.display = 'none';
      startTest(); // load new question/command
    }
  }
});

// Change type (dotnet/react/git)
typeSelect.addEventListener('change', () => {
  startTest();
});

// Change mode (typing / QA)
modeSelect.addEventListener('change', () => {
  currentMode = modeSelect.value;
  populateTypeOptions(currentMode === 'qa' ? questionData : allData);
  startTest();
});

// Load both JSON files
Promise.all([
  fetch('data.json').then(res => res.json()),
  fetch('questions.json').then(res => res.json())
])
  .then(([data, qData]) => {
    allData = data;
    questionData = qData;

    populateTypeOptions(allData); // default
    startTest();
  })
  .catch(error => {
    console.error('Error loading data:', error);
    quoteEl.textContent = 'Failed to load data.';
  });
