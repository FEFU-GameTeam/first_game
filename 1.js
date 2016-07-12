function game15(SizeFifteen) {
	var arr = [];
	for (let i = 0; i < SizeFifteen; i++)
		arr[i] = [];
	
	var k = 0;
	for (let i = 0; i < SizeFifteen; i++)
		for(let j = 0; j < SizeFifteen; j++)
			arr[i][j] = ++k;
	arr[SizeFifteen - 1][SizeFifteen - 1] = 0;
	var clicks = 0;
	
	function getNull() {
		for (var i = 0; i < SizeFifteen; i++) {
			for (var j = 0; j < SizeFifteen; j++) {
				if (arr[j][i] == 0) {
					return{"x":i,"y":j};
				}
			}
		}
	};

	function checkShuffle(a){
		
		var inv = 0;
		for (let i=0; i < SizeFifteen*SizeFifteen; ++i)
			if (a[i]){
				for (let j=0; j<i; ++j)
					if (a[j] > a[i])
						++inv;
			} else
				if ((SizeFifteen % 2) === 0)
					inv += 1 + Math.floor(i / SizeFifteen);
	
			return ((inv % 2) === 0);			
	};

	this.getClicks = function() {
		return clicks;
	};
 
	this.move = function(x, y) {
		var nullX = getNull().x;
		var nullY = getNull().y;
		if (((x - 1 == nullX || x + 1 == nullX) && y == nullY) ||
			((y - 1 == nullY || y + 1 == nullY) && x == nullX)) {
			arr[nullY][nullX] = arr[y][x];
			arr[y][x] = 0;
			clicks++;
		}
	};
  
	this.win = function() {
		var a = [];
		for (let i = 0; i < SizeFifteen; i++)
			a[i] = [];
	
		var k = 0;
		for (let i = 0; i < SizeFifteen; i++)
			for(let j = 0; j < SizeFifteen; j++)
				a[i][j] = ++k;
		a[SizeFifteen - 1][SizeFifteen - 1] = 0;
		
		var res = true;
		for (var i = 0; i < SizeFifteen; i++) {
			for (var j = 0; j < SizeFifteen; j++) {
				if (a[i][j] != arr[i][j]) {
					res = false;
				}
			}
		}
		return res;
	};

	this.shuffle = function() {
		var temp = [];
		for (var i = 0; i < SizeFifteen*SizeFifteen; i++)
			temp[i] = i + 1;
		temp[SizeFifteen*SizeFifteen - 1] = 0;
		do{
			for (var i = temp.length - 1; i > 0; i--) {
				var num = Math.floor(Math.random() * (i + 1));
				var t = temp[num];
				temp[num] = temp[i];
				temp[i] = t;
			}
		} while(!checkShuffle(temp));
		
		var k = -1;
		for (var i = 0; i < SizeFifteen; i++)
			for (var j = 0; j < SizeFifteen; j++)
				arr[i][j] = temp[++k];
		clicks = 0;
	};

	this.draw = function(context, size) {
		context.fillRect(0, 0, 300, 300);
		for (var i = 0; i < SizeFifteen; i++) {
			for (var j = 0; j < SizeFifteen; j++) {
				if (arr[i][j] > 0) {
					context.fillStyle = "#00FF00";
					context.fillRect((j*size)+1, (i*size)+1, size-2, size-2);
					context.font = "bold "+(size/2)+"px Comic Sans ";
					context.textAlign = "center";
					context.textBaseline = "middle";
					context.fillStyle = "#000";
					context.fillText(arr[i][j], j * size + size / 2, i * size + size / 2);
				}
			}
		}
	};
}

var start = false;
function init() {
	var SizeFifteen = document.getElementById('SizeFifteen').value;
	alert(SizeFifteen);
	var steps = document.getElementById('steps');
	steps.innerHTML = "Steps: 0";

	var canvas = document.getElementById("fifteen");
	    canvas.width  = 300;
	    canvas.height = 300;
	var cellSize = canvas.width / SizeFifteen;
	var context = canvas.getContext("2d");
	var field = new game15(SizeFifteen);
	field.shuffle();
	field.draw(context, cellSize);		
	function event(x, y) {
		field.move(x, y);
		field.draw(context, cellSize);
		if (field.win()) {
			alert("Победа в " + field.getClicks() + " касание!");
			field.shuffle();
			field.draw(context, cellSize);
		}
		//var steps = document.getElementById('steps');
		steps.innerHTML = "Steps: " + field.getClicks();
	}
	
	canvas.onclick = function(pos) {
		var x = Math.floor((pos.pageX - canvas.offsetLeft) / cellSize);
		var y = Math.floor((pos.pageY - canvas.offsetTop) / cellSize);
		event(x, y);
	};
}
