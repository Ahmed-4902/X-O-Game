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
      ties++;
      gameInit();
      modalWinner();
      window.stop();
   }
};

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
   modalWinner();
   window.stop();
};

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
   this.removeAttribute("class");
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
   document.querySelector(".opponent-message").style.opacity = 1;
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
      document.querySelector(".opponent-message").style.opacity = 0;
      document.querySelector(".game-board").style.pointerEvents = "all";
      winnerFunction();
      switchMark();
      gameInit();
   }, 500);
};
// TODO END FUNCTIONS WE CAN EDIT

//! Start Models
const modal = document.querySelector(".modal");
const roundResult = document.querySelector(".modal p");
const roundTakes = document.querySelector(".modal h3");
const btn1 = document.querySelector(".modal #btn1");
const btn2 = document.querySelector(".modal #btn2");
const dots = document.querySelector(".dots");
const img = document.querySelector(".modal img");

const modalSearching = () => {
   modal.style.opacity = 1;
   modal.classList.add("active");

   roundTakes.textContent = "searching for opponent";
   roundTakes.className = "searching";
   roundTakes.append(dots);

   btn1.innerHTML = "cancel";
   btn2.style.display = "none";

   setTimeout(() => {
      modal.style.opacity = 0;
      modal.classList.remove("active");
      modal.classList.remove("searching");
      document.querySelector(".intro-scene").style.display = "none";
      document.querySelector(".game-scene").style.display = "block";
      gameInit();
      createCells();
      computer == "x" ? computerMove() : false;
   }, 10000);
   btn1.addEventListener("click", () => {
      modal.style.opacity = 0;
      modal.classList.remove("active");
      roundTakes.classList.remove("searching");
      btn2.style.display = "block";
   });
};

const modalWinner = () => {
   modal.style.opacity = 1;
   modal.classList.add("active");

   roundResult.style.display = "block";
   roundTakes.className = winner;
   img.src = `assets/icon-${winner}.svg`;

   btn1.innerHTML = "quit";
   btn2.innerHTML = "next round";

   if (player == winner) {
      roundResult.innerHTML = "you won!";
      roundTakes.innerHTML = "takes the round";
      roundTakes.prepend(img);
   } else if (computer == winner) {
      roundResult.innerHTML = "oh no, you lost...";
      roundTakes.innerHTML = "takes the round";
      roundTakes.prepend(img);
   } else {
      roundResult.innerHTML = "you tied!";
      roundTakes = "no one takes the round";
   }
   btn1.addEventListener("click", (e) => {
      resetGame();
      playerFunction();
      turn = "x";
      modal.style.opacity = 0;
      modal.classList.remove("active");
      document.querySelector(".intro-scene").style.display = "block";
      document.querySelector(".game-scene").style.display = "none";
   });
   btn2.addEventListener("click", (e) => {
      roundCount++;
      cells = 0;
      winner = undefined;
      modal.style.opacity = 0;
      modal.classList.remove("active");
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
   });
};

const modalReload = () => {
   modal.style.opacity = 1;
   modal.classList.add("active");

   roundTakes.classList.add("reload");
   roundTakes.innerHTML = "restart game";

   btn1.innerHTML = "no, cancel";
   btn2.innerHTML = "yes, restart";

   btn1.addEventListener("click", (e) => {
      modal.style.opacity = 0;
      modal.classList.remove("active");
   });
   btn2.addEventListener("click", (e) => {
      modal.style.opacity = 0;
      modal.classList.remove("active");
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
   });
};

// ! START THE PROGRAM
document.addEventListener("click", (e) => {
   if (e.target.classList.contains("button-cpu")) {
      gameInit();
      createCells();
      document.querySelector(".intro-scene").style.display = "none";
      document.querySelector(".game-scene").style.display = "block";
      computer == "x" ? computerMove() : false;
   } else if (e.target.classList.contains("button-player")) {
      modalSearching();
   } else if (e.target.classList.contains("reload-game")) {
      modalReload();
   }
});
playerFunction();
// ! STOP THE PROGRAM
