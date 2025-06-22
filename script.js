// SHUFFLE CARDS ON PAGE LOAD
const gameBoard = document.getElementById('game-board');
const allCards = Array.from(gameBoard.children);

// Fisher-Yates Shuffle
function shuffleCards() {
  for (let i = allCards.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    gameBoard.appendChild(allCards[j]);
  }
}

shuffleCards();

const cards = document.querySelectorAll('.card');
let flippedCards = [];
let lockBoard = false;
let moveCount = 0;
let matchedPairs = 0;

const moveDisplay = document.getElementById('move-count');
const timerDisplay = document.getElementById('timer');

let seconds = 0;
let timer;
let gameStarted = false;
const timerDisplay = document.getElementById("timer");

function startTimer() {
  timer = setInterval(() => {
    seconds++;
    timerDisplay.textContent = `Time: ${seconds}s`;
  }, 1000);
}

function stopTimer() {
  clearInterval(timer);
}

function startTimer() {
  timer = setInterval(() => {
    seconds++;
    timerDisplay.textContent = `Time: ${seconds}s`;
  }, 1000);
}

function stopTimer() {
  clearInterval(timer);
}

cards.forEach(card => {
  card.addEventListener('click', () => {
    if (lockBoard) return;
    if (flippedCards.includes(card)) return;

    // Start timer on first move
    if (!gameStarted) {
      gameStarted = true;
      startTimer();
    }

    card.querySelector('.card-inner').style.transform = 'rotateY(180deg)';
    flippedCards.push(card);

    if (flippedCards.length === 2) {
      moveCount++;
      moveDisplay.textContent = `Moves: ${moveCount}`;

      const card1 = flippedCards[0].querySelector('.card-front').textContent;
      const card2 = flippedCards[1].querySelector('.card-front').textContent;

      if (card1 === card2) {
        matchedPairs++;
        flippedCards = [];

        // Check for win
        if (matchedPairs === 8) {
          stopTimer();
          setTimeout(() => {
            alert(`🎉 You won in ${moveCount} moves and ${seconds} seconds!`);
          }, 500);
        }
      } else {
        lockBoard = true;
        setTimeout(() => {
          flippedCards.forEach(card => {
            card.querySelector('.card-inner').style.transform = 'rotateY(0deg)';
          });
          flippedCards = [];
          lockBoard = false;
        }, 1000);
      }
    }
  });
});

document.getElementById('restart-btn').addEventListener('click', () => {
  // Reset values
  flippedCards = [];
  moveCount = 0;
  matchedPairs = 0;
  seconds = 0;
  gameStarted = false;
  moveDisplay.textContent = `Moves: 0`;
  timerDisplay.textContent = `Time: 0s`;

  // Flip all cards face down
  cards.forEach(card => {
    card.querySelector('.card-inner').style.transform = 'rotateY(0deg)';
  });

  // Shuffle cards again
  shuffleCards();

  // Stop any existing timer
  stopTimer();
});

document.getElementById('gameover-btn').addEventListener('click', () => {
  stopTimer();
  alert(`🛑 Game Over!\nYou made ${moveCount} moves in ${seconds} seconds.`);
});
