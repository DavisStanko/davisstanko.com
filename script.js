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
  });
});



// Slideshow
let slideIndex = 1;
showSlides(slideIndex);

// Next/previous controls
function plusSlides(n) {
    showSlides(slideIndex += n);
}

function showSlides(n) {
    let i;
    let slides = document.getElementsByClassName("mySlides");
    if (n > slides.length) { slideIndex = 1; }
    if (n < 1) { slideIndex = slides.length; }
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    slides[slideIndex - 1].style.display = "block";
}

//POPUP CODE
// When the user clicks on Monero, open the Monero popup
function moneropopup() {
  var popup = document.getElementById("moneropopup");
  popup.classList.toggle("show");
  var popup = document.getElementById("dimmer");
  popup.classList.toggle("show");
}

// When the user clicks on Bitcoin, open the Bitcoin popup
function bitcoinpopup() {
    var popup = document.getElementById("bitcoinpopup");
    popup.classList.toggle("show");
    var popup = document.getElementById("dimmer");
    popup.classList.toggle("show");
}

//  When the user clicks on PayPal, open the PayPal popup
  function paypalpopup() {
    var popup = document.getElementById("paypalpopup");
    popup.classList.toggle("show");
    var popup = document.getElementById("dimmer");
    popup.classList.toggle("show");
}

// Close ALL popups if the user clicks outside of it
function hideall () {
  var elems = document.querySelectorAll(".show");

  [].forEach.call(elems, function(el) {
      el.classList.remove("show");
  });
}

//TICTACTOE CODE
const statusDisplay = document.querySelector('.game--status');

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

function handleRestartGame() {
    gameActive = true;
    currentPlayer = "X";
    gameState = ["", "", "", "", "", "", "", "", ""];
    statusDisplay.innerHTML = currentPlayerTurn();
    document.querySelectorAll('.cell').forEach(cell => cell.innerHTML = "");
}


document.querySelectorAll('.cell').forEach(cell => cell.addEventListener('click', handleCellClick)); 

//LiChess API
fetch('https://lichess.org/api/user/davisstanko')
  .then(response => response.json())
  .then(data => {

    // Extract and sort the ratings
    const ratings = [
      { name: 'Rapid', rating: data.perfs.rapid.rating },
      { name: 'Blitz', rating: data.perfs.blitz.rating },
      { name: 'Bullet', rating: data.perfs.bullet.rating },
      { name: 'UltraBullet', rating: data.perfs.ultraBullet.rating },
      { name: 'Correspondence', rating: data.perfs.correspondence.rating },
      { name: 'Classical', rating: data.perfs.classical.rating },
      { name: 'Puzzle', rating: data.perfs.puzzle.rating },
    ];
    ratings.sort((a, b) => b.rating - a.rating);

    // Update the HTML elements with the sorted ratings
    const ratingsList = document.getElementById('ratings-list');
    ratings.forEach(rating => {
      const listItem = document.createElement('li');
      listItem.textContent = `${rating.name}: ${rating.rating}`;
      ratingsList.appendChild(listItem);
    });

    document.getElementById('lichess-stats').style.display = 'block';
  })
  .catch(error => {
    console.error('Error:', error);
  });

