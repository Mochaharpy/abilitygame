// initializes all the stuff here

const mousePos = {
  x: 0,
  y: 0,
};

const tester = document.getElementById("tester");

let keysDown = [];

const keybinds = {
  up: 'w',
  left: 'a',
  down: 's',
  right: 'd',
  key1: 'z',
  key2: 'y',
  key3: 'x',
  key4: 'w',
  key5: 'v',
  key6: ' '
}

const combos = [
  { sequence: [keybinds.key6, keybinds.key6, keybinds.key2], action: dash },
  { sequence: [keybinds.key6, keybinds.key6, keybinds.key1], action: ice_blast }
];

const comboProgress = new Map();
const comboTimeouts = new Map();
