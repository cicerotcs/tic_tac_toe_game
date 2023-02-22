const boxes = document.querySelectorAll(".box");
const checkbox = document.querySelector("input");
const label = document.querySelector("label");

function chooseTic(tic) {
  return tic;
}

function numOfPlayers(players) {
  return players;
}

checkbox.addEventListener("change", () => {
  checkbox.checked ? (label.innerText = "2P") : (label.innerText = "1P");
});

boxes.forEach((box) => {
  box.addEventListener("click", (event) => {
    let tic = event.target;
    tic.textContent = "x";
    tic.classList.add("tic");
  });
});
