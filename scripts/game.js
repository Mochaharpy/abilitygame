/**
 * 
 * INITIALIZING Canvases
 * 
*/

const UserInterface = document.getElementById("UserInterface");
const GameInterface = document.getElementById("GameInterface");

const UserCTX = UserInterface.getContext("2d");
const GameCTX = GameInterface.getContext("2d");

const scale = 1;

const dpr = window.devicePixelRatio || 1;

const desiredHeight = 360;
const desiredWidth = 640;

GameInterface.width = 640 * dpr;
GameInterface.height = 360 * dpr;

GameCTX.scale(dpr, dpr);

GameInterface.style.width = `${desiredWidth * scale}px`;
GameInterface.style.height = `${desiredHeight * scale}px`;

/**
 * 
 * other stuff here
 * 
 */

const player = new Player({ x: 320, y: 180, speed: 7, lookat: mousePos });

document.addEventListener("mousemove", (e) => {
  mousePos.x = e.clientX;
  mousePos.y = e.clientY;
});

function gameLoop() {
  GameCTX.clearRect(0, 0, GameInterface.width, GameInterface.height);

  player.handleInput(keysDown, keybinds);
  player.update();

  player.draw(GameCTX);

  requestAnimationFrame(gameLoop);
}
gameLoop();
