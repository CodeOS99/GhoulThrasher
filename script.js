// helpers
function getRandomInt(min, max) {
    return Math.random() * (max - min) + min;
}

const player = "p";
const grassEnd = "e";
const grass = "g";
const fadingGrass = "f";
const tombstone = "t";
const houseTopLeft = "[";
const houseTopRight = "]";
const houseBottomLeft = "{";
const houseBottomRight = "}";
const bulletRight = ">";
const bulletLeft = "<";
const bulletUp = "^";
const bulletDown = "v";
const ghoulLeft = "h";
const ghoulRight = "o";

const bulletVels = {
  ">": [1, 0],
  "<": [-1, 0],
  "^": [0, -1],
  "v": [0, 1]
};

const PLAYER_WALK_SPEED = 1;

let canShootBullet = true;

let ghoulCounterMax = 50; // We won't const this because we will change this
let ghoulCounter = 0;

setLegend(
  [bulletRight, bitmap`
................
................
................
................
................
................
.00000000000000.
.066C666C666260.
.066C666C666660.
.00000000000000.
................
................
................
................
................
................`],
  [bulletLeft, bitmap`
................
................
................
................
................
................
.00000000000000.
.062666C666C660.
.066666C666C660.
.00000000000000.
................
................
................
................
................
................`], // bullet left
  [bulletUp, bitmap`
................
......0000......
......0660......
......0620......
......0660......
......0660......
......0660......
......0CC0......
......0660......
......0660......
......0660......
......0CC0......
......0660......
......0660......
......0000......
................`],
  [bulletDown, bitmap`
................
......0000......
......0660......
......0660......
......0CC0......
......0660......
......0660......
......0660......
......0CC0......
......0660......
......0660......
......0660......
......0260......
......0660......
......0000......
................`],
  [ghoulLeft, bitmap`
....11111.......
...1222221......
..122222221.....
..1222222221....
..1202202221....
.12222222221....
.12222222221....
.12222222221....
.122222222221...
.122222200221...
..12222222221...
..12222111221...
..121121.11221..
..121.11..1121..
...11..11..111..
....11..........`],
  [ghoulRight, bitmap`
.......11111....
......1222221...
.....122222221..
....1222222221..
....1222022021..
....12222222221.
....12222222221.
....12222222221.
...122222222221.
...122002222221.
...12222222221..
...12211122221..
..12211.121121..
..1211..11.121..
..111..11..11...
..........11....`],
  [player, bitmap`
................
................
.......000......
.......0C0......
......0660......
......06660.0...
....0003630.0...
....0.0666000...
....0.05550.....
......06660.....
.....0F6660.....
.....0FF60......
......000.......
......0.0.......
.....00.00......
................`],
  [grassEnd, bitmap`
4444444444444444
4444444444444444
4444444444444444
4444444444444444
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
CCCCCCCCCCCCCCCC`],
  [grass, bitmap`
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444`],
  [fadingGrass, bitmap`
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
4DDD4DDDD4DDD4DD
4D4DD4DD4DD4DDD4
444D4D4D4D44D4D4
4D444D4D44D444D4
444DD44D44D44444
444D4D444DD444DD
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444`],
  [tombstone, bitmap`
4444444444444444
4444444444444444
444444LLLLL44444
444444L111L44444
44444LL111LL4444
44444L11111L4444
4444LL11111LL444
4444L11LLL11L444
4444L1111111L444
4444L11LLL11L444
4444L1111111L444
4444LLLLLLLLL444
444L111111111L44
444LCLLLLLLLLLC4
44CCCCCCCCCCCCC4
4444444444444444`],
  [houseTopLeft, bitmap`
4444444444444440
444444444444440C
44444444444440CC
4444444444440CCC
444444444440CCCC
44444444440CCCCC
4444444440CCCCCC
444444440C0CCCCC
44444440CC00CCCC
4444440CCCCC0CCC
444440CCCCCCC0CC
44440CCCCCCCCCCC
4440CCCCCCCCCCCC
440CCCCCCCCCCCCC
40CCCCCCCCCCCCCC
0000000000000000`],
  [houseTopRight, bitmap`
0444444444444444
C044441114444444
CC04444411444444
CCC0444LLLLL4444
CCCC044L111L4444
CCCCC04LLLLL4444
CC0CCC04L1L44444
CCC0CCC0L1L44444
CCC0CCCCL1L44444
CCCCCCCCLFL44444
CCCCCCCCC0044444
CCCCCCFFCCC04444
CCCCCCFFCCCC0444
CCCCCCCCCCCCC044
CCCCCCCCCCCCCC04
0000000000000000`],
  [houseBottomLeft, bitmap`
4D40CCCCCCCCC011
DDD0CCCCCCCCC011
DDD0CCCCCCCCC011
DDD0CCCC00CCC011
DDD0CC3C09CCC011
DDD0CC3CCCCCC011
DDD0CC33CCCCC061
DDD0CCCC3CCCC011
DDD0CCC3CCCCC011
DDD0CCCCC3CCC011
DDD0CCCCC3CCC011
DDD0CCCCCC3CC011
DDD0CCCCCCCCC01L
DDD0CCCCCCCCC011
4D40CCCCCCCCC000
4440000000000000`],
  [houseBottomRight, bitmap`
110CCCCCCCCC04D4
110CCCCCCCCC0DDD
110CCCCCCCCC0DDD
110CC00CCCCC0DDD
110CC90CCCCC0DDD
110CCCCCCCCC0DDD
110CCCCCCCCC0DDD
110CCCCCCCCC0DDD
110CCCCCCCCC0DDD
110CCCCCCCCC0DDD
110CCCCCCCCC0DDD
110CCCCCCCCC0DDD
L10CCCCCCCCC0DDD
110CCCCCCCCC0DDD
000CCCCCCCCC04D4
0000000000000444`]
);

