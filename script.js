var text = [
  "I develop websites",
  "I build APIs",
  "I create Discord bots",
  "I automate tasks",
  "I perform systems administration",
  "I manage servers",
  "I optimize performance",
  "I implement security measures",
  "I troubleshoot and debug issues",
  "I maintain regular backups",
  "I customize and manage dotfiles",
  "I host and maintain services",
  "I deploy scalable applications",
  "I build command-line tools",
  "I improve system reliability",
  "I write clear documentation",
  "I design efficient workflows",
  "I publish open-source software",
  "I contribute to FOSS projects",
  "I streamline development processes",
  "I write maintainable code",
  "I maintain CI/CD pipelines",
  "I monitor system health",
  "I manage DNS and domains",
  "I build secure authentication systems",
  "I know how to exit Vim",
  "I turn computers off and on... again",
  "I use Arch btw",
  "I like the command line",
  "I write descriptive commit messages",
  "I document my code",
  "I harden Linux systems",
  "I debug complex issues",
  "I engineer automation solutions",
  "I architect scalable backends",
  "I optimize server uptime",
  "I deploy containerized applications",
  "I do a lot",
];
var counter = 0;
var elem = document.getElementById("changeText");
change();
var inst = setInterval(change, 2000);

function change() {
  elem.innerHTML = text[counter];
  counter++;
  if (counter >= text.length) {
    counter = 0;
  }
}

// current year
document.getElementById("current__year").innerHTML = new Date().getFullYear();

// When the user clicks on a navbar link, execute scrollToSection
document.querySelectorAll(".scroll").forEach(function (link) {
  link.addEventListener("click", scrollToSection);
});

// Smoothly scroll to the target section, adjusting for the navbar height
function scrollToSection(event) {
  event.preventDefault();

  const navbarHeight = navbar.offsetHeight; // Get the height of the navbar
  const targetId = this.getAttribute("href"); // Get the href value of the clicked link

  // Calculate the offset position of the target section, subtracting the navbar height
  const targetOffset =
    document.querySelector(targetId).offsetTop - (navbarHeight + 50);

  // Scroll to the target section with a smooth behavior
  window.scrollTo({
    top: targetOffset,
    behavior: "smooth",
  });
}

// Get botterfly stats
async function fetchBotterflyStats() {
  try {
    const res = await fetch("http://davisstanko.com/botstats");
    const stats = await res.json();

    // Create a more engaging stats display
    const statsElement = document.getElementById("botterfly-stats");
    statsElement.innerHTML = `
        <span>🚀 ${stats.guilds} servers</span> • 
        <span>👥 ${stats.users} users</span>
      `;

    // Add a subtle animation
    statsElement.style.animation = "pulse 2s infinite";
  } catch (err) {
    console.error("Failed to load bot stats:", err);
    document.getElementById("botterfly-stats").innerText =
      "Bot stats currently unavailable.";
  }
}

// Run once on page load
fetchBotterflyStats();

//TICTACTOE CODE
const statusDisplay = document.querySelector(".tictactoe__status");

let gameActive = true;
let currentPlayer = "X";
let gameState = ["", "", "", "", "", "", "", "", ""];

const winningMessage = () => `Player ${currentPlayer} has won!`;
const drawMessage = () => `Game ended in a draw!`;
const currentPlayerTurn = () => `It's ${currentPlayer}'s turn`;

statusDisplay.innerHTML = currentPlayerTurn();

const winningConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function handleCellPlayed(clickedCell, clickedCellIndex) {
  gameState[clickedCellIndex] = currentPlayer;
  clickedCell.innerHTML = currentPlayer;
}

function handlePlayerChange() {
  currentPlayer = currentPlayer === "X" ? "O" : "X";
  statusDisplay.innerHTML = currentPlayerTurn();
}

