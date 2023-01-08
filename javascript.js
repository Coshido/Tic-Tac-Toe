const Player = (name, symbol) => {
  const playerName = name;
  const playerSymbol = symbol;
  const playerClick = (num) => {
    Gameboard.gameboard[num] = playerSymbol;
    let asd = console.log("player click", playerName, playerSymbol, num);
  };
  return { playerClick };
};

const Gameboard = (() => {
  const gameboard = ["", "", "", "", "", "", "", "", ""];
  const displayDiv = document.querySelector(".gameboard");
  //const player = GameController.activePlayer;
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
  const activePlayer = player1;
  Gameboard.render(activePlayer);
  return { player1, player2, activePlayer };
})();
