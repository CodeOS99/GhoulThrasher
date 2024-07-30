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
const houseTopLeft2 = "P";
const houseTopRight2 = "Q";
const houseBottomLeft2 = "R";
const houseBottomRight2 = "S";
const bulletRight = ">";
const bulletLeft = "<";
const bulletUp = "^";
const bulletDown = "v";
const ghoulLeft = "h";
const ghoulRight = "o";
const babyGhoulLeft = "H";
const babyGhoulRight = "O";
const sleepyGhoul = "s";
const wall = "w";
const flower1 = "l";
const flower2 = "m";
const blood = "b";
const goldenTomb = "e";
const goldenFlowers = "&";
const skeletonLeft = "!";
const skeletonRight = "@";
const skeletonArrow = "#";
const invertedPlayer = "k"
const invertedGrass = "$";
const invertedBrick = "z";
const invertedButton = "%";
const pushable = "*";
const backToStartTper = "+";
const health53 = "3";
const health51 = "1";
const health52 = "2";
const health54 = "4";
const health55 = "5";
const health50 = "0";
const health30 = "6";
const health31 = "7";
const health32 = "8";
const health33 = "9";
const bootlegBulletLeft = "A";
const bootlegBulletRight = "B";
const bootlegBulletUp = "C";
const bootlegBulletDown = "D";
const crackedTiles1 = "E";
const crackedTiles2 = "F";
const crackedTiles3 = "G";
const nuclearBarrel = "N";
const nuclearSplashLeft = "I";
const nuclearSplashRight = "J";
const nuclearSplashUp = "K";
const nuclearSplashDown = "L";

const bulletVels = {
  ">": [1, 0],
  "<": [-1, 0],
  "^": [0, -1],
  "v": [0, 1],
  "B": [1, 0],
  "A": [1, 0],
  "C": [0, -1],
  "D": [0, 1],
};

const nuclearSplashVels = {
  "I": [0, -1],
  "J": [0, 1],
  "K": [-1, 0],
  "L": [1, 0]
}

const enemies = [
  ghoulLeft, ghoulRight,
  babyGhoulLeft, babyGhoulRight,
  sleepyGhoul,
  skeletonLeft, skeletonRight, skeletonArrow,
];

const butcheryMax = 10;

const enemyScoreMap = {
  "H": 2,
  "O": 2,
  "h": 1,
  "o": 1,
  "s": 2,
  "!": 2,
  "@": 2,
  "#": 1,
};

const initI = 3;
const initJ = 2;
const butcheryCoords = [3, 3];
const mazeEndCoords = [1, 0];
const inverterStart = [2, 2];
const inverters = [
  [2, 2],
  [2, 3],
  [2, 4],
  [2, 5],
  [2, 6],
  [2, 7],
  [2, 8],
  [2, 9],
  [2, 10],
  [2, 11],
  [2, 12],
  [2, 13],
  [2, 14],
  [2, 15]
];
const inverterEnd = [2, 16];
const warningRoom = [4, 2];
const tutorialFinalBossRoom = [4, 3];
const bossRoom = [4, 4];

// Gems declaration
let mazeGemGotten = false;
let butcheryGemGotten = false;
let inverterGemGotten = false;

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

let babyGhoulCounter = 0;
let babyGhoulCounterMax = 50;

// have text?(needed for clearText shenanigins in afterMovement in room 0, 1
let texts = [];

let playerHealth = 3;

const maxHouseHealth = 10;
let houseHealth = maxHouseHealth;

const ghoulImmuneLevels = [
  [0, 3],
  [1, 0],
  [1, 1],
  [1, 2],
  [2, 0],
  [2, 1],
  [3, 0],
  [3, 1],
  [2, 2],
  [2, 3],
  [2, 16]
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
  [2, 16]
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
  [2, 16]
];

const babyGhoulImmuneLevels = [
  [0, 3],
  [1, 0],
  [1, 1],
  [1, 2],
  [2, 0],
  [2, 1],
  [3, 0],
  [3, 1],
  [2, 2],
  [2, 3],
  [2, 16]
]

for (let level of inverters) {
  ghoulImmuneLevels.push(level);
  sleepyGhoulImmuneLevels.push(level);
  skeletonImmuneLevels.push(level);
  babyGhoulImmuneLevels.push(level);
}

let butcheryScore = 0;

let gemsCollected = 0;

let inverted = false;

let pushableList = [];
let buttonCoords = {
  '2,6': [
    [6, 4]
  ], // uninverted lvl coords!
  '2,8': [
    [2, 5]
  ],
  '2,10': [
    [6, 2],
    [6, 3],
    [6, 4]
  ],
  '2,12': [
    [4, 1],
    [5, 6]
  ],
  '2,14': [
    [9, 1]
  ]
}

let nuclearBarrelCurrent = 0;
let nuclearBarrelMax = 50;

