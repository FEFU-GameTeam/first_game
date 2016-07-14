var requestAnimFrame = (function(){
    return window.requestAnimationFrame       ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame    ||
        window.oRequestAnimationFrame      ||
        window.msRequestAnimationFrame     ||
        function(callback) {
            window.setTimeout(callback, 1000 / 60);
        };
})();

var map = [];
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
	var levelNumber = 0;
	
	levelNumber = 0; // -> get LevelNumber
	player.posOnMap = mapping.setMap(map, levelNumber);
	player.pos = [player.posOnMap[1] * spriteSize, player.posOnMap[0] * spriteSize];
	coinsCount = mapping.getCoins(levelNumber);
    lastTime = Date.now();
    main();
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
	'img/penguin3.png',
	'img/door.png'
]);
resources.onReady(init);

var player = {
    pos: [0, 0],
	posOnMap: [0, 0],
	speed : 100,
	active : false,
	dir: '',
    sprite: new Sprite('img/front.png', [0, 0], [18, 32], 0, [0, 1, 2, 3])
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

var door = {
	pos: [0, 0],
	isOpen: false,
	sprite: new Sprite('img/door.png', [0, 0], [32, 32], 0, [0, 1])	
}

function update(dt) {
    handleInput(dt);
    updateEntities(dt);
	updateDoor(dt);
	//penguinMove(dt);
	//updatePenguins(dt);
    //checkCollisions();
	//isGameFinished();
}

function render() {
	build.draw(map);
	//for(var i = 0; i < penguins.length; i++)
	//	renderEntity(penguins[i]);
    renderEntity(player);
};

var prev = 0;

function handleInput(dt) {
	
	if (player.active) {
		if (player.dir == 'DOWN' && prev > player.pos[1]) {
			player.pos[1] += player.speed * dt;
		} else if (player.dir == 'UP' && prev < player.pos[1]) {
			player.pos[1] -= player.speed * dt;
		} else if (player.dir == 'LEFT' && prev < player.pos[0]) {
			player.pos[0] -= player.speed * dt;
		} else if (player.dir == 'RIGHT' && prev > player.pos[0]) {
			player.pos[0] += player.speed * dt;
		} else {
			switch (player.dir) {
				case 'RIGHT':
					player.pos[0] = prev;
					break;
				case 'LEFT':
					player.pos[0] = prev;
					break;
				case 'UP':
					player.pos[1] = prev;
					break;
				case 'DOWN':
					player.pos[1] = prev;
					break;
				
			}
			player.active = false;
		}
		return false;
	}
	
	if(input.isDown('SHIFT')){
		player.speed = 200;
		player.sprite.speed = 20;
	} else {
		player.speed = 100;
		player.sprite.speed = 5;
	}
	
    if(input.isDown('DOWN') || input.isDown('s')) {
		player.dir = 'DOWN';
		player.sprite.url = 'img/front.png';
		if (!checkPlayerBounds(player.posOnMap[0] + 1, player.posOnMap[1])) {
			player.active = true;
			prev = player.pos[1] + spriteSize;
			player.posOnMap = [player.posOnMap[0] + 1, player.posOnMap[1]];
		}
	} else if(input.isDown('UP') || input.isDown('w')) {
		player.dir = 'UP';
		player.sprite.url = 'img/back.png';
		if (!checkPlayerBounds(player.posOnMap[0] - 1, player.posOnMap[1])) {
			player.active = true;
			prev = player.pos[1] - spriteSize;
			player.posOnMap = [player.posOnMap[0] - 1, player.posOnMap[1]];
		}
    } else if(input.isDown('LEFT') || input.isDown('a')) {
		player.dir = 'LEFT';
		player.sprite.url = 'img/left.png';
		if (!checkPlayerBounds(player.posOnMap[0], player.posOnMap[1] - 1)) {
			player.active = true;
			prev = player.pos[0] - spriteSize;
			player.posOnMap = [player.posOnMap[0], player.posOnMap[1] - 1];
		}
    } else if(input.isDown('RIGHT') || input.isDown('d')) {
		player.dir = 'RIGHT';
		player.sprite.url = 'img/right.png';
		if (!checkPlayerBounds(player.posOnMap[0], player.posOnMap[1] + 1)) {
			player.active = true;
			prev = player.pos[0] + spriteSize;
			player.posOnMap = [player.posOnMap[0], player.posOnMap[1] + 1];
		}
    } else {
		player.active = false;
		player.sprite.speed = 0;
	}
}

var blocks = [B, P];
var obtains = [ , C];

function checkObjects(obj, collects) {
	for (var i = 0; i < collects.length; ++i) {
		if (obj == collects[i]) {
			return true;
		}
	}
	
	return false;
}

function checkPlayerBounds(i, j) {
	if (checkObjects(map[i][j], blocks))
		return true;
	return false;
}

function updateDoor(dt) {
	door.sprite.update(dt);
}

function updateEntities(dt) {
    player.sprite.update(dt);
}

function renderEntity(entity) {
    ctx.save();
    ctx.translate(entity.pos[0], entity.pos[1]);
    entity.sprite.render(ctx);
    ctx.restore();
}