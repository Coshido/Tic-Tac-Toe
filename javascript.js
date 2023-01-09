const Player = (name, symbol) => {
  const playerName = name;
  const playerSymbol = symbol;
  const playerClick = (num) => {
    Gameboard.gameboard[num] = playerSymbol;
    GameController.switchPlayer();
    let asd = console.log("player click", playerName, playerSymbol, num);
  };
  return { playerClick, playerName };
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
  return { gameboard, render };
})();

const GameController = (() => {
  const player1 = Player("player1", "x");
  const player2 = Player("player2", "o");
  let activePlayer = 1;
  const switchPlayer = () => {
    console.log("switch");
    if (activePlayer == 0) {
      Gameboard.render(player1);
      activePlayer = 1;
    } else {
      Gameboard.render(player2);
      activePlayer = 0;
    }
  };
  Gameboard.render(player1);
  return { activePlayer, switchPlayer, player1, player2 };
})();
