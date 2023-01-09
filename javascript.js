const Player = (name, symbol) => {
  const playerName = name;
  const playerSymbol = symbol;
  const playerClick = (num) => {
    Gameboard.gameboard[num] = playerSymbol;
    GameController.switchPlayer();
    GameController.winCheck(Gameboard.gameboard);
    let asd = console.log("player click", playerName, playerSymbol, num);
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
    GameController.activePlayer = 1;
    render(GameController.player1);
    //GameController.newGame();
  };
  return { gameboard, render, reset };
})();

const GameController = (() => {
  const player1 = Player("player1", "X");
  const player2 = Player("player2", "O");
  let activePlayer = 1;
  const switchPlayer = () => {
    console.log("switch", activePlayer);
    if (activePlayer == 0) {
      activePlayer = 1;
      Gameboard.render(player1);
    } else {
      activePlayer = 0;
      Gameboard.render(player2);
    }
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
        if (activePlayer == 0) {
          player1.playerWin();
        } else {
          player2.playerWin();
        }
      }
    }
  };
  Gameboard.render(player1);
  //Gameboard.reset();
  return { activePlayer, switchPlayer, player1, player2, winCheck };
})();