function handleResultValidation() {
  let roundWon = false;
  for (let i = 0; i <= 7; i++) {
    const winCondition = winningConditions[i];
    let a = gameState[winCondition[0]];
    let b = gameState[winCondition[1]];
    let c = gameState[winCondition[2]];
    if (a === "" || b === "" || c === "") {
      continue;
    }
    if (a === b && b === c) {
      roundWon = true;
      break;
    }
  }

  if (roundWon) {
    statusDisplay.innerHTML = winningMessage();
    gameActive = false;
    return;
  }

  let roundDraw = !gameState.includes("");
  if (roundDraw) {
    statusDisplay.innerHTML = drawMessage();
    gameActive = false;
    return;
  }

  handlePlayerChange();
}

function handleCellClick(clickedCellEvent) {
  const clickedCell = clickedCellEvent.target;
  const clickedCellIndex = parseInt(
    clickedCell.getAttribute("data-cell-index")
  );

  if (gameState[clickedCellIndex] !== "" || !gameActive) {
    return;
  }

  handleCellPlayed(clickedCell, clickedCellIndex);
  handleResultValidation();
}

function tictactoeRestartGame() {
  gameActive = true;
  currentPlayer = "X";
  gameState = ["", "", "", "", "", "", "", "", ""];
  statusDisplay.innerHTML = currentPlayerTurn();
  document.querySelectorAll(".cell").forEach((cell) => (cell.innerHTML = ""));
}

document
  .querySelectorAll(".cell")
  .forEach((cell) => cell.addEventListener("click", handleCellClick));

// block-bounce
const player = document.getElementById("block-bounce-player");
const enemy = document.getElementById("block-bounce-enemy");
const gameContainer = document.getElementById("block-bounce");
const scoreDisplay = document.getElementById("block-bounce-score");
const slider = document.getElementById("block-bounce-speed");

let jumping = false;
let lastJumpTime = 0;
let score = 0;
let enemySpeed = 2;

slider.oninput = function () {
  enemySpeed = this.value;
  enemySpeed = Math.round(enemySpeed);
};

gameContainer.addEventListener("click", () => {
  const currentTime = Date.now();
  if (!jumping && currentTime - lastJumpTime >= 1000) {
    jumping = true;
    lastJumpTime = Date.now();

    player.style.transition = "transform 0.5s ease-out";
    player.style.transform = "translateY(-" + jumpHeight + "px)";
    setTimeout(() => {
      player.style.transition = "transform 0.5s ease-in";
      player.style.transform = "translateY(0px)";
      jumping = false;
    }, 500);
  }
});

function isDead() {
  const playerRect = player.getBoundingClientRect();
  const enemyRect = enemy.getBoundingClientRect();
  return (
    playerRect.left < enemyRect.right &&
    playerRect.right > enemyRect.left &&
    playerRect.top < enemyRect.bottom &&
    playerRect.bottom > enemyRect.top
  );
}

function gameLoop() {
  const enemyRight = parseInt(getComputedStyle(enemy).right);
  const containerWidth = gameContainer.offsetWidth;

  jumpHeight = 100;

  if (isDead()) {
    enemy.style.right = "0px";
    score = 0;
    scoreDisplay.innerHTML = "Score: 0";
  } else if (enemyRight + 50 < containerWidth) {
    enemy.style.right = enemyRight + enemySpeed + "px";
  } else {
    enemy.style.right = "0px";
    score++;
    // fizzbuzz
    if (score % 3 == 0 && score % 5 == 0) {
      scoreDisplay.innerHTML = "Score: FizzBuzz";
    }
    // fizz
    else if (score % 3 == 0) {
      scoreDisplay.innerHTML = "Score: Fizz";
    }
    // buzz
    else if (score % 5 == 0) {
      scoreDisplay.innerHTML = "Score: Buzz";
    }
    // normal
    else {
      scoreDisplay.innerHTML = "Score: " + score;
    }
  }

  requestAnimationFrame(gameLoop);
}

gameLoop();
