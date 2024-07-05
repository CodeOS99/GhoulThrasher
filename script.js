/*

*/

// helpers
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const doorLeft = ";";
const doorRight = ":";
const doorUp = "\'";
const doorDown = "\"";
const player = "p";
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
const sleepyGhoul = "s";
const wall = "w";
const flower1 = "l";
const flower2 = "m";
const blood = "b";
const goldenTomb = "e";
const goldenFlowers = "0";
const skeletonLeft = "1";
const skeletonRight = "2";
const skeletonArrow = "3";
const invertedPlayer = "k"
const invertedGrass = "6";
const invertedBrick = "z";

const bulletVels = {
  ">": [1, 0],
  "<": [-1, 0],
  "^": [0, -1],
  "v": [0, 1]
};

const enemies = [
  ghoulLeft, ghoulRight,
  sleepyGhoul,
  skeletonLeft, skeletonRight, skeletonArrow
];

const butcheryMax = 10;

const enemyScoreMap = {
  'h': 1,
  'o': 1,
  's': 2,
  '1': 2,
  '2': 2,
  '3': 1
};

const initI = 3;
const initJ = 2;
const butcheryCoords = [3, 3];
const mazeEnd = [1, 0];
const inverterStart = [2, 2];
const inverters = [[2,2],[2,3]];

let mazeGemGotten = false;
let butcheryGemGotten = false;

const PLAYER_WALK_SPEED = 1;

let canShootBullet = true;

let ghoulCounterMax = 50; // We won't const this because we will change this
let ghoulCounter = 0;

let ghoulDifficultyIncreaser = 0;
let difficultyGhoulSpawn = 0;

let sleepyGhoulCounterMax = 70; // slightly longer than ghoul counter max
let sleepyGhoulCounter = 0;

let skeletonCounter = 0;
let skeletonCounterMax = 100;

// have text?(needed for clearText shenanigins in afterMovement in room 0, 1
let texts = [];

const ghoulImmuneLevels = [
  [0, 3],
  [1, 0],
  [1, 1],
  [1, 2],
  [2, 0],
  [2, 1],
  [3, 0],
  [3, 1],
  [2, 3]
]
const sleepyGhoulImmuneLevels = [
  [0, 3],
  [1, 0],
  [1, 1],
  [1, 2],
  [2, 0],
  [2, 1],
  [3, 0],
  [3, 1],
  [initI, initJ],
  [2, 3]
];
const skeletonImmuneLevels = [
  [0, 2],
  [1, 0],
  [1, 1],
  [1, 2],
  [2, 0],
  [2, 1],
  [3, 0],
  [3, 1],
  [initI, initJ],
  [2, 3]
];

let butcheryScore = 0;

let gemsCollected = 0;

let inverted = false;