setLegend(
  [nuclearBarrel, bitmap`
1110000000000111
1L0DDDDDDDDDD0L1
10DD44444444DD01
1011DDDDDDDD1101
1011111111111101
1011111111111101
10L1112222111L01
101L12606021L101
1011L206062L1101
1011126060211101
1011120606211101
1011112222111101
10L1111111111L01
101L11111111L101
1L01LLLLLLLL10L1
1110000000000111`],
  [nuclearSplashLeft, bitmap`
................
................
................
................
...DDDDDDDDDD...
...D44444444D...
...D44444444D...
...D44444444D...
...D44444444D...
...D44444444D...
...D44444444D...
...D44444444D...
...DDDDDDDDDD...
................
................
................`],
  [nuclearSplashRight, bitmap`
................
................
................
................
...DDDDDDDDDD...
...D44444444D...
...D44444444D...
...D44444444D...
...D44444444D...
...D44444444D...
...D44444444D...
...D44444444D...
...DDDDDDDDDD...
................
................
................`],
  [nuclearSplashUp, bitmap`
................
................
................
................
...DDDDDDDDDD...
...D44444444D...
...D44444444D...
...D44444444D...
...D44444444D...
...D44444444D...
...D44444444D...
...D44444444D...
...DDDDDDDDDD...
................
................
................`],
  [nuclearSplashDown, bitmap`
................
................
................
................
...DDDDDDDDDD...
...D44444444D...
...D44444444D...
...D44444444D...
...D44444444D...
...D44444444D...
...D44444444D...
...D44444444D...
...DDDDDDDDDD...
................
................
................`],
  [pushable, bitmap`
0000000000000000
0C666666666666C0
06C6666666666C60
066C66666666C660
0666C666666C6660
06666C6666C66660
066666C66C666660
0666666CC6666660
0666666CC6666660
066666C66C666660
06666C6666C66660
0666C666666C6660
066C66666666C660
06C6666666666C60
0C666666666666C0
0000000000000000`],
  [invertedButton, bitmap`
5555555555555555
5555555555555555
5555222222225555
5552211111122555
5522133333312255
5221333323331225
521C333332333125
521C333333233125
521C222222223125
521CC33333233125
521CCC3332333125
52L1CCC323331225
522L1CCC33312255
5522L11111122555
5552222222225555
5555555555555555`],
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
  [bootlegBulletLeft, bitmap`
................
................
................
................
....000000000...
....033333330...
....033333330...
....033333330...
....033333330...
....033333330...
....033333330...
....033333330...
....000000000...
................
................
................`],
  [bootlegBulletRight, bitmap`
................
................
................
................
....000000000...
....033333330...
....033333330...
....033333330...
....033333330...
....033333330...
....033333330...
....033333330...
....000000000...
................
................
................`],
  [bootlegBulletUp, bitmap`
................
................
................
................
....000000000...
....033333330...
....033333330...
....033333330...
....033333330...
....033333330...
....033333330...
....033333330...
....000000000...
................
................
................`],
  [bootlegBulletDown, bitmap`
................
................
................
................
....000000000...
....033333330...
....033333330...
....033333330...
....033333330...
....033333330...
....033333330...
....033333330...
....000000000...
................
................
................`],
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
  [babyGhoulLeft, bitmap`
................
.....1111.......
....122221......
....1222221.....
....1727221.....
...11222221.....
...12222221.....
...12222221.....
...12222221.....
...12222251.....
...11222521.....
....1111111.....
.....11..111....
......11..112...
................
................`],
  [babyGhoulRight, bitmap`
................
.......1111.....
......122221....
.....1222221....
.....1227271....
.....12222211...
.....12222221...
.....12222221...
.....12222221...
.....15222221...
.....12522211...
.....1111111....
....111..11.....
...211..11......
................
................`],
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
  [houseTopLeft2, bitmap`
1111111111111110
1LL2LLLLLLLLLL0C
1LL2LLLLLLLLL0CC
1LLL2LLLLLLL0CCC
1LL2LLLLLLL0CCCC
1L22LLLLLL0CCCCC
12LLLLLLL0CCCCCC
1LLLLLLL000CCCCC
1LLLLLL0CC00CCCC
1LLLLL0CCCCC0CCC
1LLLL0C0000000CC
1LLL0CCC0LL0CCCC
1LL0CCCC0L20CCCC
1L0CCCC000000CCC
10CCCCCCCCCCCCCC
0000000000000000`],
  [houseTopRight2, bitmap`
0111111111111111
C0LLLLLLLLLL2LL1
CC0LLLLLLLLL2LL1
CCC0LLLLLLL2LLL1
CCCC0LLLLLLL0LL1
CCCCC0LLLLLL20L1
CCCCCC0LLLLLLL21
CCCCC000LLLLLL21
CCCC00CC0LLLL2L1
CCC0CCCCC0LLLLL1
CC0000000C0LLLL1
CCCC0LL0CCC0LLL1
CCCC03L0CCCC0LL1
CCC000000CCCC0L1
CCCCCCCCCCCCCC01
0000000000000000`],
  [houseBottomLeft2, bitmap`
11109CCCCCCCC033
1LL0CCCCCCCCC093
1LL0C2222222C039
1L30C2C323C2C039
13L0C23C2C32C033
1LL0C2222222C039
1LL0C23C2C32C033
1LL0C2C323C2C093
1LL0C2222222C033
1LL0CCCCC3CCC033
1LL0CCCC33CCC033
1LL0CCCC3C3CC066
1LL0CC3CC33CC066
1LL0CCCCCC3CC036
1LL0CCCCCCCCC000
1110000000000000`],
  [houseBottomRight2, bitmap`
330CCCCCCCCC0111
390CCCCCCCCC0LL1
930C2222222C0LL1
930C27323C2C0LL1
330C2372C32C0L93
930C2229222C0L91
330C23C2732C0L91
390C2C32372C0L91
330C2222222C0LL1
330CCC3CCCCC0LL1
330CCC3CCCCC0LL1
660CC3CCC9CC0LL1
660CCCCCC93C0LL1
630CCCCC333C0LL1
000CCCCCC9990LL1
0000000000000111`],
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
2222222222222222`],
  [backToStartTper, bitmap`
0000000000000000
0666666666666660
0666336666666660
0663336666666660
0633336666666660
0333333333333330
C333333333333330
C333333333333330
C333333333333330
C333333333333330
0333336666666660
0633336666666660
0663336666666660
0666336666666660
0666666666666660
0000000000000000`],
  [health55, bitmap`
0000000000000000
0777777777777770
0777777777777770
0777777777777770
0777777777777770
0337337337337330
0337337337337330
0337337337337330
0337337337337330
0337337337337330
0777777777777770
0773737733377770
0773337737377770
0773737733377770
0773737737777770
0000000000000000`],
  [health54, bitmap`
0000000000000000
0777777777777770
0777777777777770
0777777777777770
0777777777777770
0337337337337LL0
0337337337337LL0
0337337337337LL0
0337337337337LL0
0337337337337LL0
0777777777777770
0773737733377770
0773337737377770
0773737733377770
0773737737777770
0000000000000000`],
  [health53, bitmap`
0000000000000000
0777777777777770
0777777777777770
0777777777777770
0777777777777770
0337337337LL7LL0
0337337337LL7LL0
0337337337LL7LL0
0337337337LL7LL0
0337337337LL7LL0
0777777777777770
0773737733377770
0773337737377770
0773737733377770
0773737737777770
0000000000000000`],
  [health52, bitmap`
0000000000000000
0777777777777770
0777777777777770
0777777777777770
0777777777777770
0337337LL7LL7LL0
0337337LL7LL7LL0
0337337LL7LL7LL0
0337337LL7LL7LL0
0337337LL7LL7LL0
0777777777777770
0773737733377770
0773337737377770
0773737733377770
0773737737777770
0000000000000000`],
  [health51, bitmap`
0000000000000000
0777777777777770
0777777777777770
0777777777777770
0777777777777770
0337LL7LL7LL7LL0
0337LL7LL7LL7LL0
0337LL7LL7LL7LL0
0337LL7LL7LL7LL0
0337LL7LL7LL7LL0
0777777777777770
07737377LLL77770
07733377L7L77770
07737377LLL77770
07737377L7777770
0000000000000000`],
  [health50, bitmap`
0000000000000000
0777777777777770
0777777777777770
0777777777777770
0777777777777770
0LL7LL7LL7LL7LL0
0LL7LL7LL7LL7LL0
0LL7LL7LL7LL7LL0
0LL7LL7LL7LL7LL0
0LL7LL7LL7LL7LL0
0777777777777770
077L7L77LLL77770
077LLL77L7L77770
077L7L77LLL77770
077L7L77L7777770
0000000000000000`],
  [health33, bitmap`
0000000000000000
0777777777777770
0777777777777770
0777777777777770
0777777777777770
0733373337333770
0733373337333770
0733373337333770
0777777777777770
0777777777777770
0777777777777770
0773737733377770
0773337737377770
0773737733377770
0773737737777770
0000000000000000`],
  [health32, bitmap`
0000000000000000
0777777777777770
0777777777777770
0777777777777770
0777777777777770
0733373337LLL770
0733373337LLL770
0733373337LLL770
0777777777777770
0777777777777770
0777777777777770
0773737733377770
0773337737377770
0773737733377770
0773737737777770
0000000000000000`],
  [health31, bitmap`
0000000000000000
0777777777777770
0777777777777770
0777777777777770
0777777777777770
073337LLL7LLL770
073337LLL7LLL770
073337LLL7LLL770
0777777777777770
0777777777777770
0777777777777770
07737377LLL77770
07733377L7L77770
07737377LLL77770
07737377L7777770
0000000000000000`],
  [health30, bitmap`
0000000000000000
0777777777777770
0777777777777770
0777777777777770
0777777777777770
07LLL7LLL7LLL770
07LLL7LLL7LLL770
07LLL7LLL7LLL770
0777777777777770
0777777777777770
0777777777777770
077L7L77LLL77770
077LLL77L7L77770
077L7L77LLL77770
077L7L77L7777770
0000000000000000`],
  [crackedTiles1, bitmap`
1111111111111111
1LLL2LLLLLLLLLL1
1LL2LLLLLLLLLLL1
1L2LLLLLLLLLLLL1
1L2L2LLLLLLLLLL1
1LL22LLLLLLLLLL1
1LL2LLLLLLLLLLL1
122LLLLLLLLLLLL1
1LLLLLLLLLLLLLL1
1LLLLLLLLLLLLLL1
1LLLLLLLLLLLLLL1
1LLLLLLLLLLLLLL1
1LLLLLLLLLL0LLL1
1LLLLLLLLL0L00L1
1LLLLLLLLLLLLL01
1111111111111111`],
  [crackedTiles2, bitmap`
1111111111111111
1LLLLLLLLLLL0LL1
1LLLLLLLLLLL0LL1
1LLLLLLLLLL0L1L1
1LLLLLLLLLLLLLL1
1LLLLLLLLLLLLLL1
12L22LLLLLLLLLL1
1L22LLLLLLLLLLL1
1LL2LLLLLLLLLLL1
1LLL22LLLLLLLLL1
1LLL2LLLLLLLLLL1
1LLL22LLLLLLLLL1
1LLL2LLLLLL0LLL1
1LL2LLLLLL0L00L1
1L2LLLLLLLLLLL01
1111111111111111`],
  [crackedTiles3, bitmap`
1111111111111111
1LLL2LLLLLL1LLL1
1LL2LLLLLLLL1LL1
1L2LLLLLLLLL1LL1
1L2L2LLLLLLLL1L1
1LL22LLLLLLLLL21
1LL2LLLLLLLLLL21
102LLLLLLLLLLLL1
1L0LLLLLLLLLLLL1
1LL0LLLLLLLLLLL1
1LL1LLLLLLLLLLL1
1LLLLLLLLLLLLLL1
1LLLLLLLLLL0LLL1
1LLLLLLLLL0L00L1
1LLLLLLLLLLLLL01
1111111111111111`],
);

setBackground(grass);

setSolids([player, wall, invertedPlayer, pushable, health55, health54, health53, health52, health51, health50, health30, health31, health32, health33]);

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
w&&&&&&&pw
w&&&&&&&&w
w&&&&&&&&w
w&&&&&&&&w
we&&&&&&&w
w&&&&&&&&w
w&&&&&&&&w
w&&&&&&&&w
w&&&&&&&&w
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
www""wwwww`, // maze 2,0
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
www"wwwwww`, // maze 2.1
    map`
wwww'wwww
wgggpgggw
wwwwwwwww
wgggwgggw
wgggwgggw
wgggwgggw
wwwwwwwww`, //INVERTer 1 2,2
    map`
wwwwwwwww
w$$$k$$$w
wzzzzzzzw
w$$$z$$$:
w$$$z$$$w
w$$$z$$$w
wwwwwwwww`, // inverter 1 2,3
    map`
wwwwwwwww
wggwwgggw
wwwwgwggw
wpgwgwggw
wwwwgwggw
wwg.gwggw
wwwwwwwww`, // inverter 1 2,4
    map`
wwwwwwwww
w$$www$$w
w$$w$z$$w
wk$w$w$$:
wwzwww$$w
ww$w$w$$w
wwwwwwwww`, // inverter 2 2,5
    map`
wwwwwwwww
wgggggggw
wgggggggw
wpg*ggggw
wgggggggw
wgggggggw
wwwwwwwww`, // inverter 3 2,6
    map`
wwwwwwwww
w$$$$$$$w
w$$$$$$$w
wk$$$$$$w
w$$$$$%$w
w$$$$$$$w
wwwwwwwww`, // inverter 3 2,7
    map`
wwwwwwwww
wggwgwggw
wwgwgwggw
wp*ggwggw
wwgwwwggw
wwggggggw
wwwwwwwww`, // inverted 4 2,8
    map`
wwwwwwwww
w$$w$w$$w
wzww$w$$w
wk$$$w$$:
ww$www$$w
ww%w$$$$w
wwwwwwwww`, //inverted 4 2,9
    map`
wwwwwwwww
wgggggggw
wg*gggggw
wp*gggggw
wg*gggggw
wgggggggw
wwwwwwwww`, // inverted 5 2,10
    map`
wwwwwwwww
w$$$$$$$w
w$$$$$%$w
wk$$$$%$w
w$$$$$%$w
w$$$$$$$w
wwwwwwwww`, // inverted 5 2,11
    map`
wwwwwwwwwww
wwwwggwgggw
wwg*ggwgggw
wpwwggwgggw
wwwwwgwgggw
wwwwggwgggw
wg*gggwgggw
wwwwwwwwwww`, // inverted 6 2,12
    map`
wwwwwwwwwww
wwww%$w$$$w
wzzw$$w$$$w
wkzz$$w$$$w
wzwww$w$$$w
wzww$$w$$$w
w$$$$%w$$$w
wwwwwwwwwww`, // inverted 6 2,13
    map`
wwwwwwwwwww
wggggwggggw
wg*ggggwggw
wwwwwwwwggw
wpggwwwwggw
wgssssssssw
wgssssssssw
wgssssssssw
wwwwwwwwwww`, // inverted 7 2,14
    map`
wwwwwwwwwww
w$$$$z$$$%w
w$$$$$$z$$w
wzzzzzzz$$w
wk$$zzzz$$w
w$$$$$$$$$w
w$$$$$$$$$w
w$$$$$$$$$w
wwwwwwwwwww`, // inverted 7 2,15
    map`
wwwwwwwww
w&&&&&&&w
w&&&&&&&w
+p&&&&&ew
w&&&&&&&w
w&&&&&&&w
wwwwwwwww`
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
9www'wwww
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
  [``,
    ``,
    map`
wwwwwwwww
wgggggggw
wgggggggw
wgggggggw
wggggggg:
wgggggggw
wgggggggw
wgggpgggw
wwww"wwww`,
    map`
wwwwwwwwwww
wgggggggggw
wgggggggggw
wgggggggggw
;pgggggggg:
wgggggggggw
wgggggggggw
wgggggggggw
wwwwwwwwwww`,
    map`
wwwwwwwwwww
wEGFEGFEGFw
wFPQFEGFEGw
wERSNGNEGFw
wFEGFEGFEGw
wEGFEGFEGFw
wFEGFEGFEGw
wEGFEpFEGFw
wwwwwwwwwww`
  ]
];

