// speed
let log = console.log;
let roundCount = 1;
let turn = "x";
let firstStep = "x";
let player;
let computer;
let winner;
let cells = 0;
let squ = [];
let you = 0,
   ties = 0,
   cpu = 0;

// ? START FUNCTION WE DON'T NEED EDIT
const createCells = () => {
   for (let i = 1; i < 10; i++) {
      let cellDiv = document.createElement("div");
      cellDiv.className = "box";
      cellDiv.classList.add("empty");
      cellDiv.setAttribute("id", `cell${i}`);
      document.querySelector(".game-board").appendChild(cellDiv);
      cellDiv.addEventListener("click", playerMove);
      cellDiv.onmouseover = () => {
         cellDiv.classList.add(`preview-${turn}`);
      };
      // cellDiv.ontouchstart = () => {
      //    cellDiv.classList.add(`preview-${turn}`);
      // };
      cellDiv.onmouseleave = () => {
         cellDiv.classList.remove(`preview-${turn}`);
      };
   }
};

const switchMark = () => {
   turn = turn == "x" ? "o" : "x";
};

const switchFirstStep = () => {
   firstStep = firstStep == "x" ? "o" : "x";
   turn = firstStep;
};

const playerFunction = () => {
   let buttonsPlayers = document.querySelector(".buttons");
   if (buttonsPlayers.classList.contains("x")) {
      player = "x";
      computer = "o";
   } else if (buttonsPlayers.classList.contains("o")) {
      log("there is o");
      computer = "x";
      player = "o";
   }
   document.querySelectorAll(".buttons .button").forEach((btn) => {
      btn.addEventListener("click", (e) => {
         e.stopPropagation();
         let button = e.target;

         document.querySelector(".buttons").classList.remove(player);
         document.querySelector(`.${player}-button svg path`).style.fill =
            "#a8bfc9";
         [player, computer] = [computer, player];
         document.querySelector(`.${player}-button svg path`).style.fill =
            "#1a2a33";

         document.querySelector(".buttons").classList.add(player);
      });
   });
};

const winnerFunction = () => {
   for (let i = 1; i < 10; i++) {
      squ[i] = document.getElementById("cell" + i).dataset.turn;
   }
   if (squ[1] == squ[2] && squ[2] == squ[3] && squ[1] != undefined) {
      finish(1, 2, 3);
   } else if (squ[4] == squ[5] && squ[5] == squ[6] && squ[4] != undefined) {
      finish(4, 5, 6);
   } else if (squ[7] == squ[8] && squ[8] == squ[9] && squ[7] != undefined) {
      finish(7, 8, 9);
   } else if (squ[1] == squ[4] && squ[4] == squ[7] && squ[1] != undefined) {
      finish(1, 4, 7);
   } else if (squ[2] == squ[5] && squ[5] == squ[8] && squ[2] != undefined) {
      finish(2, 5, 8);
   } else if (squ[3] == squ[6] && squ[6] == squ[9] && squ[9] != undefined) {
      finish(3, 6, 9);
   } else if (squ[1] == squ[5] && squ[5] == squ[9] && squ[9] != undefined) {
      finish(1, 5, 9);
   } else if (squ[3] == squ[5] && squ[5] == squ[7] && squ[7] != undefined) {
      finish(3, 5, 7);
   } else if (cells == 9) {
      // tiesFunction();
      ties++;
      gameInit();
      popup();
      window.stop();
   }
};

// const tiesFunction = () => {
//    ties++;
//    document.querySelector(".game-score .ties span").innerHTML = ties;

//    document.querySelector(".popup-winner p").innerHTML = "you tied";
//    document.querySelector(
//       ".popup-winner h1"
//    ).innerHTML = `no one takes the round`;

//    document.querySelector(".overlay").style.display = "block";
//    document.querySelector(".popup-winner").style.display = "flex";
//    window.stop();
// };

const finish = (num1, num2, num3) => {
   winner = squ[num1] == "x" ? "x" : "o";
   document.getElementById(`cell${num1}`).classList.add("winner");
   document.getElementById(`cell${num2}`).classList.add("winner");
   document.getElementById(`cell${num3}`).classList.add("winner");

   if (player == winner) {
      you++;
      document.querySelector(".player span").innerHTML = you;
   } else {
      cpu++;
      document.querySelector(".cpu span").innerHTML = cpu;
   }
   popup();
   window.stop();
};

const popup = () => {
   let p = document.querySelector(".popup-winner p");
   let h1 = document.querySelector(".popup-winner h1");
   let actions = document.querySelector(".popup-winner .actions");
   h1.className = winner;
   let imgElement = document.createElement("img");
   imgElement.src = `assets/icon-${winner}.svg`;
   if (player == winner) {
      p.innerHTML = "you won!";
      h1.innerHTML = "takes the round";
      h1.prepend(imgElement);
   } else if (computer == winner) {
      p.innerHTML = "oh no, you lost...";
      h1.innerHTML = "takes the round";
      h1.prepend(imgElement);
   } else {
      p.innerHTML = "you tied!";
      h1.innerHTML = "no one takes the round";
   }
   document.querySelector(".overlay").style.display = "block";
   document.querySelector(".popup-winner").style.display = "flex";
};
// ? END FUNCTION WE DON'T NEED EDIT

