// speed
let log = console.log;
let roundCount = 1;
let turn = "x";
let firstStep = "x";
let player, computer, winner;
let cells = 0;
let squ = [];
let you = 0,
   ties = 0,
   cpu = 0;
let oldChoicesNumbers = [];
let choiceNumber;
const animation = document.querySelector("dotlottie-player");
const clickAudio = document.querySelector(".click");
const winnerAudio = document.querySelectorAll(".winner");
const loseAudio = document.querySelector(".lose");
const winnerAudioArr = Array.from(winnerAudio);

randomNum = Math.floor(Math.random() * winnerAudioArr.length);
log(randomNum);
function playerWin() {
   log(randomNum);
   winnerAudioArr[randomNum].play();
   you++;
   document.querySelector(".player span").innerHTML = you;
   animation.style.display = "block";
   animation.load("https://assets10.lottiefiles.com/packages/lf20_aEFaHc.json");
}

function computerWin() {
   loseAudio.play();
   cpu++;
   document.querySelector(".cpu span").innerHTML = cpu;
}

getScore();
// ? START FUNCTION WE DON'T NEED EDIT
const createCells = () => {
   for (let i = 1; i < 10; i++) {
      let cellDiv = document.createElement("div");
      cellDiv.className = "box";
      cellDiv.classList.add("empty");
      cellDiv.setAttribute("id", `cell${i}`);
      document.querySelector(".game-board").appendChild(cellDiv);
      cellDiv.addEventListener("click", playerMove);
      cellDiv.dataset.number = i - 1;
      cellDiv.onmouseover = () => {
         cellDiv.classList.add(`preview-${turn}`);
      };
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

function saveScore() {
   localStorage.setItem("you", you);
   localStorage.setItem("ties", ties);
   localStorage.setItem("cpu", cpu);
}

function getScore() {
   let youGet = localStorage.getItem("you", you);
   let tiesGet = localStorage.getItem("ties", ties);
   let cpuGet = localStorage.getItem("cpu", cpu);

   if (youGet != null) {
      you = youGet;
      ties = tiesGet;
      cpu = cpuGet;
   }
}

const playerFunction = () => {
   let buttonsPlayers = document.querySelector(".buttons");
   if (buttonsPlayers.classList.contains("x")) {
      player = "x";
      computer = "o";
   } else if (buttonsPlayers.classList.contains("o")) {
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
      loseAudio.play();
      gameInit();
      modalWinner();
   }
};

const finish = (num1, num2, num3) => {
   winner = squ[num1] == "x" ? "x" : "o";
   document.getElementById(`cell${num1}`).classList.add("winner");
   document.getElementById(`cell${num2}`).classList.add("winner");
   document.getElementById(`cell${num3}`).classList.add("winner");

   if (player == winner) {
      playerWin();
   } else {
      computerWin();
   }
   modalWinner();
};

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
   oldChoicesNumbers = [];
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
   clickAudio.play();
   this.dataset.turn = turn;
   oldChoicesNumbers.push(Number(this.dataset.number));
   cells++;
   winnerFunction();
   switchMark();
   gameInit();
   if (winner == undefined && cells != 9) {
      createAi();
   }
   // this.classList.remove(`preview${turn}`);
}

const createAi = () => {
   winnerFunction();
   let emptyCells = [];
   let boxes = document.querySelectorAll(".game-board .box");
   boxes.forEach((box) => {
      if (box.classList.contains("empty")) {
         emptyCells.push(box);
      }
   });

   let choices = [0, 2, 6, 8];

   if (
      squ[5] == computer &&
      squ[1] == undefined &&
      squ[3] == undefined &&
      squ[7] == undefined &&
      squ[9] == undefined
   ) {
      choiceNumber = choices[Math.ceil(Math.random() * choices.length)];
   } else if (
      (squ[3] == squ[2] &&
         squ[3] != undefined &&
         squ[1] == undefined &&
         !oldChoicesNumbers.includes(0)) ||
      (squ[4] == squ[7] &&
         squ[4] != undefined &&
         squ[1] == undefined &&
         !oldChoicesNumbers.includes(0)) ||
      (squ[5] == squ[9] &&
         squ[5] != undefined &&
         squ[1] == undefined &&
         !oldChoicesNumbers.includes(0))
   ) {
      choiceNumber = 0;
   } else if (
      (squ[1] == squ[3] &&
         squ[1] != undefined &&
         squ[2] == undefined &&
         !oldChoicesNumbers.includes(1)) ||
      (squ[5] == squ[8] &&
         squ[5] != undefined &&
         squ[2] == undefined &&
         !oldChoicesNumbers.includes(1))
   ) {
      choiceNumber = 1;
   } else if (
      (squ[1] == squ[2] &&
         squ[1] != undefined &&
         squ[3] == undefined &&
         !oldChoicesNumbers.includes(2)) ||
      (squ[6] == squ[9] &&
         squ[6] != undefined &&
         squ[3] == undefined &&
         !oldChoicesNumbers.includes(2)) ||
      (squ[5] == squ[7] &&
         squ[5] != undefined &&
         squ[3] == undefined &&
         !oldChoicesNumbers.includes(2))
   ) {
      choiceNumber = 2;
   } else if (
      (squ[5] == squ[6] &&
         squ[5] != undefined &&
         squ[4] == undefined &&
         !oldChoicesNumbers.includes(3)) ||
      (squ[1] == squ[7] &&
         squ[1] != undefined &&
         squ[4] == undefined &&
         !oldChoicesNumbers.includes(3))
   ) {
      choiceNumber = 3;
   } else if (
      squ[5] == undefined ||
      (squ[4] == squ[6] &&
         squ[4] != undefined &&
         squ[5] == undefined &&
         !oldChoicesNumbers.includes(4)) ||
      (squ[2] == squ[8] &&
         squ[2] != undefined &&
         squ[5] == undefined &&
         !oldChoicesNumbers.includes(4)) ||
      (squ[1] == squ[9] &&
         squ[1] != undefined &&
         squ[5] == undefined &&
         !oldChoicesNumbers.includes(4)) ||
      (squ[3] == squ[7] &&
         squ[3] != undefined &&
         squ[5] == undefined &&
         !oldChoicesNumbers.includes(4))
   ) {
      choiceNumber = 4;
   } else if (
      (squ[4] == squ[5] &&
         squ[4] != undefined &&
         squ[6] == undefined &&
         !oldChoicesNumbers.includes(5)) ||
      (squ[3] == squ[9] &&
         squ[3] != undefined &&
         squ[6] == undefined &&
         !oldChoicesNumbers.includes(5))
   ) {
      choiceNumber = 5;
   } else if (
      (squ[8] == squ[9] &&
         squ[8] != undefined &&
         squ[7] == undefined &&
         !oldChoicesNumbers.includes(6)) ||
      (squ[1] == squ[4] &&
         squ[1] != undefined &&
         squ[7] == undefined &&
         !oldChoicesNumbers.includes(6)) ||
      (squ[3] == squ[5] &&
         squ[3] != undefined &&
         squ[7] == undefined &&
         !oldChoicesNumbers.includes(6))
   ) {
      choiceNumber = 6;
   } else if (
      (squ[7] == squ[9] &&
         squ[7] != undefined &&
         squ[8] == undefined &&
         !oldChoicesNumbers.includes(7)) ||
      (squ[2] == squ[5] &&
         squ[2] != undefined &&
         squ[8] == undefined &&
         !oldChoicesNumbers.includes(7))
   ) {
      choiceNumber = 7;
   } else if (
      (squ[7] == squ[8] &&
         squ[7] != undefined &&
         squ[9] == undefined &&
         !oldChoicesNumbers.includes(8)) ||
      (squ[3] == squ[6] &&
         squ[3] != undefined &&
         squ[9] == undefined &&
         !oldChoicesNumbers.includes(8)) ||
      (squ[1] == squ[5] &&
         squ[1] != undefined &&
         squ[9] == undefined &&
         !oldChoicesNumbers.includes(8))
   ) {
      choiceNumber = 8;
   } else {
      choiceNumber = Math.ceil(Math.random() * 8);
      for (let i = 0; oldChoicesNumbers.includes(choiceNumber); i++) {
         choiceNumber++;
         // alert("run here 1");
         // log(choiceNumber);
         if (choiceNumber == 8 && squ[9] != undefined) {
            for (let i = 0; oldChoicesNumbers.includes(choiceNumber); i++) {
               choiceNumber--;
               // alert("run here 2");
               // log(choiceNumber);
            }
         } else if (choiceNumber == 8 && squ[9] == undefined) {
            choiceNumber = 8;
            // alert("run here 3");
            // log(choiceNumber);
         }
      }
   }

   oldChoicesNumbers.push(choiceNumber);
   computerMove(choiceNumber);
};

const computerMove = (number) => {
   document.querySelector(".opponent-message").style.opacity = 1;
   document.querySelector(".game-board").classList.add("disabled");
   setTimeout(() => {
      let boxes = document.querySelectorAll(".game-board .box");
      boxes[number].classList.remove("empty");
      boxes[number].classList.add("active");
      boxes[number].classList.add(turn);
      boxes[number].dataset.turn = turn;
      clickAudio.play();
      cells++;
      document.querySelector(".opponent-message").style.opacity = 0;
      document.querySelector(".game-board").classList.remove("disabled");
      winnerFunction();
      switchMark();
      gameInit();
   }, 3000);
};

//! Start Models
const modal = document.querySelector(".modal");
const modalSearching = () => {
   modal.classList.add("active");
   document.querySelector(".modal .content").remove();
   modal.innerHTML = `
      <div class="content">
         <h3 class="searching">
            SEARCHING FOR OPPONENT
            <div class="dots">
               <span></span>
               <span></span>
               <span></span>
            </div>
         </h3>
         <div class="btns">
            <div id="btn1" class="btn">cancel</div>
            <div id="btn1" class="btn" style="display: none">cancel</div>
         </div>
      </div>
   `;
   setTimeout(() => {
      modal.classList.remove("active");
      document.querySelector(".intro-scene").classList.remove("active");
      gameInit();
      createCells();
      computer == "x" ? createAi() : false;
   }, 10000);
   setTimeout(() => {
      document.querySelector(".game-scene").classList.add("active");
   }, 11000);
   document.getElementById("btn1").addEventListener("click", () => {
      modal.classList.remove("active");
   });
};

const modalWinner = () => {
   animation.style.display = "none";
   saveScore();

   oldChoicesNumbers = [];
   document.querySelector(".game-board").classList.add("disabled");
   let p, h3, img;
   setTimeout(() => {
      modal.classList.add("active");
   }, 2000);
   document.querySelector(".modal .content").remove();

   if (player == winner) {
      p = "you won!";
      h3 = "takes the round";
      img = `src="assets/icon-${winner}.svg"`;
   } else if (computer == winner) {
      p = "oh no, you lost...";
      h3 = "takes the round";
      img = `src="assets/icon-${winner}.svg"`;
   } else {
      p = "you tied!";
      h3 = "no one takes the round";
   }

   modal.innerHTML = `
      <div class="content">
         <p>${p}</p>
         <h3 class="${winner}">
            <img ${img} alt="">
            ${h3}
         </h3>
         <div class="btns">
            <div id="btn1" class="btn">quit</div>
            <div id="btn2" class="btn">next round</div>
         </div>
      </div>
   `;

   document.getElementById("btn1").addEventListener("click", (e) => {
      localStorage.clear();
      document.querySelector(".button-cpu").style.pointerEvents = "all";
      modal.classList.remove("active");
      setTimeout(() => {
         document.querySelector(".game-scene").classList.remove("active");
         setTimeout(() => {
            document.querySelector(".intro-scene").classList.add("active");
         }, 500);
         resetGame();
         playerFunction();
         turn = "x";
      }, 1500);
      document.querySelector(".game-board").classList.remove("disabled");
   });
   document.getElementById("btn2").addEventListener("click", (e) => {
      roundCount++;
      cells = 0;
      winner = undefined;
      oldChoicesNumbers = [];

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
      document.querySelector(".game-board").classList.remove("disabled");
      firstStep == computer ? createAi() : false;
   });
};

const modalReload = () => {
   modal.classList.add("active");
   document.querySelector(".modal .content").remove();
   modal.innerHTML = `
      <div class="content">
         <h3 class="reload">
            Restart Game
         </h3>
         <div class="btns">
            <div id="btn1" class="btn">no, cancel</div>
            <div id="btn2" class="btn">yes, restart</div>
         </div>
      </div>
   `;
   document.getElementById("btn1").addEventListener("click", (e) => {
      modal.classList.remove("active");
   });
   document.getElementById("btn2").addEventListener("click", (e) => {
      localStorage.clear();
      modal.classList.remove("active");
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
setTimeout(() => {
   document.querySelector(".intro-scene").classList.add("active");
}, 800);
playerFunction();
document.querySelector(".button-cpu").addEventListener("click", (e) => {
   e.target.style.pointerEvents = "none";
   gameInit();
   createCells();
   document.querySelector(".intro-scene").classList.remove("active");
   setTimeout(() => {
      document.querySelector(".game-scene").classList.add("active");
   }, 500);
   computer == "x" ? createAi() : false;
});
document
   .querySelector(".button-player")
   .addEventListener("click", modalSearching);
document.querySelector(".reload-game").addEventListener("click", (e) => {
   e.stopPropagation();
   modalReload();
});

let celebrate = document.querySelector("lottie-player");

// setTimeout(() => {
//    celebrate.load(
//       "https://lottie.host/876df278-d1c2-4d07-926e-5d30fe1aa16d/jA0CkNDb3l.json"
//    );
// }, 1000);

// footer
let copyright = document.querySelector("footer .copyright");
copyright.innerHTML = new Date(Date.now()).getFullYear();
