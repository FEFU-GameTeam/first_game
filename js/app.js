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
    requestAnimFrame(main);
};

function init() {
    reset();
	mapping.setMap(map, 3);
	objectCount();
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
    sprite: new Sprite('img/front.png', [0, 0], [32, 48], 0, [0, 1, 2, 3])
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

    handleInput(dt);
    updateEntities(dt);
	penguinMove(dt);
	updatePenguins(dt);
    checkCollisions();
	isGameFinished();

};

function isGameFinished() {
	
	var size2 = [10, player.sprite.size[1] - 38];
	var pos2 = [player.pos[0] + 2, player.pos[1] + 38];
	var pos = [door.pos[0] * 32 + 8, door.pos[1] * 32 + 8];
	
	if(boxCollides(pos2, size2, pos, door.size)) {
		alert('You Won');	
	}
}

function handleInput(dt) {
	if(input.isDown('SHIFT')){
		playerSpeed = 200;
		player.sprite.speed = 20;
	} else {
		playerSpeed = 100;
		player.sprite.speed = 14;
	}
		
	
    if(input.isDown('DOWN') || input.isDown('s')) {
        player.pos[1] += playerSpeed * dt;
		player.sprite.url = 'img/front.png';
		player.sprite.speed = 14;
		player.btn = 'DOWN';
	} else if(input.isDown('UP') || input.isDown('w')) {
        player.pos[1] -= playerSpeed * dt;
		player.sprite.url = 'img/back.png';
		player.sprite.speed = 14;
		player.btn = 'UP';
    } else if(input.isDown('LEFT') || input.isDown('a')) {
        player.pos[0] -= playerSpeed * dt;
		player.sprite.url = 'img/left.png';
		player.sprite.speed = 14;
		player.btn = 'LEFT';
    } else if(input.isDown('RIGHT') || input.isDown('d')) {
        player.pos[0] += playerSpeed * dt;
		player.sprite.url = 'img/right.png';
		player.sprite.speed = 14;
		player.btn = 'RIGHT';
    } else {
		player.sprite.speed = 0;
	}
}

function updateEntities(dt) {
    player.sprite.update(dt);
}

function collides(x, y, r, b, x2, y2, r2, b2) {
    return !(r <= x2 || x > r2 ||
             b <= y2 || y > b2);
}

function boxCollides(pos, size, pos2, size2) {
    return collides(pos[0], pos[1],
                    pos[0] + size[0], pos[1] + size[1],
                    pos2[0], pos2[1],
                    pos2[0] + size2[0], pos2[1] + size2[1]);
}

function checkCollisions() {
	checkPlayerBounds();
	checkCrossGrass();
	checkCrossPenguin();
	checkCrossCoins();
}

function checkCrossGrass() {
	
	for (var i = 0; i < grasses.length; i++){
		var size2 = [20, player.sprite.size[1] - 30];
		var pos2 = [player.pos[0] + 2, player.pos[1] + 28];
		 
		var pos = grasses[i];
		var size = grass.sprite.size;

		if(boxCollides(pos, size, pos2, size2)) {
			var x = Math.floor((pos[0] + 16) / 32);
			var y = Math.floor((pos[1] + 16) / 32);
			map[y][x] = E;
		}
	}
	
}

function checkCrossCoins() {
	
	for(var i = 0; i < coins.length; i++){
		
		if (coins[i] == undefined)
			continue;
		
		var size2 = [20, player.sprite.size[1] - 30];
		var pos2 = [player.pos[0] + 2, player.pos[1] + 28];
		
		var pos = coins[i];
        var size = coin.sprite.size;
		
        if(boxCollides(pos, size, pos2, size2)) {
			var x = Math.floor( (pos[0] + 16) / 32 );
			var y = Math.floor( (pos[1] + 16) / 32);
			map[y][x] = E;
			delete coins[i];
			coinsCount--;
			break;
		}
	}
	
	if (coinsCount == 0)
		openDoor();
	
}

function checkPlayerBounds() {
    if(player.pos[0] < 0) {
        player.pos[0] = 0;
    }
    else if(player.pos[0] > canvas.width - player.sprite.size[0]) {
        player.pos[0] = canvas.width - player.sprite.size[0];
    }

    if(player.pos[1] < 0) {
        player.pos[1] = 0;
    }
    else if(player.pos[1] > canvas.height - player.sprite.size[1]) {
        player.pos[1] = canvas.height - player.sprite.size[1];
    }
	
	for(var i = 0; i < blocks.length; i++){
        var pos = blocks[i];
        var size = block.sprite.size;
		var size2 = [20, player.sprite.size[1] - 30];
		var pos2 = [player.pos[0] + 2, player.pos[1] + 28];
		
        if(boxCollides(pos, size, pos2, size2)) {
			switch (player.btn) {
				case 'RIGHT':
					player.pos[0] = pos[0] - 25;
					break;
				case 'LEFT':
					player.pos[0] = pos[0] + size[0];
					break;
				case 'UP':
					player.pos[1] = pos[1] + size[1] - 28;
					break;
				case 'DOWN':
					player.pos[1] = pos[1] - player.sprite.size[1] - 2;
					break;
			}
		}
	}
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
	for(var i = 0; i < penguins.length; i++)
		renderEntity(penguins[i]);
    renderEntity(player);
};

function renderEntity(entity) {
    ctx.save();
    ctx.translate(entity.pos[0], entity.pos[1]);
    entity.sprite.render(ctx);
    ctx.restore();
}

function reset() {
	//penguin.pos = [450, 50];
    player.pos = [50, canvas.height / 2];
};
