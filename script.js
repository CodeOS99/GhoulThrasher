/*

*/

// helpers
function getRandomInt(min, max) {
   return Math.floor(Math.random() * (max - min + 1) ) + min;
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

const bulletVels = {
  ">": [1, 0],
  "<": [-1, 0],
  "^": [0, -1],
  "v": [0, 1]
};

const enemies = [
  ghoulLeft, ghoulRight,
  sleepyGhoul
];

const PLAYER_WALK_SPEED = 1;

let canShootBullet = true;

let ghoulCounterMax = 50; // We won't const this because we will change this
let ghoulCounter = 0;

let ghoulDifficultyIncreaser = 0;
let difficultyGhoulSpawn = 0;

let sleepyGhoulCounterMax = 70; // slightly longer than ghoul counter max
let sleepyGhoulCounter = 0;

setLegend(
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
4444444444444444`]
);

setBackground(grass);

setSolids([player, wall]);

let levelI = 0;
let levelJ = 0;
const levels = [
  [map`
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
;pggggggw
wmggggggw
wgggggglw
wwwwwwwww`]
];

function getMapWidth() {
  return levels[levelI][levelJ].trim().split("\n")[0].length;
}

function getMapHeight() {
  return levels[levelI][levelJ].split("\n").length;
}

setMap(levels[levelI][levelJ]);

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
    checkBulletEnemyKillAll(bulletUp);
  }
});

onInput("j", () => {
  if(canShootBullet){
    addSprite(getFirst(player).x - 1, getFirst(player).y, bulletLeft);
    canShootBullet = false;
    checkBulletEnemyKillAll(bulletLeft);
  }
});

onInput("k", () => {
  if(canShootBullet){
    addSprite(getFirst(player).x, getFirst(player).y + 1, bulletDown);
    canShootBullet = false;
    checkBulletEnemyKillAll(bulletDown);

  }
});

onInput("l", () => {
  if(canShootBullet){
    addSprite(getFirst(player).x + 1, getFirst(player).y, bulletRight);
    canShootBullet = false;
    checkBulletEnemyKillAll(bulletRight);
  }
});

function checkBulletEnemyKillAll(bulletType){
  enemies.forEach(enemy => bulletEnemyKill(bulletType, enemy));
}

function bulletEnemyKill(bulletType, enemyType) {
  tilesWith(enemyType, bulletType).forEach(enemyAndBullet => {
    enemyAndBullet.forEach((sprite) => {
      if(sprite._type === bulletType || sprite._type === enemyType) sprite.remove();
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

  bulletEnemyKill(bulletType, ghoulLeft);
  bulletEnemyKill(bulletType, ghoulRight);
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


function manageGhoulSpawns() {
  ghoulCounter++;
  if(ghoulCounter > ghoulCounterMax) {
    ghoulCounter = 0;
    let randomX = getRandomInt(1, getMapWidth()-3);
    while(randomX === getFirst(player).x) {
      randomX = getRandomInt(1, getMapWidth()-3);
    }
    let randomY = getRandomInt(1, getMapHeight()-3);
    while(randomY === getFirst(player).y) {
      randomY = getRandomInt(1, getMapHeight()-3);
    }
    if(getFirst(player).x-randomX > 0) {
        addSprite(randomX, randomY, ghoulRight);
    }else{
      addSprite(randomX, randomY, ghoulLeft);
    }
    //console.log(`${randomX}, ${randomY}`);
    ghoulCounterMax += getRandomInt(-5-difficultyGhoulSpawn, 15); // add some randomness, give more weight to increase since we dont want the player to die as soon as they spawn
    //ghoulCounterMax += 1000;
    ghoulDifficultyIncreaser ++;
    if(ghoulDifficultyIncreaser >= 6) {
      ghoulDifficultyIncreaser = 0;
      difficultyGhoulSpawn += 3;
    }
  }
}

function manageSleepyGhoulSpawns() {
  sleepyGhoulCounter++;
  console.log(sleepyGhoulCounter, sleepyGhoulCounterMax);
  if(sleepyGhoulCounter > sleepyGhoulCounterMax) {
    sleepyGhoulCounter = 0;
    let randomX = getRandomInt(1, getMapWidth()-3);
    while(randomX === getFirst(player).x) {
      randomX = getRandomInt(1, getMapWidth()-3);
    }
    let randomY = getRandomInt(1, getMapHeight()-3);
    while(randomY === getFirst(player).y) {
      randomY = getRandomInt(1, getMapHeight()-3);
    }
    addSprite(randomX, randomY, sleepyGhoul);
    //console.log(`${randomX}, ${randomY}`);
    //sleepyGhoulCounterMax += 1000;
  }
}

// Interval for misc things
setInterval(() => {
  if(!canShootBullet){
    addText("reloading");
  }else {
    clearText();
  }

  // Monster spawner timer, I decided to stop creating random new timers now
  manageGhoulSpawns();
  manageSleepyGhoulSpawns();
}, 100);

function xAndYCoordMotionEnemy(enemyType) {
  getAll(enemyType).forEach(enemy => {
    let playerX = getFirst(player).x;
    let playerY = getFirst(player).y;
    if(playerX === enemy.x) {
      if(playerY > enemy.y) enemy.y ++;
      else if(playerY < enemy.y) enemy.y--;
      //else if(playerY === enemy.y) console.log("player dead");
    } else if(playerY === enemy.y) {
      if(playerX > enemy.x) enemy.x ++;
      else if(playerX < enemy.x) enemy.x--;
      //else if(playerX === enemy.x) console.log("player dead");
    } else {
      let xOrY = getRandomInt(0, 1);
      if(xOrY === 0) {
        if(playerX > enemy.x) enemy.x ++;
        else if(playerX < enemy.x) enemy.x--;
        //else if(playerX === enemy.x) console.log("player dead");
      } else {
        if(playerY > enemy.y) enemy.y ++;
        else if(playerY < enemy.y) enemy.y--;
        //else if(playerY === enemy.y) console.log("player dead");
      }
    }
    bulletEnemyKill(bulletLeft, enemyType);
    bulletEnemyKill(bulletRight, enemyType);
  })
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
      }
      else if (playerY < currentGhoul.y) {
        bulletEnemyKill(bulletDown, sleepyGhoul);
        currentGhoul.y--;
      }
    } else if (playerY === currentGhoul.y) {
      if (playerX > currentGhoul.x)  {
        bulletEnemyKill(bulletLeft, sleepyGhoul);
        currentGhoul.x++;
      }
      else if (playerX < currentGhoul.x) {
        bulletEnemyKill(bulletRight, sleepyGhoul);
        currentGhoul.x--;
      }
    }
  });
}, 100);

let di = 0;
let dj = 0;
afterInput(() => {
  // Player collisions
  if(tilesWith(player, doorLeft).length !== 0) {
    dj --;
  } else if(tilesWith(player, doorRight).length !== 0) {
    dj ++;
  } else if(tilesWith(player, doorUp).length !== 0) {
    di++;
  } else if(tilesWith(player, doorDown).length !== 0) {
    di--;
  }
  levelI += di;
  levelJ += dj;
  if(di !== 0 || dj !== 0) {
    setMap(levels[levelI][levelJ]);
    if(levelI === 0 && levelJ === 0) { // player just entered the starting room again
      if(di === -1) { // went down, so spawn on up
        getFirst(player).x = 4;
        getFirst(player).y = 1;
      } else if (di === 1) {
        getFirst(player).x = 4;
        getFirst(player).y = 5;
      } else if(dj === 1) {
        getFirst(player).x = 1;
        getFirst(player).y = 3;
      } else if(dj === -1) {
        getFirst(player).x = 7;
        getFirst(player).y = 3
      }
    }
  }
  
  di = 0;
  dj = 0;
});