for (let j = 0; j < levels[4].length; j++) {
  ghoulImmuneLevels.push([4, j]);
  sleepyGhoulImmuneLevels.push([4, j]);
  skeletonImmuneLevels.push([4, j]);
  babyGhoulImmuneLevels.push([4, j]);
}

function getMapWidth() {
  return levels[levelI][levelJ].trim().split("\n")[0].length;
}

function getMapHeight() {
  return levels[levelI][levelJ].split("\n").length;
}

setMap(levels[levelI][levelJ]);

setPushables({
  [player]: [pushable]
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
      if (inverterGemGotten) {
        shootBootlegBullet(0, -1);
      }
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
      if (inverterGemGotten) {
        shootBootlegBullet(-1, 0);
      }
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
      if (inverterGemGotten) {
        shootBootlegBullet(0, 1);
      }

    }
  } else {
    invert();
  }
});

onInput("l", () => {
  if (!isInverter()) {
    if (canShootBullet) {
      addSprite(getFirst(player).x + 1, getFirst(player).y, bulletRight);
      canShootBullet = false;
      checkBulletEnemyKillAll(bulletRight);
      if (inverterGemGotten) {
        shootBootlegBullet(1, 0);
      }
    }
  } else {
    setMap(levels[levelI][levelJ]);
    updateHealthTile();
  }
});

