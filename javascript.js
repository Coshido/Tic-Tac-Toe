const Player = (name, symbol) => {
  const playerName = name;
  const playerSymbol = symbol;
  let winner = "";
  const playerClick = (num) => {
    if (Gameboard.gameboard[num].length == 0) {
      Gameboard.gameboard[num] = playerSymbol;
    } else {
      return;
    }
    Gameboard.displayPlayer(playerName);
    GameController.winCheck(Gameboard.gameboard);
    if (winner == "") {
      GameController.switchPlayer();
    }
  };
  const playerWin = () => {
    console.log(`Congratulation ${playerName}, you won!`);
    Gameboard.displayWinner(playerName);
    Gameboard.removeListener();
    winner = playerName;
  };
  return { playerClick, playerName, playerWin };
};

const Gameboard = (() => {
  const gameboard = ["", "", "", "", "", "", "", "", ""];
  const displayDiv = document.querySelector(".gameboard");
  const gameSettings = document.querySelector(".game-settings");
  const render = (player) => {
    displayDiv.innerHTML = "";
    for (let i = 0; i < gameboard.length; i++) {
      let div = document.createElement("div");
      div.classList.add("square");
      div.setAttribute("number", i);
      div.innerHTML = gameboard[i];
      const bind = player.playerClick.bind(this, i);
      div.addEventListener("click", bind);
      displayDiv.appendChild(div);
    }
  };
  const reset = () => {
    for (let i = 0; i < gameboard.length; i++) {
      gameboard[i] = "";
    }
    GameController.setActivePlayer1();
    displayPlayer(GameController.activePlayer.playerName);
    render(GameController.activePlayer);
  };
  const displayDraw = () => {
    gameSettings.innerHTML = `It's a draw!`;
  };
  const displayPlayer = (player) => {
    gameSettings.innerHTML = `${player}'s turn`;
  };
  const displayWinner = (player) => {
    console.log("lelele");
    gameSettings.innerHTML = `Congratulation ${player}, you won!`;
  };
  const removeListener = () => {
    GameController.switchPlayer();
    let elements = document.querySelectorAll(".square");
    for (let i = 0; i < elements.length; i++) {
      elements[i].replaceWith(elements[i].cloneNode(true));
    }
  };
  return {
    gameboard,
    render,
    reset,
    displayDraw,
    displayPlayer,
    displayWinner,
    removeListener,
  };
})();

const GameController = (() => {
  const player1 = Player("Player 1", "X");
  const player2 = Player("Player 2", "O");
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
        Gameboard.displayDraw();
      }
    }
  };

  const setActivePlayer1 = () => {
    activePlayer = player1;
  };

  Gameboard.render(activePlayer);
  Gameboard.displayPlayer(activePlayer.playerName);
  return {
    activePlayer,
    switchPlayer,
    player1,
    player2,
    winCheck,
    setActivePlayer1,
  };
})();
