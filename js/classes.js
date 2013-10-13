/* CONTAINS ALL CLASS DEFINITIONS NEEDED FOR THE GAME*/

//initialize a regular hexagon with all additional parameters and methods
function initHexTile(realX,realY,hexRadius,strokeColor,logicalX,logicalY, wall){
	var hexagon = new Kinetic.RegularPolygon({
                x: realX,
                y: realY,
                sides: 6,
                radius: hexRadius,
                stroke: strokeColor,
                strokeWidth: 1,
				name: 'hex'
            });
	 hexagon.setId(logicalX+ "," +logicalY);
	 hexagon.logX = logicalX;
	 hexagon.logY = logicalY;
	 
	 
	 hexagon.getH = function(x,y){
	 };
	 hexagon.getG = function(){
	 };
	 hexagon.getF = function(x,y){
	 };
	 
	 hexagon.parent = "";
	 hexagon.wall = wall;
	 hexagon.G = 10;
	 
	 return hexagon; 
}

// define action points bar class
function APBar (xS, yS, ap){
	this.background = new Kinetic.Rect({
					x: xS+40,
					y: yS-15,
					name: "APbar",
					width: 25,
					height: 25,
					fill: 'gainsboro',
					stroke: 'grey',
					strokeWidth: 1,
					visible: true
				});
	this.text = new Kinetic.Text({
					x: xS+48,
					y: yS-12,
					text: '' + ap,
					fontSize: 18,
					fontFamily: 'Calibri',
					fill: 'red',
					visible: true
				});


	this.initBar = function(layer){
		layer.add(this.background);
		layer.add(this.text);
	};

	this.hideBar = function(){
		this.background.hide();
		this.text.hide();
	};

	this.showBar = function(x,y,ap){
		this.background.setX(x+40);
		this.background.setY(y-20);
		this.text.setX(x+48);
		this.text.setY(y-17);
		this.text.setText(''+ap);
		this.background.show();
		this.text.show();
	};
    this.remove = function() {
          this.background.remove();
          this.text.remove();
    };
}

//define army class
function Army (color, income, gold){
	this.color = color;
	this.income = income;
	this.gold = gold;
}

//define a sprite with all additional parameters and methods (TO BE IMPLEMENTED)