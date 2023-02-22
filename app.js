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

let playersInfo = {
  player1: {
    score: 0,
    tic: null,
  },
  player2: {
    score: 0,
    tic: null,
  },
  computer: {
    score: 0,
    tic: null,
  },
};

function chooseTic(event) {
  let playerTic = event.target;
  if (playerTic.dataset.choice === "x") {
    computerTic.innerHTML = ticO.dataset.choice;
  } else {
    computerTic.innerHTML = ticX.dataset.choice;
  }
  player1Tic.innerHTML = playerTic.dataset.choice;
  playersInfo.player1.tic = playerTic.dataset.choice;
  playersInfo.computer.tic = computerTic.innerHTML;
  ticChoice.style = "display: none";
}

function generateTicForEachPlayer() {
  if (checkbox.checked) {
    const tic = Math.floor(Math.random() * 2);

    if (tic === 0) {
      playersInfo.player1.tic = "o";
      playersInfo.player2.tic = "x";
    } else {
      playersInfo.player1.tic = "x";
      playersInfo.player2.tic = "o";
    }
  } else {
    playersInfo.player1.tic = null;
    playersInfo.player2.tic = null;
  }

  player1Tic.innerHTML = playersInfo.player1.tic;
  player2Tic.innerHTML = playersInfo.player2.tic;
}

function numOfPlayers(players) {
  return players;
}

ticX.addEventListener("click", chooseTic);
ticO.addEventListener("click", chooseTic);

checkbox.addEventListener("change", () => {
  if (checkbox.checked) {
    label.innerText = "2P";
    computer.style = "display:none";
    player2.style = "display:inline";
    ticChoice.style = "display:none";
  } else {
    label.innerText = "1P";
    computer.style = "display: inline";
    player2.style = "display:none";
    ticChoice.style = "display:inline";
  }
  generateTicForEachPlayer();
});

function checkWinner() {
  if (gameArr[4] == "x" && gameArr[0] == "x" && gameArr[8] == "x") {
    console.log("winner");
  }
}

function startGame(tic) {
  let player = selectPlayer();
  tic.textContent = player.tic;
  tic.classList.add("tic");
  gameArr[tic.dataset.tic] = playersInfo.player1.tic;
  checkWinner();
}

function selectPlayer() {
  let player = Math.floor(Math.random() * 2);
  let selectedPlayer = null;
  if (!checkbox.checked) {
    if (player === 0) {
      selectedPlayer = playersInfo.player1;
    } else {
      selectedPlayer = playersInfo.computer;
    }
  } else {
    if (player === 0) {
      selectedPlayer = playersInfo.player1;
    } else {
      selectedPlayer = playersInfo.player2;
    }
  }
  return selectedPlayer;
}

function playerTurn() {}

boxes.forEach((box) => {
  box.addEventListener("click", (event) => {
    let tic = event.target;
    if (playersInfo.player1.tic === null) {
      alert("Please select your weapon");
    } else {
      startGame(tic);
    }
  });
});
