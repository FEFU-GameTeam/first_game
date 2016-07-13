var spriteSize = 32;

var B = 'Block';
var C = 'Coin';
var S = 'Stone';
var E = 'Empty';
var P = 'Penguin';
var H = 'Heroy';


var mapping = (function() {
	
	var map_2 = {
		map : [
			,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,
			,  ,  , B,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,
			,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,
			,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,
			,  ,  ,  , B,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,
			,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,
			,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,
			,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,
			,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,
			,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,
			,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,
			,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,
		],
		
		size : {
			width : 20,
			height : 12,
		},
	};
	
	var map_0 = { 
		map : [
			,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,
			, B,  , B,  , B, B, B,  , B, S,  ,  , B,  ,  ,  , B, B, B,
			, B,  , B,  , B,  ,  ,  , B,  , S,  , B,  ,  ,  , B, E, B,
			, B, B, B,  , B, B, B,  , B,  ,  ,  , B,  ,  ,  ,  , E, B,
			, B,  , B,  , B,  ,  ,  , B,  ,  ,  , B,  ,  ,  , B, E, B,
			, B,  , B,  , B, B, B,  , B, B, B,  , B, B, B,  , B, B, B,
			,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,
			, B, B, B, B, B, B, B,  , B, B, B,  ,  ,  ,  ,  ,  ,  ,  ,
			, B,  , B,  , B,  , B,  , B, B, B,  , B,  , B,  ,  ,  ,  ,
			, B,  , B,  , B, B, B,  , B, B, B,  , B, B,  ,  ,  ,  ,  ,
			, B,  ,  ,  ,  ,  ,  ,  , B,  , B,  , B,  , B,  ,  ,  ,  ,
			, B,  , B,  ,  ,  , B,  , B, B, B,  , B,  , B,  , C,  ,  ,
		],
		
		size : {
			width : 20,
			height : 12,
		},
	};
	
	var map_1 = {
		map : [
			B, B, B, B, B, B, B, B, B, B, B, B, B, B, B, B, B, B, B, B,
			B,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  , B,
			B,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  , B,
			B,  ,  , B,  ,  , B,  ,  , E,  ,  ,  ,  ,  ,  ,  ,  ,  , B,
			B,  ,  , B, B,  , B,  ,  ,  ,  ,  ,  , C,  ,  ,  ,  ,  , B,
			B,  ,  , B,  ,  , B,  ,  ,  ,  ,  ,  ,  , P,  ,  , B, B, B,
			B,  ,  , B, B, B, B,  ,  ,  ,  ,  ,  , C, C,  ,  ,  ,  , B,
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
		
		door : {
			pos : [19, 6],
			size : [32, 32],
		},
		
		wizard : {
			pos : [1, 6],
		}
	};
	
	var map_3 = {
		map : [
			B, B, B, B, B, B, B, B, B, B, B, B, B, B, B, B, B, B, B, B,
			B,  ,  ,  ,  ,  , P,  ,  , B,  ,  ,  ,  ,  ,  ,  ,  , P, B,
			B,  ,  ,  ,  ,  , C,  ,  , B,  , C, C,  , C, C,  , P, C, B,
			B,C , B, B, B, B, B, B,  , B,  ,  ,  ,  ,  ,  ,  ,  ,  , B,
			B,  ,  ,  , B, C, B,  , P, B,  ,  ,  , C,  , C, P,  ,  , B,
			B,  ,  ,  ,  , C, B,  , C, B, C, C, P, P, P,  , C, B, B, B,
			B, B, B, B, B, B, B, C, C, B,  ,  , C, C, C,  ,  ,  ,  , B,
			B,  , H, B, P, C, B,  ,  , B,  ,  ,  ,  ,  , P, B, B, B, B,
			B,  , B, B,  , C, B, C,  , B, C,  ,  , C,  , C, C,  , C, B,
			B,  ,  , B, C,  , B,  ,  , B, B, B, B, B, B, P,  ,  ,  , B,
			B,  ,  ,  ,  ,  , B, P,  , B, P, C, C, P, B,  ,  ,  ,  , B,
			B,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  , B,
			B, B, B, B, B, B, B, B, B, B, B, B, B, B, B, B, B, B, B, B,
		],
		
		size : {
			width : 20,
			height : 13,
		},
		
		door : {
			pos : [19, 6],
			size : [32, 32],
		},
		
		wizard : {
			pos : [1, 6],
		}
	};
	
	var maps = [map_0, map_1, map_2, map_3], num = 0, door, level;
	
	return {
		
		setMap: function(data, num) {
			this.num = num;
			var level = maps[num];
			door = level.door;
			for (var i = 0; i < level.size.height; i++) {
				data[i] = [];
				for (var j = 0; j < level.size.width; j++) {
					var index = level.size.width * i + j; 
					data[i][j] = level.map[index];
				}
			}
		},
		
		getDoor: function() {
			return door;
		},
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
						case S:
							//ctx.fillStyle = '#000000';
							//ctx.fillRect(x, y, x + spriteSize, y + spriteSize);
							break;
						case E:
							ground.pos = [x, y];
							renderEntity(ground);
							break;
						case H:
							player.pos = [x, y];
							renderEntity(player);
							break;
						case C:
							coin.pos = [x, y];
							renderEntity(coin);
							break;
						default:
							grass.pos = [x, y];
							renderEntity(grass);
							//ctx.fillStyle = '#1F6F15';
							//ctx.fillRect(x, y, x + spriteSize, y + spriteSize);
							break;
					}						
				}
			}
		}
	}
	
})();
