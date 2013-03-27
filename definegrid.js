var animations = {
		idle: [{
			x: 0,
			y: 0,
			width: 50,
			height: 50
         }] ,
        move_right: [{
            x: 0,
            y: 0,
            width: 50,
            height: 50
            }, {
            x: 50,
            y: 0,
            width: 50,
            height: 50
        }, {
            x: 100,
            y: 0,
			width: 50,
            height: 50
        },
        {
            x: 150,
            y: 0,
            width: 50,
            height: 50
        },
        {
            x: 200,
            y: 0,
            width: 50,
            height: 50
        },
        {
            x: 250,
            y: 0,
            width: 50,
            height: 50
        },{
            x: 300,
            y: 0,
            width: 50,
            height: 50
        },
        {
            x: 350,
            y: 0,
            width: 50,
            height: 50
        }] ,
        move_left: [{
            x: 0,
            y: 50,
            width: 50,
            height: 50
        }, {
            x: 50,
            y: 50,
            width: 50,
            height: 50
        }, {
            x: 100,
            y: 50,
            width: 50,
            height: 50
        },
        {
            x: 150,
            y: 50,
            width: 50,
            height: 50
        },
        {
            x: 200,
            y: 50,
            width: 50,
            height: 50
        },
        {
            x: 250,
            y: 50,
            width: 50,
            height: 50
        },{
            x: 300,
            y: 50,
            width: 50,
            height: 50
        },
        {
            x: 350,
            y: 50,
            width: 50,
            height: 50
        }]
    };

var imageObj = new Image();
imageObj.src = 'soldier.png';
		
var stage = new Kinetic.Stage({
    container: 'container',
    width: 800,
    height: 800
});


var circle = new Kinetic.Circle({
	name: 'circ',
    x: 750,
    y: stage.getHeight() / 2,
    radius: 40,
    fill: 'red',
    stroke: 'black',
    strokeWidth: 4	
});

var boardLayer = new Kinetic.Layer();
createBoardLayer();
var current_soldier;


boardLayer.on("mouseover", function (e) {
    var shape = e.shape;
	if(shape.getName() == "hex"){
		shape.setFill("#E0EBEB");
		boardLayer.add(shape);
		shape.moveToBottom();
		stage.add(boardLayer);
		
	}    
});

boardLayer.on("mouseout", function (e) {
    var shape = e.shape;
	if(shape.getName() == "hex"){
		shape.setFill("white");
		boardLayer.add(shape);
		shape.moveToBottom();
		stage.add(boardLayer);
		
	}    
});

boardLayer.on('click tap', function(e) {       
		
    var shape = e.shape;		
		
	if(shape.getName() == "hex"){
       console.log("Clicked on hex:"+shape.getId());

       if (current_soldier.selected==1) {

           console.log("Defining solider animation");

           current_soldier.start();

           //   var difference = function (a, b) { return Math.abs(a - b) }

           var x = shape.getAbsolutePosition().x-25;
           var y = shape.getAbsolutePosition().y-25;

           if (x > current_soldier.getX()) {
               current_soldier.setAnimation('move_right'); }
           else {  current_soldier.setAnimation('move_left');  }

           var anim = new Kinetic.Animation(function(frame) {
			   boardLayer.setListening(false);
               if (current_soldier.getX() == x && current_soldier.getY() == y ) {
                   anim.stop();
                   current_soldier.stop();
                   current_soldier.setAnimation('idle');
				   boardLayer.setListening(true);
               }

               if(current_soldier.getX() != x && current_soldier.getX() < x){
                   var nextStep = current_soldier.getX()+(frame.timeDiff + 70)/frame.timeDiff;
                   if(nextStep > x){
                       current_soldier.setX(x);
                   }else{
                       current_soldier.setX(nextStep) ;
                   }
               }

               if(current_soldier.getY() != y && current_soldier.getY() < y){
                   var nextStep = current_soldier.getY()+ (frame.timeDiff + 70)/frame.timeDiff;
                   if(nextStep > y){
                       current_soldier.setY(y);
                   }else{
                       current_soldier.setY(nextStep) ;
                   }
               }

               if(current_soldier.getX() != x  && current_soldier.getX() > x){
                   var nextStep = current_soldier.getX()-(frame.timeDiff + 70)/frame.timeDiff;
                   if(nextStep < x){
                       current_soldier.setX(x);
                   }else{
                       current_soldier.setX(nextStep) ;
                   }
               }

               if(current_soldier.getY() != y && current_soldier.getY() > y){
                   var nextStep = current_soldier.getY()-(frame.timeDiff + 70)/frame.timeDiff;
                   if(nextStep < y){
                       current_soldier.setY(y);
                   }else{
                       current_soldier.setY(nextStep) ;
                   }
               }

           }, boardLayer);

           anim.start();                 
           current_soldier.selected=0;
       }
	}
	
	if(shape.getName() == "circ"){
	    var randomHex = boardLayer.get("#tile-row"+Math.floor((Math.random()*9)+1)+"-col-"+Math.floor((Math.random()*9)+1))[0];
		console.log("Create human clicked");		
			    
			var soldier = new Kinetic.Sprite({
				x : randomHex.getAbsolutePosition().x-25,
				y : randomHex.getAbsolutePosition().y-25,
				image: imageObj,
				animation: 'idle',
				animations: animations,
				frameRate: 7
			});

			soldier.name = getName(5,10);
			soldier.id = "sol";
			console.log("Created: "+soldier.name);
			console.log(soldier.getX() + " : " + soldier.getY())
			soldier.on('mousedown', function(e) {
				current_soldier = e.shape;
				current_soldier.selected = 1;
				console.log("Clicked on:"+current_soldier.name);
			});
			
			// add the shape to the layer
			boardLayer.add(soldier);
			// add the layer to the stage
			stage.add(boardLayer);
			soldier.start();			
			
	}
	
	if(shape.getId() == "sol"){
		current_soldier = shape;
		current_soldier.selected = 1;
		console.log("Clicked on:"+current_soldier.name);
	}
});
boardLayer.add(circle);

imageObj.onload = function(){
	stage.add(boardLayer);
};

function createBoardLayer(rows, cols) {
    var rows = rows || 10;
    var cols = cols || 10;
    var rowIdx;
    var colIdx;
    var hexRadius = 35;
    var strokeColor = "#CCCCCC";
    var x;
    var y;
    
    for(colIdx = 0; colIdx < cols; colIdx++) {
        for(rowIdx = 0; rowIdx < rows; rowIdx++) {

            //compute x coordinate of hex tile
            //I did my best to reduce the magic numbers ;)
            x = (colIdx % 2) ? hexRadius * 2 + rowIdx * hexRadius * 2 - hexRadius / 8 : hexRadius + rowIdx * hexRadius * 2;
            if(rowIdx != 0) {
                x = x - rowIdx * hexRadius / 4;
            }

            //compute y coordinate of hex tile
            y = hexRadius + colIdx * hexRadius * 2;
            if(colIdx != 0) {
                y = y - colIdx * hexRadius / 2;
            }

            var hexagon = new Kinetic.RegularPolygon({
                id: "tile-row" + colIdx + "-col-" + rowIdx,
                x: x,
                y: y,
                sides: 6,
                radius: hexRadius,
                stroke: strokeColor,
                strokeWidth: 1,
				name: 'hex'
            });  
			
			hexagon.moveToBottom();
            boardLayer.add(hexagon);
			
        }
    }	
}
