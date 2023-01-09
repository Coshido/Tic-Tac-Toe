const Player = (name, symbol) => {
  const playerName = name;
  const playerSymbol = symbol;
  const playerClick = (num) => {
    if (Gameboard.gameboard[num].length == 0) {
      Gameboard.gameboard[num] = playerSymbol;
    } else {
      return;
    }
    GameController.winCheck(Gameboard.gameboard);
    GameController.switchPlayer();
  };
  const playerWin = () => {
    console.log(`Congratulation ${playerName}, you won!`);
  };
  return { playerClick, playerName, playerWin };
};

const Gameboard = (() => {
  const gameboard = ["", "", "", "", "", "", "", "", ""];
  const displayDiv = document.querySelector(".gameboard");
  const render = (player) => {
    displayDiv.innerHTML = "";
    for (let i = 0; i < gameboard.length; i++) {
      let div = document.createElement("div");
      div.classList.add("square");
      div.setAttribute("number", i);
      div.innerHTML = gameboard[i];
      div.addEventListener("click", player.playerClick.bind(this, i));
      displayDiv.appendChild(div);
    }
  };
  const reset = () => {
    for (let i = 0; i < gameboard.length; i++) {
      gameboard[i] = "";
    }
    GameController.setActivePlayer1();
    render(GameController.activePlayer);
  };
  return { gameboard, render, reset };
})();

const GameController = (() => {
  const player1 = Player("player1", "X");
  const player2 = Player("player2", "O");
  let activePlayer = player1;
  const switchPlayer = () => {
    console.log("switch", activePlayer);
    if (activePlayer == player1) {
      activePlayer = player2;
    } else {
      activePlayer = player1;
    }
    Gameboard.render(activePlayer);
  };

  const winCheck = (gameboard) => {
    const winCondition = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    //console.log("checking", gameboard[winCondition[0][1]]);
    for (let i = 0; i < winCondition.length; i++) {
      let a = winCondition[i][0];
      let b = winCondition[i][1];
      let c = winCondition[i][2];

      if (
        gameboard[a] === gameboard[b] &&
        gameboard[a] === gameboard[c] &&
        gameboard[a].length + gameboard[b].length + gameboard[c].length >= 3
      ) {
        console.log("yeah boi");
        if (activePlayer == player1) {
          player1.playerWin();
        } else {
          player2.playerWin();
        }
      } else if (!gameboard.includes("")) {
        console.log("it is a draw");
      }
    }
  };

  const setActivePlayer1 = () => {
    activePlayer = player1;
  };

  Gameboard.render(activePlayer);
  return {
    activePlayer,
    switchPlayer,
    player1,
    player2,
    winCheck,
    setActivePlayer1,
  };
})();
