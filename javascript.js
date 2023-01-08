const Player = () => {
  const playerClick = (num) => {
    let asd = console.log("player click", Gameboard.player, num);
  };
  return { playerClick };
};

const Gameboard = (() => {
  const gameboard = ["", "", "", "", "", "", "", "", ""];
  const displayDiv = document.querySelector(".gameboard");
  const player = Player();
  const render = () => {
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
  return { gameboard, render, player };
})();

const GameController = (() => {
  const player1 = Player();
  const player2 = Player();
  Gameboard.render();
  return { player1, player2 };
})();
