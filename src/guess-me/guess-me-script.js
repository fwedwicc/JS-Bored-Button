let secretNumber;
let countingInterval;

function startCounting() {
  countingInterval = setInterval(updateCounter, 10);
}

function stopCounting() {
  clearInterval(countingInterval);
}

function openModal() {
  document.getElementById('myModal').style.display = 'block';
}

function closeModal() {
  document.getElementById('myModal').style.display = 'none';
}

function submitGuess() {
  // Stop the counting when the user submits a guess
  stopCounting();

  // Get user's guess
  const guessInput = document.getElementById('guessInput');
  const guessedNumber = parseInt(guessInput.value, 10);

  // Display the correct number immediately
  document.getElementById('counter').textContent = secretNumber;

  // Check if the guess is correct
  if (guessedNumber === secretNumber) {
    openModal(); // Show the modal
  } else {
    alert(`Sorry, the correct number was ${secretNumber}. Try again!`);
  }

  // Clear the input field
  guessInput.value = '';

  // Generate a new secret number for the next round
  secretNumber = Math.floor(Math.random() * 100) + 1;

  // Reset the counter and start counting again
  document.getElementById('counter').textContent = '0';
  startCounting();
}

function updateCounter() {
  const counterElement = document.getElementById('counter');
  const currentNumber = parseInt(counterElement.textContent, 10);
  const randomIncrement = Math.floor(Math.random() * 3) + 1; // Random increment between 1 and 3

  // Stop counting if the current number reaches the guessed number
  if (currentNumber === secretNumber) {
    stopCounting();
  }

  // Randomly increment or decrement the counter
  const newNumber = Math.random() < 0.5 ? currentNumber + randomIncrement : currentNumber - randomIncrement;

  // Ensure the new number is within the range of 1 to 100
  counterElement.textContent = Math.min(100, Math.max(1, newNumber));
}

// Generate a secret number between 1 and 100 for the first round
secretNumber = Math.floor(Math.random() * 100) + 1;

// Start counting animation for the first round
startCounting();
