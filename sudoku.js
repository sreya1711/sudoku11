var numSelected = null;
var errors = 0;

var board = [
  "--74916-5",
  "2---6-3-9",
  "-----7-1-",
  "-586----4",
  "--3----9-",
  "--62--187",
  "9-4-7---2",
  "67-83----",
  "81--45---"
];

var solution = [
  "387491625",
  "241568379",
  "569327418",
  "758619234",
  "123784596",
  "496253187",
  "934176852",
  "675832941",
  "812945763"
];

window.onload = function () {
  setGame();
};

function setGame() {
  for (let i = 1; i <= 9; i++) {
    let number = document.createElement("div");
    number.id = i;
    number.innerText = i;
    number.addEventListener("click", selectNumber);
    number.classList.add("number");
    document.getElementById("digits").appendChild(number);
  }

  for (let r = 0; r < 9; r++) {
    for (let c = 0; c < 9; c++) {
      let tile = document.createElement("div");
      tile.id = r + "-" + c;
      if (board[r][c] != "-") {
        tile.innerText = board[r][c];
        tile.classList.add("tile-start");
      }
      if (r == 2 || r == 5) tile.classList.add("horizontal-line");
      if (c == 2 || c == 5) tile.classList.add("vertical-line");
      tile.addEventListener("click", selectTile);
      tile.classList.add("tile");
      document.getElementById("board").append(tile);
    }
  }
}

function selectNumber() {
  if (numSelected != null) {
    numSelected.classList.remove("number-selected");
  }
  numSelected = this;
  numSelected.classList.add("number-selected");
}

function selectTile() {
  if (numSelected) {
    if (this.innerText != "") return;

    let coords = this.id.split("-");
    let r = parseInt(coords[0]);
    let c = parseInt(coords[1]);

    if (solution[r][c] == numSelected.id) {
      this.innerText = numSelected.id;
      checkComplete();
    } else {
      errors++;
      document.getElementById("errors").innerText = errors;
    }
  }
}

function checkComplete() {
  let allFilled = true;
  for (let r = 0; r < 9; r++) {
    for (let c = 0; c < 9; c++) {
      let tile = document.getElementById(r + "-" + c);
      if (tile.innerText !== solution[r][c]) {
        allFilled = false;
        break;
      }
    }
  }
  if (allFilled) {
    showCertificate();
    startConfetti();
  }
}

function showCertificate() {
  document.getElementById("certificate").style.display = "block";
}

function startConfetti() {
  const container = document.getElementById("confetti-container");
  for (let i = 0; i < 100; i++) {
    let confetti = document.createElement("div");
    confetti.classList.add("confetti");
    confetti.style.left = Math.random() * 100 + "vw";
    confetti.style.backgroundColor = getRandomColor();
    confetti.style.animationDuration = Math.random() * 2 + 2 + "s";
    container.appendChild(confetti);
    setTimeout(() => confetti.remove(), 4000);
  }
}

function getRandomColor() {
  const colors = ["red", "blue", "green", "yellow", "purple", "orange", "pink"];
  return colors[Math.floor(Math.random() * colors.length)];
}
