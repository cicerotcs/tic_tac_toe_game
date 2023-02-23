const boxes = document.querySelectorAll(".box");
const checkbox = document.querySelector("input");
const label = document.querySelector("label");

const block2 = document.querySelector(".block2");

const player = document.querySelector(".player");
const player1 = document.querySelector(".player1");
const player2 = document.querySelector(".player2");
const computer = document.querySelector(".computer");

const ticChoice = document.querySelector(".tic-choice");

const playerTic = document.querySelector(".player .info-tic");
const player1Tic = document.querySelector(".player1 .info-tic");
const player2Tic = document.querySelector(".player2 .info-tic");
const computerTic = document.querySelector(".computer .info-tic");

const playerScore = document.querySelector(".player .score");
const player1Score = document.querySelector(".player1 .score");
const player2Score = document.querySelector(".player2 .score");
const computerScore = document.querySelector(".computer .score");
const tie = document.querySelector(".tie .score");

const ticX = document.querySelector(".tic-x");
const ticO = document.querySelector(".tic-o");

let gameArr = ["", "", "", "", "", "", "", ""];

let info = null;

if (localStorage.getItem("playerInfo") !== null) {
  info = JSON.parse(localStorage.getItem("playerInfo"));
}

let actualPlayer = null;

let playersInfo = {
  firstPlayer: null,
  winner: null,
  player: {
    name: "player",
    score: info && info.player.score,
    tic: null,
    nextPlayer: false,
  },
  player1: {
    name: "player1",
    score: info && info.player1.score,
    tic: null,
    nextPlayer: false,
  },
  player2: {
    name: "player2",
    score: info && info.player2.score,
    tic: null,
    nextPlayer: false,
  },
  computer: {
    name: "computer",
    score: info && info.computer.score,
    tic: null,
    nextPlayer: false,
  },
  tie: {
    score: info && info.tie.score,
  },
};

// this function allows the player choose their tic if decided to player against the computer
function chooseTic(event) {
  let { player, computer, firstPlayer } = playersInfo;
  let box = event.target;
  if (box.dataset.choice === "x") {
    computerTic.innerHTML = ticO.dataset.choice;
  } else {
    computerTic.innerHTML = ticX.dataset.choice;
  }
  playerTic.innerHTML = box.dataset.choice;
  player.tic = box.dataset.choice;
  computer.tic = computerTic.innerHTML;
  ticChoice.style = "display: none";

  firstPlayer = selectPlayer();
  firstPlayer.nextPlayer = true;

  if (firstPlayer.name === "computer") {
    computerPlayer();
  }
}

// this function will automatically choose a tic for each player if the player decides to play with another person
function generateTicForEachPlayer() {
  const { player1, player2 } = playersInfo;

  if (checkbox.checked) {
    const num = Math.floor(Math.random() * 2);
    if (num === 0) {
      player1.tic = "o";
      player2.tic = "x";
    } else {
      player1.tic = "x";
      player2.tic = "o";
    }
  } else {
    player1.tic = null;
    player2.tic = null;
  }

  player1Tic.innerHTML = player1.tic;
  player2Tic.innerHTML = player2.tic;
}

// function to check if there is a winner in the game, checking all the possible combinations
function checkWinner(currentPlayer) {
  const winningCombos = [
    // horizontal
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    // vertical
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    // diagonal
    [0, 4, 8],
    [2, 4, 6],
  ];

  let winner = "";
  for (let combo of winningCombos) {
    const [a, b, c] = combo;

    if (
      gameArr[a] !== "" &&
      gameArr[a] === gameArr[b] &&
      gameArr[a] === gameArr[c]
    ) {
      winner = gameArr[a];
      break;
    }
  }

  if (winner) {
    playersInfo.winner = currentPlayer.name;
    currentPlayer.score += 1;
    setTimeout(() => {
      alert(`${currentPlayer.name} wins!`);
    }, 500);

    setTimeout(() => {
      location.reload();
    }, 1500);
  } else if (!gameArr.includes("")) {
    playersInfo.tie.score += 1;
    setTimeout(() => {
      alert("It's a tie!");
    }, 500);
    setTimeout(() => {
      location.reload();
    }, 1500);
  } else {
    console.log("Keep playing...");
  }
  localStorage.setItem("playerInfo", JSON.stringify(playersInfo));
}

