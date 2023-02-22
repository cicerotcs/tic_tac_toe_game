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
  firstPlayer: null,
  player1: {
    name: "player1",
    score: 0,
    tic: null,
    myTurn: false,
  },
  player2: {
    name: "player2",
    score: 0,
    tic: null,
    myTurn: false,
  },
  computer: {
    name: "computer",
    score: 0,
    tic: null,
    myTurn: false,
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

  playersInfo.firstPlayer = selectPlayer();
  playersInfo.firstPlayer.myTurn = true;

  //console.log(playersInfo.player1.myTurn);
  //console.log(playersInfo.computer.myTurn);
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

    playersInfo.firstPlayer = selectPlayer();
    playersInfo.firstPlayer.myTurn = true;
  } else {
    label.innerText = "1P";
    computer.style = "display: inline";
    player2.style = "display:none";
    ticChoice.style = "display:inline";
  }
  generateTicForEachPlayer();
});

function checkWinner() {
  if (
    gameArr[4] !== "" &&
    gameArr[4] === gameArr[0] &&
    gameArr[4] === gameArr[8]
  ) {
    console.log("winner");
  }
  if (
    gameArr[4] !== "" &&
    gameArr[4] === gameArr[2] &&
    gameArr[4] === gameArr[6]
  ) {
    console.log("winner");
  }
  if (
    gameArr[4] !== "" &&
    gameArr[4] === gameArr[3] &&
    gameArr[4] === gameArr[5]
  ) {
    console.log("winner");
  }
  if (
    gameArr[4] !== "" &&
    gameArr[4] === gameArr[1] &&
    gameArr[4] === gameArr[7]
  ) {
    console.log("winner");
  }
  if (
    gameArr[0] !== "" &&
    gameArr[0] === gameArr[1] &&
    gameArr[0] === gameArr[2]
  ) {
    console.log("winner");
  }
  if (
    gameArr[0] !== "" &&
    gameArr[0] === gameArr[3] &&
    gameArr[0] === gameArr[6]
  ) {
    console.log("winner");
  }
  if (
    gameArr[2] !== "" &&
    gameArr[2] === gameArr[5] &&
    gameArr[2] === gameArr[8]
  ) {
    console.log("winner");
  }
  if (
    gameArr[6] !== "" &&
    gameArr[6] === gameArr[7] &&
    gameArr[6] === gameArr[8]
  ) {
    console.log("winner");
  }
}

function startGame(tic) {
  let actualPlayer = null;
  let player1 = playersInfo.player1;
  let player2 = playersInfo.player2;
  let computer = playersInfo.computer;

  if (player1.myTurn === true) {
    actualPlayer = player1;
  } else if (player2.myTurn === true) {
    actualPlayer = player2;
  } else {
    actualPlayer = computer;
  }

  tic.textContent = actualPlayer.tic;
  tic.classList.add("tic");
  gameArr[tic.dataset.tic] = actualPlayer.tic;

  console.log(gameArr);

  playerTurn();

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

function playerTurn() {
  if (!checkbox.checked) {
    if (playersInfo.player1.myTurn === true) {
      playersInfo.computer.myTurn = true;
      playersInfo.player1.myTurn = false;
    } else {
      playersInfo.player1.myTurn = true;
      playersInfo.computer.myTurn = false;
    }
  } else {
    if (playersInfo.player1.myTurn === true) {
      playersInfo.player2.myTurn = true;
      playersInfo.player1.myTurn = false;
    } else {
      playersInfo.player1.myTurn = true;
      playersInfo.player2.myTurn = false;
    }
  }
}

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
    { once: true }
  );
});
