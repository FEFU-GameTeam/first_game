var requestAnimFrame = (function(){
    return window.requestAnimationFrame       ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame    ||
        window.oRequestAnimationFrame      ||
        window.msRequestAnimationFrame     ||
        function(callback){
            window.setTimeout(callback, 1000 / 60);
        };
})();


const MAX_INT = Math.pow(2, 53) - 1;
var map = [];
var door;
var coinsCount = 0;


var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
canvas.width = 640;
canvas.height = 416;
document.body.appendChild(canvas);

var lastTime;
function main() {
    var now = Date.now();
    var dt = (now - lastTime) / 1000.0;
    update(dt);
    render();

    lastTime = now;
	//setTimeout(main, 1000 / 10)
	requestAnimFrame(main);
};

function init() {
//    reset();
	mapping.setMap(map, 3);
//	objectCount();
	door = mapping.getDoor();
	coinsCount = coins.length;
    lastTime = Date.now();
    main();
}

function objectCount() {
	
	for (var i = 0; i < map.length; i++) {
		for (var j = 0; j < map[i].length; j++) {
			var y = i * spriteSize, x = j * spriteSize;
			
			switch (map[i][j]) {
				case B:
					blocks.push([x, y]);
					break;
				case C:
					coins.push([x, y]);
					break;
				case P:
					buildPenguin(x, y);
					map[i][j] = E;					
				case S:
					break;
				case E:
					break;
				default:
					grasses.push([x, y]);
					break;
			}	
		}
	}
			
}

resources.load([
    'img/front.png',
	'img/back.png',
	'img/left.png',
	'img/right.png',
    'img/1.png',
	'img/grass3.png',
	'img/block.png',
	'img/ground.png',
	'img/coin.png',	
	'img/penguin1.png',
	'img/penguin2.png',
	'img/penguin3.png'
]);
resources.onReady(init);

var player = {
    pos: [0, 0],
	btn: '',
    sprite: new Sprite('img/front.png', [0, 0], [24, 32], 4, [0, 1, 2, 3])
};

var grass = {
	pos: [0, 0],
    sprite: new Sprite('img/grass3.png', [0, 0], [32, 32], 0, 0)	
}

var ground = {
	pos: [0, 0],
	sprite: new Sprite('img/ground.png', [0, 0], [32, 32], 0, 0)	
}


var block = {
	pos: [0, 0],
    sprite: new Sprite('img/block.png', [0, 0], [32, 32], 0, 0)	
}

var coin = {
	pos: [0, 0],
    sprite: new Sprite('img/coin.png', [0, 0], [32, 32], 0, 0)	
}

var blocks = [];
var grasses = [];
var coins = [];

var lastFire = Date.now();
var terrainPattern;

var playerSpeed = 100;

function update(dt) {

//    handleInput(dt);
    document.addEventListener('keydown', keydown, false);
 //   document.addEventListener('keyup',   keyup,   false);	
//    updateEntities(dt);
//	penguinMove(dt);
//	updatePenguins(dt);
//    checkCollisions();
//	isGameFinished();

};
var KEY = { LEFT: 37, UP: 38, RIGHT: 39, DOWN: 40 };

function keydown(ev) {
	var y = Math.floor(player.pos[1] / 32);
	var x = Math.floor(player.pos[0] / 32);
    var handled = false;
    switch(ev.keyCode) {
      case KEY.UP:     
        if(checkPlayerBounds(y - 1, x)){
			map[y][x] = E;
			map[y - 1][x] = H;
		}
		break;
      case KEY.DOWN:
       if(checkPlayerBounds(y + 1, x)){
			map[y + 1][x] = H;
			map[y][x] = E;
		};
		break;
      case KEY.LEFT:               
        if(checkPlayerBounds(y, x - 1)){
			map[y][x] = E;
			map[y][x - 1] = H;  
		};
		break;
      case KEY.RIGHT:      		
        if(checkPlayerBounds(y, x + 1)){
			map[y][x] = E;
			map[y][x + 1] = H;  
		};
		break;
    }
}

function checkPlayerBounds(y, x) {
	return (map[y][x] == B) ? false : true;
}

function delObjectByCoords(point) {
	
	for (var j = 0; j < blocks.length; j++) {
		
		if (point[0] == blocks[j][0] && point[1] == blocks[j][1]) {
			blocks[j] = [MAX_INT, MAX_INT];
			break;
		}
	}
	
}

function openDoor() {
	
	for (var i = 0; i < (door.size[0] / 32); i++) {
		var a = [(door.pos[0] + i) * 32, door.pos[1] * 32];
		delObjectByCoords(a);
		map[door.pos[1]][door.pos[0] + i] = E;
	}
	
	for (var i = 0; i < (door.size[1] / 32); i++) {
		var a = [door.pos[0] * 32, (door.pos[1] + i) * 32];
		delObjectByCoords(a);
		map[door.pos[1] + i][door.pos[0]] = E;
	}
	
	coinsCount = -1; 
	
}

function render() {
	build.draw(map);
	//for(var i = 0; i < penguins.length; i++)
		//renderEntity(penguins[i]);
    //renderEntity(player);
};

function renderEntity(entity) {
    ctx.save();
    ctx.translate(entity.pos[0], entity.pos[1]);
    entity.sprite.render(ctx);
    ctx.restore();
}

function reset() {
	//penguin.pos = [450, 50];
    //player.pos = [50, canvas.height / 2];
};
