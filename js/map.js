var spriteSize = 32;

var B = 'Block';
var C = 'Coin';
var D = 'Door';
var E = 'Empty';
var P = 'Penguin';
var W = 'Wizard';

var S = 'Stone';

var mapping = (function() {
	
	var map_0 = {
		
		map : [
			B, B, B, B, B, B, B, B, B, B, B, B, B, B, B, B, B, B, B, B,
			B,  ,  ,  ,  ,  , P,  ,  , B,  ,  ,  ,  ,  ,  ,  ,  , P, B,
			B,  ,  ,  ,  ,  , C,  ,  , B,  , C, C,  , C, C,  , P, C, B,
			B,C , B, B, B, B, B, B,  , B,  ,  ,  ,  ,  ,  ,  ,  ,  , B,
			B,  ,  ,  , B, C, B,  , P, B,  ,  ,  , C,  , C, P,  ,  , B,
			B,  ,  ,  ,  , C, B,  , C, B, C, C, P, P, P,  , C, B, B, B,
			B, B, B, B, B, B, B, C, C, B,  ,  , C, C, C,  ,  ,  ,  , D,
			B,  , W, B, P, C, B,  ,  , B,  ,  ,  ,  ,  , P, B, B, B, B,
			B,  , B, B,  , C, B, C,  , B, C,  ,  , C,  , C, C,  , C, B,
			B,  ,  , B, C,  , B,  ,  , B, B, B, B, B, B, P,  ,  ,  , B,
			B,  ,  ,  ,  ,  , B, P,  , B, P, C, C, P, B,  ,  ,  ,  , B,
			B,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  , E, E, B,
			B, B, B, B, B, B, B, B, B, B, B, B, B, B, B, B, B, B, B, B,
		],
		
		size : {
			width : 20,
			height : 13,
		},
		
		coins : 31,
		
	};
	
	var map_1 = {
		
		map : [
			B, B, B, B, B, B, B, B, B, B, B, B, B, B, B, B, B, B, B, B,
			B,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  , B,
			B,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  , B,
			B,  ,  , B,  ,  , B,  ,  , E,  ,  ,  ,  ,  ,  ,  ,  ,  , B,
			B, W,  , B, B,  , B,  ,  ,  ,  ,  ,  , C,  ,  ,  ,  ,  , B,
			B,  ,  , B,  ,  , B,  ,  ,  ,  ,  ,  ,  , P,  ,  , B, B, B,
			B,  ,  , B, B, B, B,  ,  ,  ,  ,  ,  , C, C,  ,  ,  ,  , D,
			B,  ,  , B,  ,  , B,  ,  ,  ,  ,  ,  ,  ,  ,  ,  , B, B, B,
			B,  ,  , B,  ,  , B,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  , B,
			B,  ,  , B,  ,  , B,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  , B,
			B,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  , B,
			B,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  , B,
			B, B, B, B, B, B, B, B, B, B, B, B, B, B, B, B, B, B, B, B,
		],
		
		size : {
			width : 20,
			height : 13,
		},
		
		coins : 3,
		
	};
	
	var map_2 = { 
	
		map : [
			B, B, B, B, B, B, B, B, B, B, B, B, B, B, B, B, B, B, B, B,
			B, B,  , B,  , B, B, B,  , B, P,  ,  , B, W,  ,  , B, B, B,
			B, B,  , B,  , B,  ,  ,  , B,  , P,  , B,  ,  ,  , B, E, B,
			B, B, B, B,  , B, B, B,  , B,  ,  ,  , B,  ,  ,  ,  , E, B,
			B, B,  , B,  , B,  ,  ,  , B,  ,  ,  , B,  ,  ,  , B, E, B,
			B, B,  , B,  , B, B, B,  , B, B, B,  , B, B, B,  , B, B, B,
			B, D,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  , B,
			B, B, B, B, B, B, B, B,  , B, B, B,  ,  ,  ,  ,  ,  ,  , B,
			B, B,  , B,  , B,  , B,  , B, B, B,  , B,  , B,  ,  ,  , B,
			B, B,  , B,  , B, B, B,  , B, B, B,  , B, B,  ,  ,  ,  , B,
			B, B,  ,  ,  ,  ,  ,  ,  , B,  , B,  , B,  , B,  , C,  , B,
			B, B, B, B, B, B, B, B, B, B, B, B, B, B, B, B, B, B, B, B,
		],
		
		size : {
			width : 20,
			height : 12,
		},
		
		coins : 1,
		
	};
	
	
	var map_3 = {
		
		map : [
			B, B, B, B, B, B, B, B, B, B, B, B, B, B, B, B, B, B, B, B,
			B,  ,  , B,  ,  ,  ,  ,  , P, P,  ,  ,  ,  ,  ,  ,  ,  , B,
			B,  ,  ,  ,  ,  ,  ,  ,  , C, C,  ,  ,  ,  ,  ,  ,  ,  , B,
			B,  ,  ,  ,  ,  ,  ,  ,  , B, B,  ,  ,  ,  ,  ,  ,  ,  , B,
			B, D,  ,  , B,  ,  ,  ,  , B, C,  ,  ,  ,  ,  ,  ,  ,  , B,
			B,  ,  ,  ,  ,  ,  ,  ,  , B, B,  , W,  ,  ,  ,  ,  ,  , B,
			B,  ,  ,  ,  ,  ,  ,  ,  , B, C,  ,  ,  ,  ,  ,  ,  ,  , B,
			B,  ,  ,  ,  ,  ,  ,  ,  , C, B,  ,  ,  ,  ,  ,  ,  ,  , B,
			B,  ,  ,  ,  ,  ,  ,  ,  , B, C,  ,  ,  ,  ,  ,  ,  ,  , B,
			B,  ,  ,  ,  ,  ,  ,  ,  , C, B,  ,  ,  ,  ,  ,  ,  ,  , B,
			B,  ,  ,  ,  ,  ,  ,  ,  , B, C,  ,  ,  ,  ,  ,  ,  ,  , B,
			B, B, B, B, B, B, B, B, B, B, B, B, B, B, B, B, B, B, B, B,
		],
		
		size : {
			width : 20,
			height : 12,
		},
		
		coins : 8,
		
	};

	var map_4 = {

		map : [
			B, B, B, B, B, B, B, B, B, B, B, B, B, B, B, B, B, B, B, B,
			B, P, P, P, P, P, P, P, P, B,  ,  ,  ,  ,  ,  ,  ,  , P, B,
			B,  ,  ,  ,  ,  , C,  ,  , B,  , C, C,  , C, C,  , P, C, B,
			B,  , B, B, B, B, B, B,  , B,  ,  ,  ,  ,  ,  ,  ,  ,  , B,
			B,  ,  ,  , B, C, C,  , C, B,  ,  ,  , C,  , C, P,  ,  , B,
			B,  ,  ,  ,  , C, C,  , P, B, C, C, P, P, P,  , C, B, C, B,
			B,  , B, B, B, B, B, C, C, B,  ,  , C, C, C,  ,  , B, C, D,
			B,  , W, B, P, C, B,  ,  , B,  ,  ,  ,  ,  , P, B, B, B, B,
			B,  , B, B,  , C, B, C,  , B, C,  ,  , C,  , C, C,  , C, B,
			B,  ,  , B, C, P, B,  ,  , B, B, B, B, B, B, P,  ,  ,  , B,
			B,  ,  , B,  ,  , B, P,  , B, P, C, C, P, B,  ,  ,  ,  , B,
			B,  ,  ,  ,  ,  , B,  ,  ,  ,  ,  ,  ,  ,  ,  ,  , E, E, B,
			B, B, B, B, B, B, B, B, B, B, B, B, B, B, B, B, B, B, B, B,
		],

		size : {
			width : 20,
			height : 13,
		},

		coins : 34

	};


	var map_5= {

		map : [
			B, B, B, B, B, B, B, B, B, B, B, B, B, B, B, B, B, B, B, B,
			B, P, P, P, P, P, P, P, P, P, P, P, P, P, P, P, P, P, P, B,
			B, P, P, P, P, P, P, P, P, P, P, P, P, P, P, P, P, P, P, B,
			B, P, P, P, P, P, P, P, P, P, P, P, P, P, P, P, P, P, P, B,
			B, P, P, P, P, P, P, P, P, P, P, P, P, P, P, P, P, P, P, B,
			B, P, P, P, P, P, P, P, P, P, P, P, P, P, P, P, P, P, P, B,
			B, P, P, P, P, P, P, P, P, P, P, P, P, P, P, P, P, P, P, B,
			B, P, P, P, P, P, P, P, P, P, P, P, P, P, P, P, P, P, P, B,
			B, P, B, P, P, P, P, P, P, P, P, P, P, P, P, P, P, P, B, B,
			B, D, C, C, C, C, C, C, C, C, C, C, C, C, C, C, C, C, W, B,
			B, B, B, B, B, B, B, B, B, B, B, B, B, B, B, B, B, B, B, B,
		],

		size : {
			width : 20,
			height : 11,
		},

		coins : 16,

	};
	
	var maps = [map_0, map_1, map_2, map_3, map_4, map_5], levelNumber = 0;
	
	return {
		
		setMap: function(data, levelNumber) {
			this.levelNumber = levelNumber;
			var level = maps[levelNumber], wizard;
			for (var i = 0; i < level.size.height; i++) {
				data[i] = [];
				for (var j = 0; j < level.size.width; j++) {
					var index = level.size.width * i + j; 
					data[i][j] = level.map[index];
					if (level.map[index] == W)
						wizard = [i, j];
					if (level.map[index] == P)
						buildPenguin(j, i);
					if (level.map[index] == C)
						buildCoin(j, i);
				}
			}
			return wizard;
		},
		
		getCoins: function(levelNumber) {
			return maps[levelNumber].coins;
		}
		
	}
	
})();

var build = (function() {
	
	return {
		draw: function(data) {
			for (var i = 0; i < data.length; ++i) {
				for (var j = 0; j < data[i].length; ++j) {
					var y = i * spriteSize, x = j * spriteSize;
					
					switch (data[i][j]) {
						case B:
							block.pos = [x, y];
							renderEntity(block);
							break;
						case C:
							ground.pos = [x, y];
							renderEntity(ground);
							break;
						case S:
							break;
						case E:
							ground.pos = [x, y];
							renderEntity(ground);
							break;
						case W:
							ground.pos = [x, y];
							renderEntity(ground);
							break;
						case P:
							ground.pos = [x, y];
							renderEntity(ground);
							break;
						case D:
							door.pos = [x, y];
							renderEntity(door);
							break;
						default:
							grass.pos = [x, y];
							renderEntity(grass);
							break;
					}						
				}
			}
		}
	}
	
})();

var GetMapsNumber = (function() {
	return 6;
})();