setLegend(
  [skeletonArrow, bitmap`
................
................
................
................
....00000000....
....01111120....
....01111110....
....0L111110....
....0LL11110....
....0LLL1110....
....0LLL1110....
....00000000....
................
................
................
................`],
  [goldenTomb, bitmap`
4444444444444444
4444446666644444
444446LLLLL64444
444446L111L64444
44446LL111LL6444
44446L11111L6444
4446LL11111LL644
4446L1155511L644
4446L1111111L644
4446L1155511L644
4446L1111111L644
4446LLLLLLLLL644
446L111111111L64
446L6LLLLLLLLL64
4466666666666664
4444444444444444`],
  [doorLeft, bitmap`
0000000000000000
0000000000000000
0000660000000000
0006660000000000
0066660000000000
0666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
0666660000000000
0066660000000000
0006660000000000
0000660000000000
0000000000000000
0000000000000000`],
  [doorRight, bitmap`
0000000000000000
0000000000000000
0000000000660000
0000000000666000
0000000000666600
6666666666666660
6666666666666666
6666666666666666
6666666666666666
6666666666666666
0000000000666660
0000000000666600
0000000000666000
0000000000660000
0000000000000000
0000000000000000`],
  [doorUp, bitmap`
0000006666000000
0000066666600000
0000666666660000
0006666666666000
0066666666666600
0066666666666600
0000006666600000
0000006666600000
0000006666600000
0000006666600000
0000006666600000
0000006666600000
0000006666600000
0000006666600000
0000006666600000
0000006666600000`],
  [doorDown, bitmap`
0000006666600000
0000006666600000
0000006666600000
0000006666600000
0000006666600000
0000006666600000
0000006666600000
0000006666600000
0000006666600000
0000006666600000
0066666666666600
0066666666666600
0006666666666000
0000666666660000
0000066666600000
0000006666000000`],
  [wall, bitmap`
0000000000000000
0L11011101110120
0L11011101110110
0L11011101110110
0000000000000000
0L10111011101110
0L10111011101110
0L10111011101110
0000000000000000
0L11011101110110
0L11011101110110
0LL1011101110110
0000000000000000
0LL0L11011101110
0LL0LLL011101110
0000000000000000`],
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
  [skeletonLeft, bitmap`
......1111......
.....122221.....
....120202L1....
..C.122222L1....
.C2.102222L1....
C.2.12222LL1....
C.2..111111.....
C.2.122222L1....
C.2.122222L1....
C.211111111111..
C.2112222LL111..
C.2.1222LLL1....
.C2.11111111....
..C..11..11.....
.....11..11.....
.....11..11.....`],
  [skeletonRight, bitmap`
......1111......
.....122221.....
....1L202021....
....1L222221.C..
....1L222201.2C.
....1LL22221.2.C
.....111111..2.C
....1L222221.2.C
....1L222221.2.C
..111111111112.C
..111LL2222112.C
....1LLL2221.2.C
....11111111.2C.
.....11..11..C..
.....11..11.....
.....11..11.....`],
  [ghoulLeft, bitmap`
....11111.......
...1222221......
..122222221.....
..1222222221....
..1232232221....
.12222222221....
.12222222221....
.12222222221....
.122222222921...
.122222299221...
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
....1222322321..
....12222222221.
....12222222221.
....12222222221.
...129222222221.
...122992222221.
...12222222221..
...12211122221..
..12211.121121..
..1211..11.121..
..111..11..11...
..........11....`],
  [sleepyGhoul, bitmap`
..........666666
.....111111...6.
....12222221.6..
....122222266...
...1222222666666
...1200220021...
..122222222221..
..122222222221..
..122222222221..
..122222222221..
..122000000221..
..122722222221..
..122222122221..
..121221.11111..
..11.111.1..11..
...1..1.....1...`],
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
  [invertedPlayer, bitmap`
................
................
.......222......
.......2F2......
......2882......
......28882.2...
....2224842.2...
....2.2888222...
....2.2DDD2.....
......28882.....
.....2H8882.....
.....2HH82......
......222.......
......2.2.......
.....22.22......
................`],
  [invertedGrass, bitmap`
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555`],
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
0000000000000444`],
  [flower1, bitmap`
4444444444444444
441144444444D444
4411444444444444
226624444443D444
2166444444433444
442L44444D4DD444
4422444444444D44
44C44444444C4C44
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444754
4444444444447994`],
  [flower2, bitmap`
4444444444444444
4444444444444444
4446F44444444444
444FF44444444L44
46FCCF644444L444
466CC6F4444LHL44
444FF4444444LCC4
444F6444444C4444
4444444444444444
4444444444444444
4444444444444444
444444D144444444
44444D9D44444444
444444D444444444
4444444444444444
4444444444444444`],
  [blood, bitmap`
4444444444444444
4444444444444444
4444444444444484
4444334444444444
4444334444444444
4443434444448844
4434444444448848
4433444494448448
4334444449448884
4444444449444444
4444444444944444
4444444444944444
4444444444494444
4444444444494444
4444444444449444
4444444444444944`],
  [goldenFlowers, bitmap`
4444444444444444
4664466446644664
4664466446644664
4444444444444444
4444444444444444
4664466446644664
4664466446644664
4444444444444444
4444444444444444
4664466446644664
4664466446644664
4444444444444444
4444444444444444
4664466446644664
4664466446644664
4444444444444444`],
   [invertedBrick, bitmap`
2222222222222222
2399299929992972
2399299929992992
2399299929992992
2222222222222222
2392999299929992
2392999299929992
2392999299929992
2222222222222222
2399299929992992
2399299929992992
2339299929992992
2222222222222222
2332399299929992
2332333299929992
2222222222222222`]
);

setBackground(grass);

setSolids([player, wall]);

let levelI = initI;
let levelJ = initJ;
// CHANGE ALL COORDS WHEN ADDING ANYTHING!!
const levels = [
  ['',
    '',
    map`
w'www
wp[]w
wl{}w
wmffw
wwwww`
  ], // maze
  [map`
wwwwwwww'w
w0000000pw
w00000000w
w00000000w
w00000000w
we0000000w
w00000000w
w00000000w
w00000000w
w00000000w
wwwwwwwwww`, // maze end
    map`
wwww''wwww
wggggpgggw
wttttttttw
wttttttttw
wttttttttw
wtttttttt:
wttttttttw
wttttttttw
wttttttttw
wttttttttw
wwwwwwwwww`, // mase
    map`
wwwwwwwwww
wggggwgggw
wgwggwgwgw
wgwwwwgwgw
wgwggwgwgw
;pgggwgwgw
wwwggggwgw
wgwggggwgw
wgwgwwwwgw
wggggggggw
www"wwwwww`,
  ],
  [map`
wwwwwwwwww
wgwggwgggw
wgwggwgwgw
wgwgggggp:
;gwwwwwgg:
;gggggwggw
wggwggwggw
wggwwwwggw
wwwwggwggw
wwgggggggw
www""wwwww`, // maze
    map`
wwwwwwww'w
wggggwggpw
wgwggwgwgw
wgwwwwgwgw
wgwggwgwgw
;ggggwgwgw
wwwggggwgw
wgwggggwgw
wgwgwwwwgw
wggggggggw
www"wwwwww`, // maze
    map`
wwww'wwww
wgggpgggw
wwwwwwwww
wgggwgggw
wgggwgggw
wgggwgggw
wwwwwwwww`, //INVERTer
    map`
wwww'wwww
w666k666w
wzzzzzzzw
w666z666:
w666z666w
w666z666w
wwwwwwwww` // inverter
  ],
  [map`
wwwwwwwwww
wgggwggsgw
wgwgwwwggw
wgwwwggggw
wgggggwgp:
wggwwwwgg:
wwgwggwwww
wggwgggggw
wgwwggwggw
wgwgggwggw
wwww""w""w`, // mase
    map`
wwwwwwwwww
wggggggggw
wgwwwwwggw
wgwgwggggw
;ggggwwwgw
;ggwgggww:
wwwwggggp:
wggggggwgw
wgwwwwwwgw
wggggggggw
wwww""wwww`, // maze
    map`
wwww'wwww
wl[]gtgmw
wg{}ggtgw
;gffpmgg:
wggggggtw
wmggggglw
wwww"wwww`,
    map`
wwwwwwwww
wgggggggw
wggmggggw
;pggbgggw
wmggggggw
wbggggblw
wwwwwwwww`
  ],
];