function shootBootlegBullet(dx, dy) { // dx and dy so we can avoid them
  changeYorX = getRandomInt(0, 1);
  if (changeYorX) {
    // Change X
    let change = getRandomInt(0, 1);

    if (change === 0) {
      if (-1 === dx) {
        shootBootlegBullet(dx, dy);
        return;
      }
      addSprite(getFirst(player).x - 1, getFirst(player).y, bootlegBulletLeft);
    } else {
      if (1 === dx) {
        shootBootlegBullet(dx, dy);
        return;
      }
      addSprite(getFirst(player).x + 1, getFirst(player).y, bootlegBulletRight);
    }
  } else {
    // Change Y
    let change = getRandomInt(0, 1);

    if (change === 0) {
      if (-1 === dy) {
        shootBootlegBullet(dx, dy);
        return;
      }
      addSprite(getFirst(player).x, getFirst(player).y - 1, bootlegBulletDown);
    } else {
      if (1 === dy) {
        shootBootlegBullet(dx, dy);
        return;
      }
      addSprite(getFirst(player).x, getFirst(player).y + 1, bootlegBulletUp);
    }
  }
}

function updateHealthTile() {
  if (!mazeGemGotten) { // 3 health
    console.log(getMapWidth() - 1);
    clearTile(0, 0);
    addSprite(0, 0, `${playerHealth+6}`);
  } else { // 5 health
    clearTile(0, 0);
    addSprite(0, 0, `${playerHealth}`);
  }
}

