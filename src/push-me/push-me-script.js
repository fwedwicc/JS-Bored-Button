let timerInterval;
let startTime;
let elapsedTime = 0;
let highestScore = parseFloat(localStorage.getItem('highestScore')) || 0;

function updateTimer() {
  const formattedTime = formatTime(elapsedTime);
  document.getElementById('timer').innerText = formattedTime;
}

function formatTime(milliseconds) {
  const seconds = (milliseconds / 1000).toFixed(3);
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  const millisecondsFormatted = Math.floor((seconds % 1) * 1000);

  // Pad single-digit seconds and milliseconds with leading zeros
  const formattedTime = `${minutes}:${remainingSeconds.toString().padStart(2, '0')}:${millisecondsFormatted.toString().padStart(3, '0')}`;
  return formattedTime;
}


function updateHighestScore() {
  document.getElementById('highestScore').innerText = formatTime(highestScore * 1000); // Convert highestScore to milliseconds
}

function startGame() {
  startTime = new Date().getTime();
  document.getElementById('startButton').innerText = 'Push';
  timerInterval = setInterval(function () {
    elapsedTime = new Date().getTime() - startTime;
    updateTimer();
  }, 10);

  // Update highest score in real-time
  updateHighestScore();
}

function endGame() {
  clearInterval(timerInterval);
  document.getElementById('startButton').innerText = 'Push';
  openModal();
  const heldTime = (elapsedTime / 1000).toFixed(3);
  document.getElementById('duration').innerText = formatTime(elapsedTime);
  if (parseFloat(heldTime) > highestScore) {
    highestScore = parseFloat(heldTime);
    localStorage.setItem('highestScore', highestScore);
    // Update highest score in real-time
    updateHighestScore();
  }
  resetTimer();
}

function resetTimer() {
  elapsedTime = 0;
  updateTimer();
}

function openModal() {
  const modal = document.getElementById('myModal');
  modal.style.display = 'flex';
  setTimeout(() => {
    modal.classList.add('show');
  }, 50);
}

function closeModal() {
  const modal = document.getElementById('myModal');
  modal.classList.remove('show');
  setTimeout(() => {
    modal.style.display = 'none';
  }, 500);
}

// Display initial highest score
updateHighestScore();
