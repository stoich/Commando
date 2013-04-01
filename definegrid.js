//animation sheet for army 0
var imageObj0 = new Image();
imageObj0.src = 'images/soldier0.png';

//animation sheet for army 1
var imageObj1 = new Image();
imageObj1.src = 'images/soldier1.png';

var gunIconImage = new Image();
gunIconImage.src = 'images/gun.png';

var axeIconImage = new Image();
axeIconImage.src = 'images/axe.png';

var moveIconImage = new Image();
moveIconImage.src = 'images/move.png';

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

var stage = new Kinetic.Stage({
    container: 'container',
    width: 850,
    height: 550
});

var shootbutton   = new Kinetic.Rect({  //Ranged attack button
    x:692,
    y: stage.getHeight()/2-155,
    name: "shootbutton",
    id:   "control",
    width: 100,
    height: 50,
    fill: 'gainsboro',
    stroke: 'grey',
    strokeWidth: 1
});

var meleebutton   =      new Kinetic.Rect({   //Melee attach button
    x: 692,
    y: stage.getHeight()/2-100,
    name: "meleebutton",
    id:   "control",
    width: 100,
    height: 50,
    fill: 'gainsboro',
    stroke: 'grey',
    strokeWidth: 1
});

var circle = new Kinetic.Rect({ //Used to be a circle... Generate unit button
    x:692  ,
    y: stage.getHeight() /2-45,
    name: 'circ',
    id:   "control",
    width: 100,
    height: 50,
    fill: 'gainsboro',
    stroke: 'grey',
    strokeWidth: 1
});

var endturnbutton = new Kinetic.Rect({    //End turn button
    x:692,
    y: stage.getHeight() /2+10,
    name: "endturn",
    id:   "control",
    width: 100,
    height: 50,
    fill: 'gainsboro',
    stroke: 'grey',
    strokeWidth: 1
});

var boardLayer = new Kinetic.Layer();
createBoardLayer();

var current_soldier;
var currentTurn=0;
var colorholder;
var icon;

boardLayer.on("mouseover", function (e) {
    var shape = e.shape;
	if(shape.getName() == "hex"){
	    colorholder = shape.getFill();
        shape.setFill("#E0EBEB");
      // shape.moveToBottom();
      //stage.add(boardLayer);
	}
});

boardLayer.on("mouseout", function (e) {
    var shape = e.shape;
	if(shape.getName() == "hex"){

	if (colorholder == "tan" || colorholder == "crimson") {
	shape.setFill(colorholder);
    return;
	}

    shape.setFill("white");
	}
});

