function buildCoin(x, y){
	var coin = {
		pos: [x * spriteSize, y * spriteSize],
		posOnMap: [x, y],
		prevPos: 0,
		active: false,
		sprite: new Sprite('img/coin.png', [0, 0], [32, 32], 0, 0)	
	}
	coins.push(coin);
};

function renderCoins() {
	for(var i = 0; i < coins.length; i++) {
		var x = coins[i].posOnMap[0];
		var y = coins[i].posOnMap[1];
		if (map[y][x] == C)
			renderEntity(coins[i]);
	}
}

function updateCoins(dt){
	for(var i = 0; i < coins.length; i++)
		coins[i].sprite.update(dt);
}

function coinsFall(dt) {
	for(var i = 0; i < coins.length; i++) {
		var x = coins[i].posOnMap[0];
		var y = coins[i].posOnMap[1];
		
		if (coins[i].active) {
			if(map[y + 1][x] == W){
				if(player.health > 1){
					player.health -= 1;
					checkCoins(y,  x);
					map[y][x] = E;
					console.log(player.health);
					continue;
				}
				else{
					isGameGoing = false;
					var dialog = document.getElementById('end_game_dialog');
					dialog.style.backgroundImage = 'url(img/game_over.png)'
					dialog.show();
				}
			}
			
			if (coins[i].prevPos > coins[i].pos[1]) {
				coins[i].pos[1] += coinSpeed * dt;
			} else {
				coins[i].pos[1] = coins[i].prevPos;
				coins[i].active = false;
			}
			continue;
		}
		
		if ((map[y + 1][x] == E)) {
			coins[i].active = true;
			coins[i].prevPos = coins[i].pos[1] + spriteSize;
			map[y][x] = E;
			map[y + 1][x] = C;
			coins[i].posOnMap = [x, y + 1];			
		}
	}
}

function checkCoinInMove(coin, dt) {
	if (coin.active) {
		if (coin.prevPos > coin.pos[1]) {
			coin.pos[1] += coinSpeed * dt;
		} else {
			coin.pos[1] = coin.prevPos;
			coin.active = false;
		}
		return false;
	}
	return true;
}