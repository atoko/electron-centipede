import "./stylesheets/main.css";
import gameEngine from "./game/engine.reducer";
// why not import ./game/constants.js and refer to those consts?

const X_WIDTH = 800;
const Y_WIDTH = 600;

var canvas = document.getElementById('game-canvas');
var ctx = canvas.getContext('2d');  
canvas.width = X_WIDTH;
canvas.height = Y_WIDTH;

let asGrid = (fn, x, y) => {
  ctx[fn](x * (X_WIDTH / 64), y * (Y_WIDTH / 64), (X_WIDTH / 64), (Y_WIDTH / 64))
};

let render = (state) => {
  document.querySelector("#state").innerHTML = JSON.stringify(state);
  ctx.clearRect(0, 0, 800, 600);
  //Make grid
  let cells = [] 
  for(let x = 0; x < 64; x++) { 
    for(let y = 0; y < 64; y++) {
          asGrid("strokeRect", x, y);
    }
  }
  ctx.fillStyle = "red";
  state.bugs.forEach((bug) => {    
    asGrid("fillRect", bug.x, bug.y);
  })
  
  ctx.fillStyle = 'blue';
  state.walls.forEach((bug) => {
    asGrid("fillRect", bug.x, bug.y);
  })

}

let gameLoop = (state) => {
  state = gameEngine(state, {type: "GAME_TICK"});
  render();
}
let GameController = {
  newGame: () => {
    return gameEngine(undefined, {type: "NEW_GAME"});
  },
  spawnBug: (state) => {
    return gameEngine(state, { type: "SPAWN_BUG"});
  },
  gameTick: (state) => {
    return gameEngine(state, { type: "GAME_TICK"})
  },

}
let bootstrap = (() => {
  let state = GameController.newGame();
  let spawnTimer = setInterval(() => { 
    state = GameController.spawnBug(state);
    render(state);
  }, 3000);
  let gameTickTimer = setInterval(() => { 
    state = GameController.gameTick(state);
    render(state); 
  }, 1000 / 60);

  render(state);
})();