setBackground(grass);

setSolids([player]);

let level = 0;
const levels = [
  map`
gggggggg
gg[]gtgg
gg{}ggtg
tgffgggg
ggpggggg
gggggggg
eeeeeeee`
];

function getMapWidth() {
  return levels[level].split("\n")[1].length;
}

function getMapHeight() {
  return levels[level].split("\n").length;
}

setMap(levels[level]);

setPushables({
  [player]: []
});

onInput("w", () => {
  getFirst(player).y -= PLAYER_WALK_SPEED; // The actual movement is done in afterInput function, since we need to redraw the map
});

onInput("a", () => {
  getFirst(player).x -= PLAYER_WALK_SPEED; // The actual movement is done in afterInput function, since we need to redraw the map
});

onInput("s", () => {
  getFirst(player).y += PLAYER_WALK_SPEED; // The actual movement is done in afterInput function, since we need to redraw the map
});

onInput("d", () => {
  getFirst(player).x += PLAYER_WALK_SPEED; // The actual movement is done in afterInput function, since we need to redraw the map
});

onInput("i", () => {
  if(canShootBullet){
    addSprite(getFirst(player).x, getFirst(player).y - 1, bulletUp);
    canShootBullet = false;
  }
});

onInput("j", () => {
  if(canShootBullet){
    addSprite(getFirst(player).x - 1, getFirst(player).y, bulletLeft);
    canShootBullet = false;
  }
});

onInput("k", () => {
  if(canShootBullet){
    addSprite(getFirst(player).x, getFirst(player).y + 1, bulletDown);
    canShootBullet = false;
  }
});

onInput("l", () => {
  if(canShootBullet){
    addSprite(getFirst(player).x + 1, getFirst(player).y, bulletRight);
    canShootBullet = false;
  }
});

// Function to handle bullet movement
function moveBullets(bulletType) {
  getAll(bulletType).forEach((bullet) => {
    bullet.x += bulletVels[bulletType][0];
    bullet.y += bulletVels[bulletType][1];

    if (bullet.y <= 0 && bulletType == "^") bullet.remove();
    if (bullet.y >= getMapHeight() - 2 && bulletType == "v") bullet.remove();
    if (bullet.x <= 0 && bulletType == "<") bullet.remove();
    if (bullet.x >= getMapWidth() - 1 && bulletType == ">") bullet.remove();

    console.log(bullet.y);
  });
}

// Bullet logic
setInterval(() => {
  moveBullets(bulletLeft);
  moveBullets(bulletRight);
  moveBullets(bulletUp);
  moveBullets(bulletDown);
}, 100);

// shoot interval
setInterval(() => {
  canShootBullet = true;
}, 300);

// Interval for misc things
setInterval(() => {
  if(!canShootBullet){
    addText("reloading");
  }else {
    clearText();
  }

  // Monster spawner timer, I decided to stop creating random new timers now
  ghoulCounter++;
  if(ghoulCounter > ghoulCounterMax) {
    ghoulCounter = 0;
    let randomX = Math.floor(Math.random()*getMapWidth()-2);
    while(randomX === getFirst(player).x) {
      randomX = Math.floor(Math.random()*getMapWidth()-2);
    }
    let randomY = Math.floor((Math.random()*getMapHeight()-2));
    while(randomY === getFirst(player).y) {
      randomY = Math.floor((Math.random()*getMapHeight()-2));
    }
    if(getFirst(player).x-randomX > 0) {
        addSprite(randomX, randomY, ghoulRight);
    }else{
      addSprite(randomX, randomY, ghoulLeft);
    }
    ghoulCounterMax += getRandomInt(-5, 15); // add some randomness, give more weight to increase since we dont want the player to die as soon as they spawn
  }
}, 100);

afterInput(() => {});