function invert() {
  let nowX, nowY;
  if (inverted) {
    nowX = getFirst(invertedPlayer).x;
    nowY = getFirst(invertedPlayer).y;
    inverted = false;
    levelJ--;
    setMap(levels[levelI][levelJ]);
    updateHealthTile();
    getFirst(player).remove();
    addSprite(nowX, nowY, player);

    let pushables = getAll(pushable);
    for (let i = 0; i < pushables.length; i++) {
      pushables[i].remove();
      addSprite(pushableList[i][0], pushableList[i][1], pushable)
    }
    pushableList = [];
  } else {
    nowX = getFirst(player).x;
    nowY = getFirst(player).y;
    inverted = true;
    levelJ++;
    for (let pushable1 of getAll(pushable)) {
      pushableList.push([pushable1.x, pushable1.y]);
      console.log(pushableList);
    }
    setMap(levels[levelI][levelJ]);
    updateHealthTile();
    getFirst(invertedPlayer).remove();
    addSprite(nowX, nowY, invertedPlayer);
  }
}

function isInverter() {
  for (let level of inverters) {
    if (levelI === level[0] && levelJ === level[1]) return true;
  }
  return false;
}

function initAll() {
  texts = texts.filter(n => n[0] !== `The Butchery, ${butcheryScore}/${butcheryMax}`); // needed for butchery, i bet i could find a better way to do this but whatever

  butcheryScore = 0;
  shownText = false;
  inverted = false;
}

