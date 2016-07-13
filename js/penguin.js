var penguins = [];
var penguinSpeed = 100;

function buildPenguin(x, y){
	var penguin = {
		pos: [x, y],
		inflated: false,
		sprite: new Sprite('img/penguin1.png', [0, 0], [32, 32], 0, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10])	
	}
	penguins.push(penguin);
}

function updatePenguins(dt){
	for(var i = 0; i < penguins.length; i++)
		penguins[i].sprite.update(dt);
}


function checkCrossPenguin() {
		var size2 = [20, player.sprite.size[1] - 30];
		var pos2 = [player.pos[0] + 2, player.pos[1] + 28];
	for(var i = 0; i < penguins.length; i++){
		var pos = [penguins[i].pos[0], penguins[i].pos[1] + 4];
		var size = penguins[i].sprite.size;
		
        if(boxCollides(pos, size, pos2, size2)) {
			if(penguins[i].inflated){
				var posP = [penguins[i].pos[0] + 2, penguins[i].pos[1] + 30];
				var sizeP = [penguins[i].sprite.size[1] - 28, penguins[i].sprite.size[0] - 2]
				if(boxCollides(posP, sizeP, pos2, size2))
					alert('Game Over');
			}
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

function penguinMove(dt){
	for(var i = 0; i < penguins.length; i++){
	var pos = penguins[i].pos;
	var size = penguins[i].sprite.size;
	var x = Math.floor((pos[0] + 16) / 32);
	var y = Math.floor((pos[1] + 32) / 32);
	if(map[y][x] == E){
		if(penguins[i].inflated)
			pos[1] += penguinSpeed * dt;
		else {
			penguins[i].sprite.url = 'img/penguin1.png';
			penguins[i].sprite.speed = 10;
			if(penguins[i].sprite.indexFrame === 10){
				penguins[i].sprite.url = 'img/penguin2.png';
				penguins[i].sprite.frames = [0, 1, 2, 3, 4, 5, 6];
				penguins[i].inflated = true;
			}
		};
	} else {
		if(penguins[i].inflated){
			penguins[i].sprite.url = 'img/penguin3.png';
			penguins[i].sprite.frames = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
			if(penguins[i].sprite.indexFrame == 10){
				penguins[i].inflated = false;
				penguins[i].sprite.url = 'img/penguin1.png';
				penguins[i].sprite.frames = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
				penguins[i].sprite.speed = 0; 
				penguins[i].sprite = new Sprite('img/penguin1.png', [0, 0], [32, 32], 0, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
			}
		}			
	}
	};	
}