function getMapWidth() {
  return levels[levelI][levelJ].trim().split("\n")[0].length;
}

function getMapHeight() {
  return levels[levelI][levelJ].split("\n").length;
}

setMap(levels[levelI][levelJ]);

setPushables({
  [invertedPlayer]: []
});

onInput("w", () => {
  if (getFirst(player) === undefined) {
    getFirst(invertedPlayer).y -= PLAYER_WALK_SPEED; // The actual movement is done in afterInput function, since we need to redraw the map
  } else {
    getFirst(player).y -= PLAYER_WALK_SPEED; // The actual movement is done in afterInput function, since we need to redraw the map
  }
});

onInput("a", () => {
  if (getFirst(player) === undefined) {
    getFirst(invertedPlayer).x -= PLAYER_WALK_SPEED; // The actual movement is done in afterInput function, since we need to redraw the map
  } else {
    getFirst(player).x -= PLAYER_WALK_SPEED; // The actual movement is done in afterInput function, since we need to redraw the map
  }
});

onInput("s", () => {
  if (getFirst(player) === undefined) {
    getFirst(invertedPlayer).y += PLAYER_WALK_SPEED; // The actual movement is done in afterInput function, since we need to redraw the map
  } else {
    getFirst(player).y += PLAYER_WALK_SPEED; // The actual movement is done in afterInput function, since we need to redraw the map
  }
});

onInput("d", () => {
  if (getFirst(player) === undefined) {
    getFirst(invertedPlayer).x += PLAYER_WALK_SPEED; // The actual movement is done in afterInput function, since we need to redraw the map
  } else {
    getFirst(player).x += PLAYER_WALK_SPEED; // The actual movement is done in afterInput function, since we need to redraw the map
  }
});

onInput("i", () => {
  if (!isInverter()) {
    if (canShootBullet) {
      addSprite(getFirst(player).x, getFirst(player).y - 1, bulletUp);
      canShootBullet = false;
      checkBulletEnemyKillAll(bulletUp);
    }
  } else {
    invert();
  }
});