function scoreTable() {
  if (info !== null) {
    playerScore.textContent =
      info.player.score === null ? 0 : info.player.score;
    player1Score.textContent =
      info.player1.score === null ? 0 : info.player1.score;
    player2Score.textContent =
      info.player2.score === null ? 0 : info.player2.score;
    computerScore.textContent =
      info.computer.score === null ? 0 : info.computer.score;
    tie.textContent = info.tie.score === null ? 0 : info.tie.score;
  }
}

// main function
function startGame(tic) {
  const { player, player1, player2, computer } = playersInfo;

  if (player.nextPlayer) {
    actualPlayer = player;
  } else if (player1.nextPlayer) {
    actualPlayer = player1;
  } else if (player2.nextPlayer) {
    actualPlayer = player2;
  } else {
    actualPlayer = computer;
  }

  addTicCheckWinnerAndExecuteNextPlayer(tic, actualPlayer);

  if (computer.nextPlayer && playersInfo.winner === null) {
    setTimeout(() => {
      computerPlayer();
    }, 500);
  }
}

// This function will automatically select who is gonna be the first player
function selectPlayer() {
  let num = Math.floor(Math.random() * 2);
  let selectedPlayer = null;
  const { player, player1, player2, computer } = playersInfo;

  if (!checkbox.checked) {
    if (num === 0) {
      selectedPlayer = player;
    } else {
      selectedPlayer = computer;
    }
  } else {
    if (num === 0) {
      selectedPlayer = player1;
    } else {
      selectedPlayer = player2;
    }
  }
  return selectedPlayer;
}

// Function to return the next player
function nextPlayer() {
  const { player, player1, player2, computer } = playersInfo;
  if (!checkbox.checked) {
    if (player.nextPlayer) {
      computer.nextPlayer = true;
      player.nextPlayer = false;
    } else {
      player.nextPlayer = true;
      computer.nextPlayer = false;
    }
  } else {
    if (player1.nextPlayer) {
      player2.nextPlayer = true;
      player1.nextPlayer = false;
    } else {
      player1.nextPlayer = true;
      player2.nextPlayer = false;
    }
  }
}

function addTicCheckWinnerAndExecuteNextPlayer(box, player) {
  box.textContent = player.tic;
  box.classList.add("tic");
  box.style = "pointer-events: none";
  gameArr[box.dataset.tic] = player.tic;
  nextPlayer();
  checkWinner(player);
}

// function to allow the computer play by itself

function computerPlayer() {
  const { computer } = playersInfo;
  let randomIndex = Math.floor(Math.random() * 9);

  for (let i = 0; i < boxes.length; i++) {
    let index = (randomIndex + i) % boxes.length;
    if (boxes[index].textContent === "") {
      addTicCheckWinnerAndExecuteNextPlayer(boxes[index], computer);
      break;
    }
  }
}

// event listeners

ticX.addEventListener("click", chooseTic);
ticO.addEventListener("click", chooseTic);

checkbox.addEventListener("change", () => {
  if (gameArr.includes("x") || gameArr.includes("o")) {
    location.reload();
  }
  let { firstPlayer } = playersInfo;
  if (checkbox.checked) {
    label.innerText = "2P";

    player1.style = "display:inline";
    player2.style = "display:inline";

    block2.style = "display: flex";

    computer.style = "display:none";
    player.style = "display:none";
    ticChoice.style = "display:none";

    firstPlayer = selectPlayer();
    firstPlayer.nextPlayer = true;
  } else {
    label.innerText = "1P";
    computer.style = "display: inline";
    player2.style = "display:none";
    ticChoice.style = "display:inline";
    player1.style = "display:none";
    player.style = "display: inline";

    block2.style = "display: none";
  }
  generateTicForEachPlayer();
});

boxes.forEach((box) => {
  box.addEventListener("click", (event) => {
    let tic = event.target;
    if (!checkbox.checked) {
      if (playersInfo.player.tic === null) {
        alert("Please select your weapon");
      } else {
        startGame(tic);
      }
    } else {
      startGame(tic);
    }
  });
});

scoreTable();
