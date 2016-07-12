var B = 'Block';
var C = 'Coin';
var S = 'Stone';
var E = 'Empty';

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
			B,  ,  , B,  ,  , B,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  , B,
			B,  ,  , B, B, B, B,  ,  ,  ,  ,  ,  , C, C,  ,  ,  ,  , B,
			B,  ,  , B,  ,  , B,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  , B,
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
		
		wizard : {
			x : 1,
			y : 1
		}
	};
	
	var maps = [map_0, map_1, map_2], num = 0;
	
	return {
		setMap: function(data, num) {
			this.num = num;
			var level = maps[num];
			for (var i = 0; i < level.size.height; i++) {
				data[i] = [];
				for (var j = 0; j < level.size.width; j++) {
					var index = level.size.width * i + j; 
					data[i][j] = level.map[index];
				}
			}
		}
	}
	
})();  

var build = (function() {
	
	var spriteSize = 32, spriteSizeH = 32, spriteSizeW = 32;
	
	return {
		draw: function(data) {
			for (var i = 0; i < data.length; ++i) {
				for (var j = 0; j < data[i].length; ++j) {
					var y = i * spriteSize, x = j * spriteSize;
					switch (data[i][j]) {
						case B:
							block.pos = [x, y];
							blocks.push(block.pos);
							renderEntity(block);
							break;
						case C:
							coin.pos = [x, y];
							coins.push(coin.pos);
							renderEntity(coin);
							break;
						case S:
							//ctx.fillStyle = '#000000';
							//ctx.fillRect(x, y, x + spriteSize, y + spriteSize);
							break;
						case E:
							ground.pos = [x, y];
							renderEntity(ground);
							break;
						default:
							grass.pos = [x, y];
							grasses.push(grass.pos);
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
