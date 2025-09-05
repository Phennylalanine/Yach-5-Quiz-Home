// --- Game Variables ---
let currentChar = '';
let currentLevel = 1;
let revealTimer = null;

let currentQuestionIndex = 0;
let score = 0;
let combo = 0;
let answered = false;

const maxComboForBonus = 5;

const keys = 'abcdefghijklmnopqrstuvwxyz'.split('');
const keyMap = {};
keys.forEach(k => keyMap[k] = 'key-' + k);

// DOM Elements
const letterDisplay = document.getElementById("letterDisplay");
const pointsEl = document.getElementById("points");
const comboEl = document.getElementById("combo");
const levelEl = document.getElementById("level");
const confettiCanvas = document.getElementById("confettiCanvas");
const ctx = confettiCanvas.getContext("2d");

let confettiParticles = [];

let selectedLevel = null;

const startBtn = document.getElementById("startBtn");

// Attach event listeners to level select buttons
document.querySelectorAll(".level-select").forEach(button => {
  button.addEventListener("click", () => {
    selectLevel(parseInt(button.textContent.replace("Level ", "")));
  });
});

// Start button listener
startBtn.addEventListener("click", () => {
  if (selectedLevel !== null) {
    document.getElementById("startScreen").style.display = "none";
    document.getElementById("gameScreen").style.display = "block";
    startGame(selectedLevel);
  }
});

// Keyboard input listener (score system and penalty, no XP/level)
window.addEventListener("keydown", (e) => {
  if (!currentChar) return;
  const pressedKey = e.key.toLowerCase();
  const targetKey = currentChar.toLowerCase();
  if (pressedKey === targetKey) {
    clearTimeout(revealTimer);
    handleCorrectAnswer();
  } else if (keys.includes(pressedKey)) {
    // Wrong key pressed
    combo = 0;
    score = Math.max(0, score - 1); // Prevent negative score
    updateStats();
  }
});

// Functions

function selectLevel(level) {
  selectedLevel = level;

  // Highlight selected button
  const buttons = document.querySelectorAll(".level-select");
  buttons.forEach(btn => btn.classList.remove("selected"));

  const selectedButton = buttons[level - 1]; // Level 1 = index 0
  if (selectedButton) {
    selectedButton.classList.add("selected");
  }

  // Enable the start button
  startBtn.disabled = false;
}

function startGame(levelNumber) {
  currentLevel = levelNumber;
  currentChar = '';
  score = 0;
  combo = 0;
  answered = false;
  updateStats();
  nextChar();
}

function nextChar() {
  removeHighlight();
  currentChar = keys[Math.floor(Math.random() * keys.length)];
  letterDisplay.textContent = currentLevel === 1 ? currentChar : '';
  speak(currentChar);
  if (currentLevel === 1) {
    highlightKey(currentChar);
  } else {
    revealTimer = setTimeout(() => highlightKey(currentChar), 5000);
  }
}

function highlightKey(char) {
  removeHighlight();
  const id = keyMap[char.toLowerCase()];
  const el = document.getElementById(id);
  if (el) el.classList.add('highlight');
}

function removeHighlight() {
  document.querySelectorAll('.key').forEach(el => el.classList.remove('highlight'));
}

function handleCorrectAnswer() {
  combo++;
  score++;

  // Combo bonus logic (if you want to implement special effects or messaging at certain combos, do it here)

  updateStats();
  nextChar();
}

function updateStats() {
  pointsEl.textContent = score;
  comboEl.textContent = combo;
  // If you want to show level somewhere, you can remove this line or keep it for currentLevel
  levelEl.textContent = currentLevel;
}

function speak(text) {
  const utter = new SpeechSynthesisUtterance(text);
  utter.lang = 'en-US';
  speechSynthesis.speak(utter);
}

function showFloatingXP(text) {
  // Function kept for compatibility, but not used since XP is removed
}

function triggerConfetti() {
  for (let i = 0; i < 100; i++) {
    confettiParticles.push({
      x: Math.random() * window.innerWidth,
      y: Math.random() * -20,
      r: Math.random() * 6 + 2,
      d: Math.random() * 12.5 + 1,
      color: `hsl(${Math.floor(Math.random() * 360)}, 100%, 70%)`,
      tilt: Math.random() * 10 - 10,
    });
  }
}

function drawConfetti() {
  ctx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
  confettiParticles.forEach((p) => {
    ctx.beginPath();
    ctx.fillStyle = p.color;
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fill();
  });
  updateConfetti();
}

function updateConfetti() {
  for (let i = 0; i < confettiParticles.length; i++) {
    const p = confettiParticles[i];
    p.y += p.d;
    p.x += Math.sin(p.tilt) * 2;
    if (p.y > confettiCanvas.height) {
      confettiParticles.splice(i, 1);
      i--;
    }
  }
}

function resizeCanvas() {
  confettiCanvas.width = window.innerWidth;
  confettiCanvas.height = window.innerHeight;
}
window.addEventListener("resize", resizeCanvas);
resizeCanvas();
setInterval(drawConfetti, 30);
