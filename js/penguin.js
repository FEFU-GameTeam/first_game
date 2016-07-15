function buildPenguin(x, y){
	var penguin = {
		pos: [x * spriteSize, y * spriteSize],
		posOnMap: [x, y],
		active : false,
		inflated: false,
		inflatedActive: false,
		prevPos: 0,
		sprite: new Sprite('img/penguin1.png', [0, 0], [31.5, 32], 0, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10])	
	};
	penguins.push(penguin);
};


function renderPenguins() {
	for(var i = 0; i < penguins.length; i++){
		var x = penguins[i].posOnMap[0];
		var y = penguins[i].posOnMap[1];
		if (map[y][x] == P){
			renderEntity(penguins[i]);
		}
	}
}

function updatePenguins(dt){
	for(var i = 0; i < penguins.length; i++)
		penguins[i].sprite.update(dt);
}

function checkCrossPenguin(dt) {
	for(var i = 0; i < penguins.length; i++){
		var x = penguins[i].posOnMap[0];
		var y = penguins[i].posOnMap[1];
		
		if(penguinsCheck(penguins[i], dt)){
			if(map[y + 1][x] == W){
				if (penguins[i].inflated){
					isGameGoing = false;
					var dialog = document.getElementById('end_game_dialog');
					dialog.style.backgroundImage = 'url(img/game_over.png)'
					dialog.show();
				};
			}
		} else continue;
		
		if ((map[y + 1][x] == E) || (map[y + 1][x] == W)){
			if(penguins[i].inflated){
				penguins[i].active = true;
				penguins[i].prevPos = penguins[i].pos[1] + spriteSize;
				map[y][x] = E;
				map[y + 1][x] = P;
				penguins[i].posOnMap = [x, y + 1];
			} else {
				penguins[i].sprite.url = 'img/penguin1.png';
				penguins[i].sprite.speed = 10;
				penguins[i].inflatedActive = true;
				if(penguins[i].sprite.indexFrame === 10){
					penguins[i].sprite.url = 'img/penguin2.png';
					penguins[i].sprite.speed = 60;
					penguins[i].sprite.frames = [0, 1, 2, 3, 4, 5, 6];
					penguins[i].inflatedActive = false;
					penguins[i].inflated = true;
				}
			};
		} else if (penguins[i].inflated) {
			penguins[i].sprite.url = 'img/penguin3.png';
			penguins[i].sprite.frames = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
			penguins[i].sprite.speed = 10;
			if(penguins[i].sprite.indexFrame == 10){
				penguins[i].inflated = false;
				penguins[i].sprite.url = 'img/penguin1.png';
				penguins[i].sprite.frames = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
				penguins[i].sprite.speed = 0; 
				penguins[i].sprite = new Sprite('img/penguin1.png', [0, 0], [32, 32], 0, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
			}
		}
	}
}

function penguinsCheck(penguin, dt){

	if (penguin.active) {
		if (penguin.prevPos > penguin.pos[1]) {
			penguin.pos[1] += penguinSpeed * dt;
		} else {
			penguin.pos[1] = penguin.prevPos;
			penguin.active = false;
		}
		return false;
	}
	return true;
}