onInput("j", () => {
  if (!isInverter()) {
    if (canShootBullet) {
      addSprite(getFirst(player).x - 1, getFirst(player).y, bulletLeft);
      canShootBullet = false;
      checkBulletEnemyKillAll(bulletLeft);
    }
  } else {
    invert();
  }
});

onInput("k", () => {
  if (!isInverter()) {
    if (canShootBullet) {
      addSprite(getFirst(player).x, getFirst(player).y + 1, bulletDown);
      canShootBullet = false;
      checkBulletEnemyKillAll(bulletDown);

    } else {
      invert();
    }
  }
});

onInput("l", () => {
  if (!isInverter()) {
    if (canShootBullet) {
      addSprite(getFirst(player).x + 1, getFirst(player).y, bulletRight);
      canShootBullet = false;
      checkBulletEnemyKillAll(bulletRight);
    }
  } else {
    levelI = inverterStart[0];
    levelJ = inverterStart[1];
    setMap(levels[levelI][levelJ]);
  }
});

function invert() {
  if (inverted) {
      inverted = false;
      levelJ--;
      setMap(levels[levelI][levelJ]);
    } else {
      inverted = true;
      levelJ++;
      setMap(levels[levelI][levelJ]);
    }
}

function isInverter(){
  inverters.forEach(level =>  {
    console.log(levelI === level[0] && levelJ === level[1]);
    if(levelI === level[0] && levelJ === level[1]) return true;
  });
  return false;
}

function checkBulletEnemyKillAll(bulletType) {
  enemies.forEach(enemy => bulletEnemyKill(bulletType, enemy));
}