function updateProgressFinalBossText() {
  texts = texts.filter(n => {
    n[0].includes("Progress")
  });
  addText(`Progress:${Math.floor(((maxHouseHealth-houseHealth)/maxHouseHealth)*100)}`, { y: getMapHeight() - 1, color: color`C` });
  texts.push([`Progress:${Math.floor(((maxHouseHealth-houseHealth)/maxHouseHealth)*100)}`, { y: getMapHeight() - 1, color: color`C` }]);
}

function checkBulletEnemyKillAll(bulletType) {
  enemies.forEach(enemy => bulletEnemyKill(bulletType, enemy));
  nuclearExplosionCheck(bulletType);
}

function checkAllBulletKillAllEnemy() {
  for (let bulletType in bulletVels) {
    checkBulletEnemyKillAll(bulletType);
  }
  for (let splashType in nuclearSplashVels) {
    nuclearSplashCheck(splashType);
  }
}

function bulletEnemyKill(bulletType, enemyType) {
  tilesWith(enemyType, bulletType).forEach(enemyAndBullet => {
    enemyAndBullet.forEach((sprite) => {
      if (sprite._type === bulletType || sprite._type === enemyType) {
        if (levelI === butcheryCoords[0] && levelJ === butcheryCoords[1]) {
          butcheryScore += enemyScoreMap[enemyType];
          console.log(enemyScoreMap[enemyType]);
          console.log(`The enemy is ${enemyType}`)
          console.log(`The entire table is ${enemyScoreMap}`);
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
            babyGhoulImmuneLevels.push([3, 3]);
            butcheryGemGotten = true;
            if (mazeGemGotten) {
              playerHealth = 5;
            } else {
              playerHealth = 3;
            }
            updateHealthTile();
          }
        }
        sprite.remove();
      }
    });
  });
}

function nuclearSplashCheck(splashType) {
  nuclearHousePartCheck(splashType, houseTopLeft2);
  nuclearHousePartCheck(splashType, houseTopRight2);
  nuclearHousePartCheck(splashType, houseBottomLeft2);
  nuclearHousePartCheck(splashType, houseBottomRight2);
}

function nuclearHousePartCheck(splashType, houseType) {
  tilesWith(splashType, houseType).forEach(pair => {
    console.log(splashType);
    if(pair[0]._type === splashType) {
      pair[0].remove();
    } else if(pair[1]._type === splashType){
      pair[1].remove();
    }
    houseHealth--;
    updateProgressFinalBossText();
    return;
  });
}

// Function to handle bullet movement
function moveBullets(bulletType) {
  getAll(bulletType).forEach((bullet) => {
    if (bulletType === nuclearSplashUp || bulletType === nuclearSplashDown || bulletType === nuclearSplashRight || bulletType === nuclearSplashLeft) {
      bullet.x += nuclearSplashVels[bulletType][0];
      bullet.y += nuclearSplashVels[bulletType][1];

      if (bullet.y <= 0) bullet.remove();
      if (bullet.y >= getMapHeight() - 2) bullet.remove();
      if (bullet.x <= 0) bullet.remove();
      if (bullet.x >= getMapWidth() - 1) bullet.remove();
    } else {
      bullet.x += bulletVels[bulletType][0];
      bullet.y += bulletVels[bulletType][1];

      if (bullet.y <= 0) bullet.remove();
      if (bullet.y >= getMapHeight() - 2) bullet.remove();
      if (bullet.x <= 0) bullet.remove();
      if (bullet.x >= getMapWidth() - 1) bullet.remove();
    }
  });

  checkAllBulletKillAllEnemy();
}

function nuclearExplosionCheck(bulletType) {
  tilesWith(bulletType, nuclearBarrel).forEach(bulletBarrel => {
    bulletBarrel.forEach(sprite => {
      if (sprite._type === nuclearBarrel) { // only spawn splashes now
        addSprite(sprite.x + 1, sprite.y, nuclearSplashRight);
        addSprite(sprite.x - 1, sprite.y, nuclearSplashLeft);
        addSprite(sprite.x, sprite.y + 1, nuclearSplashDown);
        addSprite(sprite.x, sprite.y - 1, nuclearSplashUp);
        let x = sprite.x;
        let y = sprite.y;
        addSprite(x, y, crackedTiles1);
        sprite.remove();
        return;
      }
      sprite.remove();
    });
  });
}

// Bullet logic
setInterval(() => {
  moveBullets(bulletLeft);
  moveBullets(bulletRight);
  moveBullets(bulletUp);
  moveBullets(bulletDown);

  moveBullets(bootlegBulletLeft);
  moveBullets(bootlegBulletRight);
  moveBullets(bootlegBulletUp);
  moveBullets(bootlegBulletDown);

  moveBullets(nuclearSplashUp);
  moveBullets(nuclearSplashDown);
  moveBullets(nuclearSplashLeft);
  moveBullets(nuclearSplashRight);
}, 100);

