let clicks = 0;
let bestScore = localStorage.getItem('bestScore') || 0;
const clickSound = new Audio('sounds/click.mp3');
const gameOverSound = new Audio('sounds/gameover.mp3');
const clickButton = document.getElementById('click-button');
const clickCountDisplay = document.getElementById('click-count');
const timerDisplay = document.getElementById('timer');
const startButton = document.getElementById('start-button');
const bestScoreDisplay = document.querySelectorAll('.game__score span')[0];

clickButton.style.display = 'none';
bestScoreDisplay.textContent = bestScore;


const backgroundMusic = new Audio('sounds/background.mp3');
backgroundMusic.loop = true;
backgroundMusic.volume = 0.3; 
gameOverSound.volume = 1;
clickSound.volume = 5;
function startGame() {
  backgroundMusic.play().catch((e) => console.log('Audio blocked by browser:', e));
  startButton.style.display = 'none';
  clickButton.style.display = 'block';
  clickButton.disabled = true;
  clickButton.textContent = 'Get Ready...';
  clickButton.style.backgroundColor = 'black';

  let countdown = 3;
  timerDisplay.textContent = countdown;

  const countdownInterval = setInterval(() => {
    countdown--;
    if (countdown > 0) {
      timerDisplay.textContent = countdown;
    } else {
      clearInterval(countdownInterval);
      timerDisplay.textContent = 10;
      beginClickPhase();
    }
  }, 1000);
}

function beginClickPhase() {
  clicks = 0;
  clickCountDisplay.textContent = clicks;

  clickButton.disabled = false;
  clickButton.textContent = 'Click!!!';
  clickButton.style.backgroundColor = 'red';

  let timeLeft = 10;
  timerDisplay.textContent = timeLeft;

  const clickHandler = () => {
    clicks++;
    clickCountDisplay.textContent = clicks;
    clickSound.currentTime = 0;
    clickSound.play();
  };

  clickButton.addEventListener('click', clickHandler);

  const timerInterval = setInterval(() => {
    timeLeft--;
    timerDisplay.textContent = timeLeft;
    if (timeLeft < 0) {
      gameOverSound.play();
      clearInterval(timerInterval);
      clickButton.removeEventListener('click', clickHandler);
      clickButton.style.display = 'none';

      if (clicks > bestScore) {
        bestScore = clicks;
        localStorage.setItem('bestScore', bestScore);
        bestScoreDisplay.textContent = bestScore;
        alert(`NEW RECORD! CLICS: ${clicks}`);
      } else {
        alert(`GAME OWER! CLICS: ${clicks}`);
      }

      startButton.style.display = 'block';
    }
  }, 1000);
}

window.onload = () => {
  clickCountDisplay.textContent = clicks;
  timerDisplay.textContent = 10;
};