function bulletEnemyKill(bulletType, enemyType) {
  tilesWith(enemyType, bulletType).forEach(enemyAndBullet => {
    enemyAndBullet.forEach((sprite) => {
      if (sprite._type === bulletType || sprite._type === enemyType) {
        if (levelI === butcheryCoords[0] && levelJ === butcheryCoords[1]) {
          butcheryScore += enemyScoreMap[enemyType];
          console.log(enemyScoreMap[enemyType]);
          let options = { y: 15, color: color`3` };
          texts.push([`The Butchery, ${butcheryScore}/${butcheryMax}`, options]);
          texts = texts.filter(n => n[0] !== `The Butchery, ${butcheryScore-enemyScoreMap[enemyType]}/${butcheryMax}`);
          refreshText();

          if (butcheryScore === butcheryMax && !butcheryGemGotten) {
            gemsCollected++;
            addSprite(7, 3, goldenTomb);
            ghoulImmuneLevels.push([3, 3]);
            sleepyGhoulImmuneLevels.push([3, 3]);
            skeletonImmuneLevels.push([3, 3]);
            butcheryGemGotten = true;
          }
        }
        sprite.remove();
      }
    });
  });
}
// Function to handle bullet movement
function moveBullets(bulletType) {
  getAll(bulletType).forEach((bullet) => {
    bullet.x += bulletVels[bulletType][0];
    bullet.y += bulletVels[bulletType][1];

    if (bullet.y <= 0 && bulletType == "^") bullet.remove();
    if (bullet.y >= getMapHeight() - 2 && bulletType == "v") bullet.remove();
    if (bullet.x <= 0 && bulletType == "<") bullet.remove();
    if (bullet.x >= getMapWidth() - 1 && bulletType == ">") bullet.remove();
  });

  checkBulletEnemyKillAll();
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

function getValidRandomCoords() {
  let randomX = getRandomInt(1, getMapWidth() - 3);
  while (randomX === getFirst(player).x) {
    randomX = getRandomInt(1, getMapWidth() - 3);
  }
  let randomY = getRandomInt(1, getMapHeight() - 3);
  while (randomY === getFirst(player).y) {
    randomY = getRandomInt(1, getMapHeight() - 3);
  }

  if (getFirst(player).x - randomX > 0) {
    return [randomX, randomY, "right"]
  } else {
    return [randomX, randomY, "left"]
  }

}

function manageGhoulSpawns() {
  let canSpawn = true;
  ghoulImmuneLevels.forEach(ij => {
    if (levelI === ij[0] && levelJ === ij[1]) {
      canSpawn = false;
    }
  });

  if (canSpawn) {
    ghoulCounter++;
    if (ghoulCounter > ghoulCounterMax) {
      ghoulCounter = 0;
      let randomX = getRandomInt(1, getMapWidth() - 3);
      while (randomX === getFirst(player).x) {
        randomX = getRandomInt(1, getMapWidth() - 3);
      }
      let randomY = getRandomInt(1, getMapHeight() - 3);
      while (randomY === getFirst(player).y) {
        randomY = getRandomInt(1, getMapHeight() - 3);
      }
      if (getFirst(player).x - randomX > 0) {
        addSprite(randomX, randomY, ghoulRight);
      } else {
        addSprite(randomX, randomY, ghoulLeft);
      }
      //console.log(`${randomX}, ${randomY}`);
      ghoulCounterMax += getRandomInt(-5 - difficultyGhoulSpawn, 15); // add some randomness, give more weight to increase since we dont want the player to die as soon as they spawn
      //ghoulCounterMax += 1000;
      ghoulDifficultyIncreaser++;
      if (ghoulDifficultyIncreaser >= 6) {
        ghoulDifficultyIncreaser = 0;
        difficultyGhoulSpawn += 3;
      }
    }
  }
}

function manageSleepyGhoulSpawns() {
  let canSpawn = true;
  sleepyGhoulImmuneLevels.forEach(ij => {
    if (levelI === ij[0] && levelJ === ij[1]) {
      canSpawn = false;
    }
  });
  if (canSpawn) {
    sleepyGhoulCounter++;
    if (sleepyGhoulCounter > sleepyGhoulCounterMax) {
      sleepyGhoulCounter = 0;
      let randomX = getRandomInt(1, getMapWidth() - 3);
      while (randomX === getFirst(player).x) {
        randomX = getRandomInt(1, getMapWidth() - 3);
      }
      let randomY = getRandomInt(1, getMapHeight() - 3);
      while (randomY === getFirst(player).y) {
        randomY = getRandomInt(1, getMapHeight() - 3);
      }
      addSprite(randomX, randomY, sleepyGhoul);
      //console.log(`${randomX}, ${randomY}`);
      //sleepyGhoulCounterMax += 1000;
    }
  }
}

function manageSkeletonSpawns() {
  let canSpawn = true;
  skeletonImmuneLevels.forEach(ij => {
    if (levelI === ij[0] && levelJ === ij[1]) {
      canSpawn = false;
    }
  });
  if (canSpawn) {
    skeletonCounter++;
    if (skeletonCounterMax === skeletonCounter) {
      skeletonCounter = 0;
      let randoms = getValidRandomCoords();
      if (randoms[2] === "left") {
        addSprite(randoms[0], randoms[1], skeletonLeft);
      } else {
        addSprite(randoms[0], randoms[1], skeletonRight);
      }
      //console.log(`${randomX}, ${randomY}`);
      //sleepyGhoulCounterMax += 1000;
    }
  }
}

function refreshText() {
  clearText();
  texts.forEach(text => {
    addText(text[0], text[1]);
  });
}

// Interval for misc things
setInterval(() => {
  if (!canShootBullet) {
    addText("reloading");
    texts.push(["reloading", {}]);
  } else {
    texts = texts.filter(n => n[0] !== "reloading");
    refreshText();
  }

  // Monster spawner timer, I decided to stop creating random new timers now
  manageGhoulSpawns();
  manageSleepyGhoulSpawns();
  manageSkeletonSpawns();
}, 100);

function xAndYCoordMotionEnemy(enemyType) {
  getAll(enemyType).forEach(enemy => {
    let playerX = getFirst(player).x;
    let playerY = getFirst(player).y;
    if (playerX === enemy.x) {
      if (playerY > enemy.y) enemy.y++;
      else if (playerY < enemy.y) enemy.y--;
      //else if(playerY === enemy.y) console.log("player dead");
    } else if (playerY === enemy.y) {
      if (playerX > enemy.x) enemy.x++;
      else if (playerX < enemy.x) enemy.x--;
      //else if(playerX === enemy.x) console.log("player dead");
    } else {
      let xOrY = getRandomInt(0, 1);
      if (xOrY === 0) {
        if (playerX > enemy.x) enemy.x++;
        else if (playerX < enemy.x) enemy.x--;
        //else if(playerX === enemy.x) console.log("player dead");
      } else {
        if (playerY > enemy.y) enemy.y++;
        else if (playerY < enemy.y) enemy.y--;
        //else if(playerY === enemy.y) console.log("player dead");
      }
    }
    bulletEnemyKill(bulletLeft, enemyType);
    bulletEnemyKill(bulletRight, enemyType);
  })
}

function allBulletKill(enemyType) {
  bulletEnemyKill(bulletLeft, enemyType);
  bulletEnemyKill(bulletRight, enemyType);
}

// Ghoul interval
setInterval(() => {
  xAndYCoordMotionEnemy(ghoulLeft);
  xAndYCoordMotionEnemy(ghoulRight);
}, 400);

// Sleepy ghoul interval
setInterval(() => {
  getAll(sleepyGhoul).forEach((currentGhoul) => {
    let playerX = getFirst(player).x;
    let playerY = getFirst(player).y;
    if (playerX === currentGhoul.x) {
      if (playerY > currentGhoul.y) {
        currentGhoul.y++;
        bulletEnemyKill(bulletUp, sleepyGhoul);
      } else if (playerY < currentGhoul.y) {
        bulletEnemyKill(bulletDown, sleepyGhoul);
        currentGhoul.y--;
      }
    } else if (playerY === currentGhoul.y) {
      if (playerX > currentGhoul.x) {
        bulletEnemyKill(bulletLeft, sleepyGhoul);
        currentGhoul.x++;
      } else if (playerX < currentGhoul.x) {
        bulletEnemyKill(bulletRight, sleepyGhoul);
        currentGhoul.x--;
      }
    }
  });
}, 100);

function spawnskeletonArrow(skeleton) {
  addSprite(skeleton.x + 1, skeleton.y, skeletonArrow);
}

// Skeleton interval
setInterval(() => {
  getAll(skeletonLeft).forEach(skeleton => {
    spawnskeletonArrow(skeleton);
  });
  getAll(skeletonRight).forEach(skeleton => {
    spawnskeletonArrow(skeleton);
  });
}, 1500);

// Bullet interval
setInterval(() => {
  xAndYCoordMotionEnemy(skeletonArrow);
}, 300);

// just in case
setInterval(() => {
  checkBulletEnemyKillAll(bulletLeft);
  checkBulletEnemyKillAll(bulletRight);
  checkBulletEnemyKillAll(bulletUp);
  checkBulletEnemyKillAll(bulletDown);
}, 100);

let di = 0;
let dj = 0;
let shownText = false;
afterInput(() => {
  // Player collisions
  // TODO add all inverted rooms to the immunes
  if (tilesWith(player, doorLeft).length !== 0 || tilesWith(invertedPlayer, doorLeft).length !== 0) {
    dj--;
  } else if (tilesWith(player, doorRight).length !== 0 || tilesWith(invertedPlayer, doorRight).length !== 0) {
    dj++;
  } else if (tilesWith(player, doorUp).length !== 0 || tilesWith(invertedPlayer, doorUp).length !== 0) {
    di++;
    console.log("YESS");
  } else if (tilesWith(player, doorDown).length !== 0 || tilesWith(invertedPlayer, doorDown).length !== 0) {
    di--;
  }
  levelI += di;
  levelJ += dj;
  if (di !== 0 || dj !== 0) {
    // ALl the inits as well
    texts = texts.filter(n => n[0] !== `The Butchery, ${butcheryScore}/${butcheryMax}`); // needed for butchery, i bet i could find a better way to do this but whatever

    butcheryScore = 0;
    shownText = false;
    if (levelI === mazeEnd[0] && levelJ === mazeEnd[1] && !mazeGemGotten) {
      gemsCollected++;
      mazeGemGotten = true;
    }

    setMap(levels[levelI][levelJ]);
    if (levelI === initI && levelJ === initJ) { // player just entered the starting room again
      if (di === -1) { // went down, so spawn on up
        getFirst(player).x = 4;
        getFirst(player).y = 1;
      } else if (di === 1) {
        getFirst(player).x = 4;
        getFirst(player).y = 5;
      } else if (dj === 1) {
        getFirst(player).x = 1;
        getFirst(player).y = 3;
      } else if (dj === -1) {
        getFirst(player).x = 7;
        getFirst(player).y = 3
      }
    }
  }

  if (levelI === butcheryCoords[0] && levelJ === butcheryCoords[1]) {
    if (!shownText) {
      let options = { y: 15, color: color`3` };
      addText(`The Butchery, 0/${butcheryMax}`, options);
      texts.push([`The Butchery, 0/${butcheryMax}`, options]);
      shownText = true;
    }
  } else {
    //clearText();
    texts = texts.filter(n => n[0] !== `The Butchery, ${butcheryScore}/${butcheryMax}`);
    console.log(texts);
    refreshText();
  }

  di = 0;
  dj = 0;
});
