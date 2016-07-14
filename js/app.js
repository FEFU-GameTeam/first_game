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

var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
canvas.width = 640;
canvas.height = 416;
document.body.appendChild(canvas);

var isGameGoing = false;

function beginning() {
	var dialog = document.getElementById('start_game_dialog');
	var select = document.getElementById('map_selection');
	document.getElementById('show').onclick = function() {
		dialog.show();
	};
	
	document.getElementById('start').onclick = function() {
		isGameGoing = true;
		start();
		dialog.close();
	};
	for (var i = 0; i < 4; ++i){
		var option = document.createElement('option');
		option.text = 'map ' + (i + 1);
		option.value = Number(i);
		select.add(option);
	};
	document.getElementById('start_again').onclick = function() {
		document.getElementById('end_game_dialog').close();
		dialog.show();
	};

};

function start(){
	inputkey();
	window.map = [];
	window.coinsCount = 0;
	window.lastTime = 0;
		
	window.player = {
		pos: [0, 0],
		posOnMap: [0, 0],
		speed : 100,
		active : false,
		dir: '',
		prev: 0,
		sprite: new Sprite('img/front.png', [0, 0], [18, 32], 0, [0, 1, 2, 3])
	};

	window.grass = {
		pos: [0, 0],
		sprite: new Sprite('img/grass3.png', [0, 0], [32, 32], 0, 0)	
	}

	window.ground = {
		pos: [0, 0],
		sprite: new Sprite('img/ground.png', [0, 0], [32, 32], 0, 0)	
	}


	window.block = {
		pos: [0, 0],
		sprite: new Sprite('img/block.png', [0, 0], [32, 32], 0, 0)	
	}

	window.coin = {
		pos: [0, 0],
		sprite: new Sprite('img/coin.png', [0, 0], [32, 32], 0, 0)	
	}

	window.door = {
		pos: [0, 0],
		isOpen: false,
		sprite: new Sprite('img/door.png', [0, 0], [32, 32], 0, [0, 1])	
	}
	
	window.penguins = [];
	window.penguinSpeed = 100;
	window.coins = [];
	window.coinSpeed = 80;
	init();
};

function main() {
    var now = Date.now();
    var dt = (now - lastTime) / 1000.0;
    update(dt);
    render();

    lastTime = now;
	if (isGameGoing)
    	requestAnimFrame(main);
};

function init() {
	var select = document.getElementById('map_selection');
	var levelNumber = Number(select.options[select.selectedIndex].value); // выбор карты из комбобокса
	player.posOnMap = mapping.setMap(map, levelNumber);
	player.pos = [player.posOnMap[1] * spriteSize, player.posOnMap[0] * spriteSize];
	coinsCount = mapping.getCoins(levelNumber);
    lastTime = Date.now();
    main();
};

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
resources.onReady(beginning);

function update(dt) {
    handleInput(dt);
    updateEntities(dt);
	checkCrossPenguin(dt);
	coinsFall(dt);
}

function render() {
	build.draw(map);
	renderCoins();
    renderEntity(player);
	renderPenguins();
};

function isGameFinished() {

	var dialog = document.getElementById('start_game_dialog');
	dialog.show();
	isGameGoing = false;
	if (map[player.posOnMap[0]][player.posOnMap[1]] == D)
		alert('You Won');
	
}

function handleInput(dt) {
	
	if (player.active) {
		if (player.dir == 'DOWN' && player.prev > player.pos[1]) {
			player.pos[1] += player.speed * dt;
		} else if (player.dir == 'UP' && player.prev < player.pos[1]) {
			player.pos[1] -= player.speed * dt;
		} else if (player.dir == 'LEFT' && player.prev < player.pos[0]) {
			player.pos[0] -= player.speed * dt;
		} else if (player.dir == 'RIGHT' && player.prev > player.pos[0]) {
			player.pos[0] += player.speed * dt;
		} else {
			switch (player.dir) {
				case 'RIGHT':
					player.pos[0] = player.prev;
					break;
				case 'LEFT':
					player.pos[0] = player.prev;
					break;
				case 'UP':
					player.pos[1] = player.prev;
					break;
				case 'DOWN':
					player.pos[1] = player.prev;
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
	var i = player.posOnMap[0], j = player.posOnMap[1];
    if(input.isDown('DOWN') || input.isDown('s')) {
		player.dir = 'DOWN';
		player.sprite.url = 'img/front.png';
		if (!checkPlayerBounds(i + 1,  j)) {
			checkCoins(i + 1,  j);
			player.active = true;
			player.prev = player.pos[1] + spriteSize;
			map[i][j] = E;
			map[i + 1][j] = W;
			player.posOnMap = [i + 1, j];
		}
	} else if(input.isDown('UP') || input.isDown('w')) {
		player.dir = 'UP';
		player.sprite.url = 'img/back.png';
		if (!checkPlayerBounds(i - 1,  j)) {
			checkCoins(i - 1, j);
			player.active = true;
			player.prev = player.pos[1] - spriteSize;
			map[i][j] = E;
			map[i - 1][j] = W;
			player.posOnMap = [i - 1, j];
		}
    } else if(input.isDown('LEFT') || input.isDown('a')) {
		player.dir = 'LEFT';
		player.sprite.url = 'img/left.png';
		if (!checkPlayerBounds(i, j - 1)) {
			checkCoins(i, j - 1);
			player.active = true;
			player.prev = player.pos[0] - spriteSize;
			map[i][j] = E;
			map[i][j - 1] = W;
			player.posOnMap = [i, j - 1];
		}
    } else if(input.isDown('RIGHT') || input.isDown('d')) {
		player.dir = 'RIGHT';
		player.sprite.url = 'img/right.png';
		if (!checkPlayerBounds(i,  j + 1)) {
			checkCoins(i, j + 1);
			player.active = true;
			player.prev = player.pos[0] + spriteSize;
			map[i][j] = E;
			map[i][j + 1] = W;
			player.posOnMap = [i, j + 1];
		}
    } else {
		player.active = false;
		player.sprite.speed = 0;
	}
}

var blocks = [B, P, D];
var obtains = [C];

function checkObjects(obj, collects) {
	for (var i = 0; i < collects.length; ++i) {
		if (obj == collects[i]) {
			if (blocks[i] == D && door.isOpen && isGameGoing) {
				isGameGoing = false;
				var dialog = document.getElementById('end_game_dialog');
				dialog.style.backgroundImage = 'url(img/game_win.png)'
				dialog.show();
			}
			return true;
		}
	}
	
	return false;
}

function checkPlayerBounds(i, j) {
	return checkObjects(map[i][j], blocks);
}

function checkCoins(i, j) {
	
	if (checkObjects(map[i][j], obtains)) {
		for (var k = 0; k < coins.length; ++k) {
			if (coins[k].posOnMap[0] == j && coins[k].posOnMap[1] == i) {
				coins[k] = coins[coins.length - 1]; 
				coins.pop();
				break;
			}
		}
		coinsCount--;
	}
	
	if (coinsCount == 0)
		openDoor();
	
}

function openDoor() {
	
	door.sprite.speed = 5;
	door.isOpen = true;
	
	coinsCount = -1; 
	
}

function updateEntities(dt) {
    player.sprite.update(dt);
	door.sprite.update(dt);
	updatePenguins(dt);
}

function renderEntity(entity) {
    ctx.save();
    ctx.translate(entity.pos[0], entity.pos[1]);
    entity.sprite.render(ctx);
    ctx.restore();
}