boardLayer.on('click tap', function(e) {

    var shape = e.shape;		
		
	if(shape.getName() == "hex"){
       console.log("Clicked on hex:"+shape.getId());

       if (current_soldier != undefined) { //Time to move soldier
 
       var distance = calculateDistance(current_soldier, shape);
	   console.log("Distance for requested movement calculated as:"+distance);
       
	   if (distance > current_soldier.AP) {
	   console.log("Not enough AP to reach destination hex!");
	   } else {
 
	   current_soldier.currentHexId = shape.getId();        //Set new location for soldier
	   createUnitAnimation(shape,current_soldier);          //Animate soldier movement
	   removeRadius("tan");                                 //Remove movement radius
       icon.hide();
      //moveIcon.hide();                                   //Remove movement icon
     //  boardLayer.draw();
	   current_soldier.AP = current_soldier.AP-distance;    //Update AP
	   document.getElementById("ap").innerText = current_soldier.AP; //Update AP in GUI
	   current_soldier = undefined;                                    //Unselect soldier
	   }
         
       } else {
           document.getElementById("name").innerText = "";
		   document.getElementById("ap").innerText = "";
       }
	}
	
	if(shape.getName() == "circ"){
    console.log("Generate unit clicked");

    var randomHex;
	
	function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
	
    //Loop to make sure random combination exists.
    while (randomHex == undefined) {
        randomHex = boardLayer.get("#"+getRandom(-4,9)+","+getRandom(0,9))[0];
    }
        var imageObj = new Image();

        var current_image;  //soldier anition

        if (currentTurn == 1) {
            current_image = imageObj1;
        }  else {
            current_image = imageObj0;
        }

        var soldier = new Kinetic.Sprite({
				x : randomHex.getAbsolutePosition().x-25,
				y : randomHex.getAbsolutePosition().y-25,
			    image: current_image,
				animation: 'idle',
				animations: animations,
				frameRate: 7
			});

        //Set unit affinity (1 or 0)
        soldier.affinity = currentTurn;
		soldier.AP = 3;

		    soldier.name = getName(5,10);    //name and setName are different things!
            soldier.setName("sol");          //name and setName are different things!
            soldier.currentHexId = randomHex.getId(); //Which hex does soldier belong to

			console.log("Created: "+soldier.name +" at "+soldier.getX() + " : " + soldier.getY());
            console.log(soldier.name+"current location within grid set as "+soldier.currentHexId);

        // add the shape to the layer
			boardLayer.add(soldier);
			// add the layer to the stage
			stage.add(boardLayer);
			soldier.start();
	}

	if(shape.getName() == "sol"){	
		
		document.getElementById("name").textContent = shape.name;
		document.getElementById("ap").textContent = shape.AP;

        if (shape.affinity == currentTurn)      {	
        
		console.log("Selected: "+shape.name);
		current_soldier = shape; //Unit is now selected;	
		
		console.log("Drawing radius for possible unit movement") ;
        removeRadius("tan");
        removeRadius("crimson");
        drawRadius(shape.currentHexId,current_soldier.AP,"tan");
        console.log("Adding action icon to unit");

        setIcon(current_soldier,moveIconImage);

        boardLayer.draw();
           }
        else {
           console.log("Unable to select "+shape.name+" : Unit belongs to opposing side")
        }
		
	}

    if(shape.getName() == "endturn"){
    removeRadius("tan");
    removeRadius("crimson");
    icon.hide();      //Remove icon
    icon = undefined;

    //Reset AP for all units on map
     var units = boardLayer.get('.sol');
     for (var i=0;i<units.length;i++) {
        units[i].AP = 3;
        }

       if(currentTurn == 1) {
           currentTurn=0;
           console.log("Army 1 turn ended. Army 0 to move");
       }  else {
           currentTurn = 1;
           console.log("Army 0 turn ended. Army 1 to move");
       }

    }

    if(shape.getName() == "shootbutton") {
        console.log("Ranged attack button engaged");

        if (current_soldier == undefined) {
            console.log("You have to select a unit before you can use ranged attack");
        } else {
        removeRadius("tan");
        drawRadius(current_soldier.currentHexId,2,"crimson");  //Units can only attack 2 hexes away: hence AP=2

        setIcon(current_soldier,gunIconImage);
        //boardLayer.draw();
        }
    }

    if(shape.getName() == "meleebutton")  {
        console.log("Melee button engaged");

        if (current_soldier == undefined) {
            console.log("You have to select a unit before you can use melee attack");
        } else {
            removeRadius("tan");
            removeRadius("crimson");

            drawRadius(current_soldier.currentHexId,1,"crimson");  //Units can only melee 1 hexes away: hence AP=1
            setIcon(current_soldier,axeIconImage);
            //boardLayer.draw();
        }
    }

});

function calculateDistance(target,destination) {  
	  var x1 = parseInt(target.currentHexId.split(",")[0]) ;
      var y1 = parseInt(target.currentHexId.split(",")[1]) ;
	  var z1 = -x1-y1;
	  
	  var x2 = parseInt(destination.getId().split(",")[0]) ;
      var y2 = parseInt(destination.getId().split(",")[1]) ;
	  var z2 = -x2-y2;

	  return Math.max(Math.abs((x2-x1)),Math.abs((y2-y1)),Math.abs((z2-z1)));
}
function createUnitAnimation(shape,current_soldier) {
  console.log("Defining animation for "+current_soldier.name);
      
           console.log(current_soldier.name+" current location within grid set as "+shape.getId());

           current_soldier.start();

           //   var difference = function (a, b) { return Math.abs(a - b) }

           var x = shape.getAbsolutePosition().x-25;
           var y = shape.getAbsolutePosition().y-25;

           if (x > current_soldier.getX()) {
               current_soldier.setAnimation('move_right'); }
           else {  current_soldier.setAnimation('move_left');  }

           var anim = new Kinetic.Animation(function(frame) {
			   boardLayer.setListening(false);
			   var linearSpeed = 200;
			   var linearDistEachFrame = linearSpeed * frame.timeDiff / 1000;
		  
               if (current_soldier.getX() == x && current_soldier.getY() == y ) {
                   anim.stop();
                   current_soldier.stop();
                   current_soldier.setAnimation('idle');
				   boardLayer.setListening(true);
               }

               if(current_soldier.getX() != x && current_soldier.getX() < x){
                   var nextStep = current_soldier.getX()+linearDistEachFrame;
                   if(nextStep > x){
                       current_soldier.setX(x);
                   }else{
                       current_soldier.setX(nextStep) ;
                   }
               }

               if(current_soldier.getY() != y && current_soldier.getY() < y){
                   var nextStep = current_soldier.getY()+ linearDistEachFrame;
                   if(nextStep > y){
                       current_soldier.setY(y);
                   }else{
                       current_soldier.setY(nextStep) ;
                   }
               }

               if(current_soldier.getX() != x  && current_soldier.getX() > x){
                   var nextStep = current_soldier.getX()-linearDistEachFrame;
                   if(nextStep < x){
                       current_soldier.setX(x);
                   }else{
                       current_soldier.setX(nextStep) ;
                   }
               }

               if(current_soldier.getY() != y && current_soldier.getY() > y){
                   var nextStep = current_soldier.getY()-linearDistEachFrame;
                   if(nextStep < y){
                       current_soldier.setY(y);
                   }else{
                       current_soldier.setY(nextStep) ;
                   }
               }

           }, boardLayer);

           anim.start();        
}
function drawRadius(currentHexId,unitAP,color){
if(unitAP == 0) {return;}

var x = parseInt(currentHexId.split(",")[0]) ;
var y = parseInt(currentHexId.split(",")[1]) ;

var neighborHex = new Array();

//Get all the hexes that next to the root hex
neighborHex[0] = boardLayer.get("#"+ x   +","+(y-1))[0];
neighborHex[1] = boardLayer.get("#"+(x+1)+","+(y-1))[0];
neighborHex[2] = boardLayer.get("#"+(x+1)+","+  y  )[0];
neighborHex[3] = boardLayer.get("#"+  x  +","+(y+1))[0];
neighborHex[4] = boardLayer.get("#"+(x-1)+","+(y+1))[0];
neighborHex[5] = boardLayer.get("#"+(x-1)+","+  y  )[0];

//Mark all neighbours
var i;
for (i=0;i<neighborHex.length;i++)
{
    var shape = neighborHex[i];
    if (neighborHex[i] != undefined){
    shape.setFill(color);
    shape.moveToBottom();
    drawRadius(shape.getId(),unitAP-1,color);
    }
}

}
function removeRadius(color) {
console.log("Removing existing unit radius indication");

    var hexes = boardLayer.get('.hex');
    for (var i=0;i<hexes.length;i++) {

        if (hexes[i].getFill() == color) {
            hexes[i].setFill("white");
        }

    }
}
function setIcon(target,iconType) {
console.log("Generating icon for selected unit");
    if (icon == undefined) {
      icon =  new Kinetic.Image({
            name: "icon",
            width: 25,
            height: 25,
            image: iconType
        });

        icon.setX(target.getX()-10);
        icon.setY(target.getY()-10);
        boardLayer.add(icon);
        boardLayer.draw();
    }   else {
        icon.show();
        icon.setImage(iconType);
        icon.setX(target.getX()-10);
        icon.setY(target.getY()-10);
        icon.moveToTop();
      //  boardLayer.add(icon);
        boardLayer.draw();
    }
}