// TODO START FUNCTIONS WE CAN EDIT
const gameInit = () => {
   let resultPlayer = document.querySelector(".game-score .player");
   let resultCpu = document.querySelector(".game-score .cpu");
   let resultTies = document.querySelector(".game-score .ties");

   resultPlayer.innerHTML = `${player} (you) <span>${you}</span>`;
   resultCpu.innerHTML = `${
      player == "x" ? "O" : "x"
   } (cpu) <span>${cpu}</span>`;
   resultTies.innerHTML = `ties <span>${ties}</span>`;

   document.querySelector(".turn img").src = `assets/icon-${turn}-silver.svg`;

   if (player === "x") {
      resultPlayer.style.backgroundColor = "#31c3bd";
      resultCpu.style.backgroundColor = "#f2b137";
   } else {
      resultPlayer.style.backgroundColor = "#f2b137";
      resultCpu.style.backgroundColor = "#31c3bd";
   }
};

const resetGame = () => {
   playerFunction();
   winner = undefined;
   firstStep = "x";
   squ = [];
   you = 0;
   ties = 0;
   cpu = 0;
   cells = 0;
   roundCount = 1;
   document.querySelectorAll(".game-board .box").forEach((box) => {
      box.remove();
   });
};

function playerMove() {
   this.removeAttribute("class")
   this.classList.add("box");
   this.classList.add("active");
   this.classList.add(turn);
   this.dataset.turn = turn;
   cells++;
   winnerFunction();
   switchMark();
   gameInit();
   if (winner == undefined) {
      computerMove();
   }
   // this.classList.remove(`preview${turn}`);
}

const computerMove = () => {
   document.querySelector(".opponent-message").style.display = "flex";
   document.querySelector(".game-board").style.pointerEvents = "none";
   setTimeout(() => {
      let emptyCells = [];
      let boxes = document.querySelectorAll(".game-board .box");
      boxes.forEach((box) => {
         if (box.classList.contains("empty")) {
            emptyCells.push(box);
         }
      });
      let randomNumber = Math.floor(Math.random() * emptyCells.length);
      emptyCells[randomNumber].classList.remove("empty");
      emptyCells[randomNumber].classList.add("active");
      emptyCells[randomNumber].classList.add(turn);
      emptyCells[randomNumber].dataset.turn = turn;
      cells++;
      document.querySelector(".opponent-message").style.display = "none";
      document.querySelector(".game-board").style.pointerEvents = "all";
      winnerFunction();
      switchMark();
      gameInit();
   }, 1000);
};
// TODO END FUNCTIONS WE CAN EDIT

// ! START THE PROGRAM
document.addEventListener("click", (e) => {
   if (e.target.classList.contains("button-cpu")) {
      gameInit();
      createCells();
      document.querySelector(".intro-scene").style.display = "none";
      document.querySelector(".game-scene").style.display = "block";
      computer == "x" ? computerMove() : false;
   } else if (e.target.classList.contains("button-player")) {
      document.querySelector(".popup-search").style.display = "flex";
      document.querySelector(".overlay").style.display = "block";
      setTimeout(() => {
         document.querySelector(".popup-search").style.display = "none";
         document.querySelector(".overlay").style.display = "none";
         document.querySelector(".intro-scene").style.display = "none";
         document.querySelector(".game-scene").style.display = "block";
         gameInit();
         createCells();
         computer == "x" ? computerMove() : false;
      }, 10000);
   } else if (e.target.classList.contains("quit")) {
      resetGame();
      playerFunction();
      turn = "x";
      document.querySelector(".popup-winner").style.display = "none";
      document.querySelector(".overlay").style.display = "none";
      document.querySelector(".intro-scene").style.display = "block";
      document.querySelector(".game-scene").style.display = "none";
   } else if (e.target.classList.contains("next-round")) {
      roundCount++;
      cells = 0;
      winner = undefined;
      document.querySelector(".popup-winner").style.display = "none";
      document.querySelector(".overlay").style.display = "none";
      document.querySelectorAll(".game-board .box").forEach((box) => {
         box.remove();
      });
      createCells();
      document.querySelector(
         ".turn img"
      ).src = `assets/icon-${turn}-silver.svg`;
      switchFirstStep();
      gameInit();
      firstStep == computer ? computerMove() : false;
   } else if (e.target.classList.contains("reload-game")) {
      document.querySelector(".overlay").style.display = "block";
      document.querySelector(".popup-restart").style.display = "flex";
   } else if (e.target.classList.contains("cancel")) {
      document.querySelector(".popup-restart").style.display = "none";
      document.querySelector(".popup-search").style.display = "none";
      document.querySelector(".overlay").style.display = "none";
   } else if (e.target.classList.contains("restart")) {
      document.querySelector(".overlay").style.display = "none";
      document.querySelector(".popup-restart").style.display = "none";
      document.querySelector(
         ".turn img"
      ).src = `assets/icon-${turn}-silver.svg`;
      resetGame();
      gameInit();
      createCells();
      firstStep == computer ? computerMove() : false;
      turn = "x";
      log(player, computer, firstStep);
   }
});

playerFunction();
// ! STOP THE PROGRAM
