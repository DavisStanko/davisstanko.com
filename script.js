var text = [
    "I make websites",
    "I develop Discord bots",
    "I build APIs",
    "I write scripts",
    "I perform systems administration",
    "I harden systems",
    "I know how to exit Vim",
    "I program",
    "I turn computers off and on... again",
    "I use Arch btw",
    "I like the command line",
    "I publish FOSS",
    "I host services",
    "I manage servers",
    "I write descriptive commit messages",
    "I troubleshoot issues",
    "I automate tasks",
    "I document my code",
    "I customize dotfiles",
    "I implement security measures",
    "I optimize performance",
    "I maintain backups",
    "I do a lot"
];
var counter = 0
var elem = document.getElementById("changeText")
change()
var inst = setInterval(change, 2000)

function change() {
    elem.innerHTML = text[counter]
    counter++
    if (counter >= text.length) {
        counter = 0
    }
}

// current year
document.getElementById("current__year").innerHTML = new Date().getFullYear();

// When the user clicks on a navbar link, execute scrollToSection
document.querySelectorAll(".scroll").forEach(function(link) {
    link.addEventListener("click", scrollToSection);
});

// Smoothly scroll to the target section, adjusting for the navbar height
function scrollToSection(event) {
event.preventDefault();

const navbarHeight = navbar.offsetHeight; // Get the height of the navbar
const targetId = this.getAttribute("href"); // Get the href value of the clicked link

// Calculate the offset position of the target section, subtracting the navbar height
const targetOffset = document.querySelector(targetId).offsetTop - (navbarHeight + 50);

// Scroll to the target section with a smooth behavior
window.scrollTo({
    top: targetOffset,
    behavior: "smooth"
});
}

//TICTACTOE CODE
const statusDisplay = document.querySelector('.tictactoe__status');

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
    [2, 4, 6]
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
        if (a === '' || b === '' || c === '') {
            continue;
        }
        if (a === b && b === c) {
            roundWon = true;
            break
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
    const clickedCellIndex = parseInt(clickedCell.getAttribute('data-cell-index'));

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
    document.querySelectorAll('.cell').forEach(cell => cell.innerHTML = "");
}


document.querySelectorAll('.cell').forEach(cell => cell.addEventListener('click', handleCellClick)); 