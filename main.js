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
      cellDiv.ontouchstart = () => {
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
   document.querySelector(".game-board").classList.add("disabled");
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
      document.querySelector(".game-board").classList.remove("disabled");
      winnerFunction();
      switchMark();
      gameInit();
   }, 3000);
};
// TODO END FUNCTIONS WE CAN EDIT

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
      computer == "x" ? computerMove() : false;
   }, 10000);
   setTimeout(() => {
      document.querySelector(".game-scene").classList.add("active");
   }, 11000);
   document.getElementById("btn1").addEventListener("click", () => {
      modal.classList.remove("active");
   });
};

const modalWinner = () => {
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
      firstStep == computer ? computerMove() : false;
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
   gameInit();
   createCells();
   document.querySelector(".intro-scene").classList.remove("active");
   setTimeout(() => {
      document.querySelector(".game-scene").classList.add("active");
   }, 500);
   computer == "x" ? computerMove() : false;
});
document
   .querySelector(".button-player")
   .addEventListener("click", modalSearching);
document.querySelector(".reload-game").addEventListener("click", (e) => {
   e.stopPropagation();
   modalReload();
});
