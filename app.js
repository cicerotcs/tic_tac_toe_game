const boxes = document.querySelectorAll(".box");
const checkbox = document.querySelector("input");
const label = document.querySelector("label");
const player2 = document.querySelector(".player2");
const computer = document.querySelector(".computer");
const ticChoice = document.querySelector(".tic-choice");

const player1Tic = document.querySelector(".player1 .info-tic");
const player2Tic = document.querySelector(".player2 .info-tic");
const computerTic = document.querySelector(".computer .info-tic");

const ticX = document.querySelector(".tic-x");
const ticO = document.querySelector(".tic-o");

let gameArr = ["", "", "", "", "", "", "", ""];

let actualPlayer = null;

let playersInfo = {
  firstPlayer: null,
  player1: {
    name: "player1",
    score: 0,
    tic: null,
    nextPlayer: false,
  },
  player2: {
    name: "player2",
    score: 0,
    tic: null,
    nextPlayer: false,
  },
  computer: {
    name: "computer",
    score: 0,
    tic: null,
    nextPlayer: false,
  },
};

// this function allows the player choose their tic if decided to player against the computer
function chooseTic(event) {
  let { player1, computer, firstPlayer } = playersInfo;
  let playerTic = event.target;
  if (playerTic.dataset.choice === "x") {
    computerTic.innerHTML = ticO.dataset.choice;
  } else {
    computerTic.innerHTML = ticX.dataset.choice;
  }
  player1Tic.innerHTML = playerTic.dataset.choice;
  player1.tic = playerTic.dataset.choice;
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
function checkWinner() {
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
    console.log(`${winner} wins!`);
  } else if (!gameArr.includes("")) {
    console.log("It's a tie!");
  } else {
    console.log("Keep playing...");
  }
}

// main function
function startGame(tic) {
  const { player1, player2, computer } = playersInfo;

  if (player1.nextPlayer) {
    actualPlayer = player1;
  } else if (player2.nextPlayer) {
    actualPlayer = player2;
  } else {
    actualPlayer = computer;
  }

  tic.textContent = actualPlayer.tic;
  tic.classList.add("tic");
  gameArr[tic.dataset.tic] = actualPlayer.tic;

  nextPlayer();
  checkWinner();

  if (computer.nextPlayer) {
    computerPlayer();
  }
}

// This function will automatically select who is gonna be the first player
function selectPlayer() {
  let num = Math.floor(Math.random() * 2);
  let selectedPlayer = null;
  const { player1, player2, computer } = playersInfo;

  if (!checkbox.checked) {
    if (num === 0) {
      selectedPlayer = player1;
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
  const { player1, player2, computer } = playersInfo;
  if (!checkbox.checked) {
    if (player1.nextPlayer) {
      computer.nextPlayer = true;
      player1.nextPlayer = false;
    } else {
      player1.nextPlayer = true;
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

// function for testing

function computerPlayer() {
  const { computer } = playersInfo;
  let randomIndex = Math.floor(Math.random() * 9);

  for (let i = 0; i < boxes.length; i++) {
    let index = (randomIndex + i) % boxes.length;
    if (boxes[index].textContent === "") {
      boxes[index].textContent = computer.tic;
      boxes[index].classList.add("tic");
      gameArr[boxes[index].dataset.tic] = computer.tic;
      nextPlayer();
      checkWinner();
      break;
    }
  }
}

// event listeners

ticX.addEventListener("click", chooseTic);
ticO.addEventListener("click", chooseTic);

checkbox.addEventListener("change", () => {
  let { firstPlayer } = playersInfo;
  if (checkbox.checked) {
    label.innerText = "2P";
    computer.style = "display:none";
    player2.style = "display:inline";
    ticChoice.style = "display:none";

    firstPlayer = selectPlayer();
    firstPlayer.nextPlayer = true;

    console.log(firstPlayer);
  } else {
    label.innerText = "1P";
    computer.style = "display: inline";
    player2.style = "display:none";
    ticChoice.style = "display:inline";
  }
  generateTicForEachPlayer();
});

boxes.forEach((box) => {
  box.addEventListener(
    "click",
    (event) => {
      let tic = event.target;
      if (playersInfo.player1.tic === null) {
        alert("Please select your weapon");
      } else {
        startGame(tic);
      }
    },
    { once: true } // bug
  );
});