// Nuclear Barrel Spawning Logic
setInterval(() => {
  nuclearBarrelCurrent ++;
  if(levelI === bossRoom[0] && levelJ === bossRoom[1] && nuclearBarrelCurrent === nuclearBarrelMax) {
    nuclearBarrelCurrent = 0;
    coords = getValidRandomCoords();
    addSprite(coords[0], coords[1], nuclearBarrel);
  }
}, 100);

let count = 0;
// shoot interval
setInterval(() => {
  // Reward for butchery mechanism
  if (!butcheryGemGotten) {
    if (count == 0)
      count++;
    else {
      count = 0;
      canShootBullet = true;
    }
  } else
    canShootBullet = true;
}, 150);

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

function manageBabyGhoulSpawns() {
  let canSpawn = true;
  babyGhoulImmuneLevels.forEach(ij => {
    if (levelI === ij[0] && levelJ === ij[1]) {
      canSpawn = false;
    }
  });

  if (canSpawn) {
    babyGhoulCounter++;
    if (babyGhoulCounter > babyGhoulCounterMax) {
      babyGhoulCounter = 0;
      let randomX = getRandomInt(1, getMapWidth() - 3);
      while (randomX === getFirst(player).x) {
        randomX = getRandomInt(1, getMapWidth() - 3);
      }
      let randomY = getRandomInt(1, getMapHeight() - 3);
      while (randomY === getFirst(player).y) {
        randomY = getRandomInt(1, getMapHeight() - 3);
      }
      if (getFirst(player).x - randomX > 0) {
        addSprite(randomX, randomY, babyGhoulRight);
      } else {
        addSprite(randomX, randomY, babyGhoulLeft);
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
  manageBabyGhoulSpawns();
}, 100);

function xAndYCoordMotionEnemy(enemyType) {
  getAll(enemyType).forEach(enemy => {
    let playerX = getFirst(player).x;
    let playerY = getFirst(player).y;
    if (playerX === enemy.x) {
      if (playerY > enemy.y) enemy.y++;
      else if (playerY < enemy.y) enemy.y--;
      else if (playerY === enemy.y) {
        if (playerHealth > 0) playerHealth--;
        updateHealthTile();
        if (playerHealth < 1) {
          //DEAD!
          // dont do anything now for debugging
        }
      }
    } else if (playerY === enemy.y) {
      if (playerX > enemy.x) enemy.x++;
      else if (playerX < enemy.x) enemy.x--;
      else if (playerY === enemy.y) {
        if (playerHealth > 0) playerHealth--;
        updateHealthTile();
        if (playerHealth < 1) {
          //DEAD!
          // dont do anything now for debugging
        }
      }
    } else {
      let xOrY = getRandomInt(0, 1);
      if (xOrY === 0) {
        if (playerX > enemy.x) enemy.x++;
        else if (playerX < enemy.x) enemy.x--;
        else if (playerY === enemy.y) {
          if (playerHealth > 0) playerHealth--;
          updateHealthTile();
          if (playerHealth < 1) {
            //DEAD!
            // dont do anything now for debugging
          }
        }
      } else {
        if (playerY > enemy.y) enemy.y++;
        else if (playerY < enemy.y) enemy.y--;
        else if (playerY === enemy.y) {
          if (playerHealth > 0) playerHealth--;
          updateHealthTile();
          if (playerHealth < 1) {
            //DEAD!
            // dont do anything now for debugging
          }
        }
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

// Baby Ghoul Interval
setInterval(() => {
  xAndYCoordMotionEnemy(babyGhoulLeft);
  xAndYCoordMotionEnemy(babyGhoulRight);
}, 200);

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
      } else {
        if (playerHealth > 0) playerHealth--;
        updateHealthTile();
        if (playerHealth < 1) {
          //DEAD!
          // dont do anything now for debugging
        }
      }
    } else if (playerY === currentGhoul.y) {
      if (playerX > currentGhoul.x) {
        bulletEnemyKill(bulletLeft, sleepyGhoul);
        currentGhoul.x++;
      } else if (playerX < currentGhoul.x) {
        bulletEnemyKill(bulletRight, sleepyGhoul);
        currentGhoul.x--;
      } else {
        if (playerHealth > 0) playerHealth--;
        updateHealthTile();
        if (playerHealth < 1) {
          //DEAD!
          // dont do anything now for debugging
        }
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
    if (getFirst(player).x === skeleton.x && getFirst(player).y === skeleton.Y) {
      if (playerHealth > 0) playerHealth--;
      updateHealthTile();
      if (playerHealth < 1) {
        //DEAD!
        // dont do anything now for debugging
      }
    }
  });
  getAll(skeletonRight).forEach(skeleton => {
    spawnskeletonArrow(skeleton);

    if (getFirst(player).x === skeleton.x && getFirst(player).y === skeleton.Y) {
      if (playerHealth > 0) playerHealth--;
      updateHealthTile();
      if (playerHealth < 1) {
        //DEAD!
        // dont do anything now for debugging
      }
    }
  });
}, 1500);

// Skeleton Bullet interval
setInterval(() => {
  xAndYCoordMotionEnemy(skeletonArrow);
}, 300);

let di = 0;
let dj = 0;
let shownText = false;
afterInput(() => {
  // pushable button connection
  if (buttonCoords[`${levelI},${levelJ}`] !== undefined) {
    let buttonFlagWhole = true;
    let pushables = getAll(pushable);
    for (let i = 0; i < pushables.length; i++) {
      let targetButtonCoord = buttonCoords[`${levelI},${levelJ}`];
      let buttonFlag = false;
      for (let coord of targetButtonCoord) {
        if (pushables[i].x === coord[0] && pushables[i].y === coord[1] && pushables[i] !== undefined) {
          buttonFlag = true;
          console.log("loging ", );
        }
      }
      if (!buttonFlag) {
        buttonFlagWhole = false;
      }
    }
    if (buttonFlagWhole) {
      dj += 2;
    }
  }
  // Player collisions
  if (tilesWith(player, doorLeft).length !== 0 || tilesWith(invertedPlayer, doorLeft).length !== 0) {
    dj--;
  } else if (tilesWith(player, doorRight).length !== 0 || tilesWith(invertedPlayer, doorRight).length !== 0) {
    dj++;
  } else if (tilesWith(player, doorUp).length !== 0 || tilesWith(invertedPlayer, doorUp).length !== 0) {
    di++;
  } else if (tilesWith(player, doorDown).length !== 0 || tilesWith(invertedPlayer, doorDown).length !== 0) {
    di--;
  }
  levelI += di;
  levelJ += dj;

  if (levelI === inverterEnd[0] && levelJ === inverterEnd[1]) {
    inverterGemGotten = true;
    if (mazeGemGotten) playerHealth = 5;
    else playerHealth = 3;
    updateHealthTile();
  }

  if (tilesWith(player, backToStartTper).length !== 0) {
    levelI = initI;
    levelJ = initJ;
    setMap(levels[levelI][levelJ])
    updateHealthTile();
  }

  if (di !== 0 || dj !== 0) {
    // ALl the inits as well
    initAll();
    console.log(`${levelI}, ${levelJ}`);
    console.log(`${mazeEndCoords[0]}, ${mazeEndCoords[1]}`);
    if (levelI === mazeEndCoords[0] && levelJ === mazeEndCoords[1] && !mazeGemGotten) {
      gemsCollected++;
      mazeGemGotten = true;
      playerHealth = 5;
      updateHealthTile();
    }

    setMap(levels[levelI][levelJ]);
    updateHealthTile();
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
    refreshText();
  }

  di = 0;
  dj = 0;

  let shownWarningText = false;
  if (levelI === warningRoom[0] && levelJ === warningRoom[1]) {
    if (!shownWarningText) {
      console.log("120");
      let options1 = { y: 3, color: color`3` };
      let options2 = { y: 4, color: color`3` };
      let options3 = { y: 5, color: color`3` };
      let options4 = { y: 6, color: color`3` };
      addText("WARNING!", options1);
      addText("DEATH LIES AHEAD", options2);
      addText("ENTER AT", options3);
      addText("YOUR OWN RISK", options4);
      texts.push(["WARNING!", options1]);
      texts.push(["DEATH LIES AHEAD", options2]);
      texts.push(["ENTER AT", options3]);
      texts.push(["YOUR OWN RISK", options4]);
      shownWarningText = true;
    }
  } else {
    //clearText();
    texts = texts.filter(n => n[0] !== "WARNING!");
    texts = texts.filter(n => n[0] !== "DEATH LIES AHEAD");
    texts = texts.filter(n => n[0] !== "ENTER AT");
    texts = texts.filter(n => n[0] !== "YOUR OWN RISK");
    refreshText();
  }

  let shownTutText = false;
  if (levelI === tutorialFinalBossRoom[0] && levelJ === tutorialFinalBossRoom[1]) {
    if (!shownTutText) {
      let options1 = { y: 3, color: color`3` };
      let options2 = { y: 4, color: color`3` };
      let options3 = { y: 5, color: color`3` };
      let options4 = { y: 6, color: color`3` };
      addText("HE IS TOO MIGHTY", options1);
      addText("FOR YOUR BULLETS", options2);
      addText("TURN BACK", options3);
      addText("LAST CHANCE", options4);
      texts.push(["HE IS TOO MIGHTY", options1]);
      texts.push(["FOR YOUR BULLETS", options2]);
      texts.push(["TURN BACK", options3]);
      texts.push(["LAST CHANCE", options4]);
      shownTutText = true;
    }
  } else {
    texts = texts.filter(n => n[0] !== "HE IS TOO MIGHTY");
    texts = texts.filter(n => n[0] !== "FOR YOUR BULLETS");
    texts = texts.filter(n => n[0] !== "TURN BACK");
    texts = texts.filter(n => n[0] !== "LAST CHANCE");
    refreshText();
  }
  if (levelI === bossRoom[0] && levelJ === bossRoom[1]) {
    updateProgressFinalBossText();
  }
});
