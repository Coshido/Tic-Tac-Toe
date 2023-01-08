const Player = () => {
  const playerClick = () => {
    console.log("player click");
  };
  return { playerClick };
};

const Gameboard = (() => {
  const gameboard = [" ", " ", "", "", "", "", "", "", ""];

  return { gameboard };
})();

const GameController = (() => {
  const gameboard = Gameboard.gameboard;
  const displayDiv = document.querySelector(".gameboard");
  const player1 = Player();
  const render = () => {
    displayDiv.innerHTML = "";
    console.log("asd", gameboard);
    for (let i = 0; i < gameboard.length; i++) {
      let div = document.createElement("div");
      div.classList.add("square");
      div.innerHTML = gameboard[i];
      div.addEventListener("click", player1.playerClick);
      displayDiv.appendChild(div);
    }
  };

  return { render };
})();

GameController.render();