boardLayer.add(shootbutton);
//Set label
document.getElementById("ranged").style.left  = shootbutton.getX()-130+"px";
document.getElementById("ranged").style.top  =  shootbutton.getY()+30+"px";

boardLayer.add(meleebutton);
//Set label
document.getElementById("melee").style.left  = meleebutton.getX()-205+"px";
document.getElementById("melee").style.top  =  meleebutton.getY()+30+"px";

boardLayer.add(circle);
//Set generate button label
document.getElementById("createSoldiertext").style.left  = circle.getX()+20+"px";
document.getElementById("createSoldiertext").style.top  =  circle.getY()+30+"px";

boardLayer.add(endturnbutton);
//Set end turn button label
document.getElementById("endturntext").style.left  = endturnbutton.getX()+110+"px";
document.getElementById("endturntext").style.top  =  endturnbutton.getY()+30+"px";

//Set unit stats to the left
document.getElementById("unitstats").style.left  = stage.getX()+700+"px";
document.getElementById("unitstats").style.top  =  stage.getY()+25+"px";

stage.add(boardLayer);

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
             //   id: "tile-row" + colIdx + "-col-" + rowIdx,
                x: x,
                y: y,
                sides: 6,
                radius: hexRadius,
                stroke: strokeColor,
                strokeWidth: 1,
				name: 'hex'
            });

			var x1;
            var y1;
			
            //"Strighten" hex grid indexing
            if (colIdx %2 == 0) {
			    x1=rowIdx-colIdx/2;
				y1 = colIdx 
                hexagon.setId(x1+ "," +y1);
            }   else {
			    x1 = rowIdx -(colIdx-1)/2;
				y1 = colIdx 
                hexagon.setId(x1 + "," +y1);
            }

           //Grid numbering. Uncomment this to see x,y,z indexing
      /*     var complexText = new Kinetic.Text({
                x: x-10,
                y: y-10,
         //       text: rowIdx + "," +colIdx ,
                fontSize: 12,
                fontFamily: 'Calibri',
                fill: '#555',
                width: 30    ,
                padding: 0,
                align: 'center'
            });

            if (colIdx %2 == 0) {
                var x = rowIdx-colIdx/2;
                var y =  colIdx;
                complexText.setText(x+ "," +y+","+(-x-y));
            }   else {
                var x = rowIdx -(colIdx-1)/2
                var y =  colIdx;
                complexText.setText(x + "," +y+","+(-x-y));
            }

            boardLayer.add(complexText);*/

            hexagon.moveToBottom();
            boardLayer.add(hexagon);
        }
    }	
}
