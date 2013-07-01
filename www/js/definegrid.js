//animation sheet for army 0
var imageObj0 = new Image();
imageObj0.src = 'images/sol0_1.gif';

//castle icon for army 0
var castleImg0 = new Image();
castleImg0.src = 'images/castle0.gif';

//animation sheet for army 1
var imageObj1 = new Image();
imageObj1.src = 'images/sol1_1.gif';

//castle icon for army 1
var castleImg1 = new Image();
castleImg1.src = 'images/castle1.gif';

//icon for gold
var goldImage = new Image();
goldImage.src = 'images/gold.gif';

var gunIconImage = new Image();
gunIconImage.src = 'images/gun.png';

var axeIconImage = new Image();
axeIconImage.src = 'images/axe.png';

var moveIconImage = new Image();
moveIconImage.src = 'images/move.png';

var animations = {
		idle: [{
			x: 0,
			y: 300,
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
        }],
        attack_gun: [{
        x: 0,
        y: 100,
        width: 50,
        height: 50
    }, {
        x: 50,
        y: 100,
        width: 50,
        height: 50
    }, {
        x: 100,
        y: 100,
        width: 50,
        height: 50
    },
        {
            x: 150,
            y: 100,
            width: 50,
            height: 50
        },
        {
            x: 200,
            y: 100,
            width: 50,
            height: 50
        },
        {
            x: 250,
            y: 100,
            width: 50,
            height: 50
        },{
            x: 300,
            y: 100,
            width: 50,
            height: 50
        },
        {
            x: 350,
            y: 100,
            width: 50,
            height: 50
        }],
        attack_axe: [{
        x: 0,
        y: 200,
        width: 50,
        height: 50
    }, {
        x: 50,
        y: 200,
        width: 50,
        height: 50
    }, {
        x: 100,
        y: 200,
        width: 50,
        height: 50
    },
        {
            x: 150,
            y: 200,
            width: 50,
            height: 50
        },
        {
            x: 200,
            y: 200,
            width: 50,
            height: 50
        },
        {
            x: 250,
            y: 200,
            width: 50,
            height: 50
        },{
            x: 300,
            y: 200,
            width: 50,
            height: 50
        },
        {
            x: 350,
            y: 200,
            width: 50,
            height: 50
        }]
    };

var stage = new Kinetic.Stage({
    container: 'container',
    width: 1500,
    height: 1500
});

var shootbutton = new Kinetic.Rect({  //Ranged attack button
    x:692,
    y: stage.getHeight()/2-105,
    name: "shootbutton",
    id:   "control",
    width: 100,
    height: 50,
    fill: 'gainsboro',
    stroke: 'grey',
    strokeWidth: 1
});

var meleebutton = new Kinetic.Rect({   //Melee attach button
    x: 692,
    y: stage.getHeight()/2-50,
    name: "meleebutton",
    id:   "control",
    width: 100,
    height: 50,
    fill: 'gainsboro',
    stroke: 'grey',
    strokeWidth: 1
});

var generatebutton = new Kinetic.Rect({ //Used to be a circle... Generate unit button
    x:692  ,
    y: stage.getHeight() /2+5,
    name: 'generate',
    id:   "control",
    width: 100,
    height: 50,
    fill: 'gainsboro',
    stroke: 'grey',
    strokeWidth: 1
});

var endturnbutton = new Kinetic.Rect({    //End turn button
    x:692,
    y: stage.getHeight() /2+60,
    name: "endturn",
    id:   "control",
    width: 100,
    height: 50,
    fill: 'gainsboro',
    stroke: 'grey',
    strokeWidth: 1
});

var boardLayer = new Kinetic.Layer();

createBoardLayer(4,5);

var current_soldier;
var currentTurn=0;

var icon = new Kinetic.Image({
            name: "icon",
            width: 25,
            height: 25,
            image: moveIconImage
});

boardLayer.add(icon);
icon.hide();
var army = new Array();

army[0] = new Army("red",3,10);
army[1] = new Army("blue",3,10);

//Handle all the clicks
boardLayer.on('click tap', function(e) {

    var shape = e.targetNode;

	if(shape.getName() == "hex"){
       console.log("Clicked on hex:"+shape.getId());
	   
       if (current_soldier != undefined && icon.getImage() == moveIconImage) { //Time to move soldier if we're in Move mode
	   console.log("pass");
       var distance = calculateDistance(current_soldier, shape);
	   console.log("Distance for requested movement calculated as:"+distance);

	   if (distance > current_soldier.AP) {
	   console.log("Not enough AP to reach destination hex!");
	   } else {

	   current_soldier.currentHexId = shape.getId();        //Set new location for soldier
	   createUnitAnimation(shape,current_soldier,boardLayer);          //Animate soldier movement
	   removeRadius("tan",boardLayer);                                 //Remove movement radius
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

	if(shape.getName() == "generate"){
      if (army[currentTurn].gold < 10) {
          alert("Not enough gold. Unit costs 10");
      }  else {
		  if(currentTurn == 1){
			generateUnit(shape,0,currentTurn,animations,imageObj1,boardLayer);
		  }else{
			generateUnit(shape,0,currentTurn,animations,imageObj0,boardLayer);
		  }          
          army[currentTurn].gold-=10;
          document.getElementById("gold_"+army[currentTurn].color).textContent =  "Gold: "+army[currentTurn].gold;
	  }
	}

	if(shape.getName() == "sol"){
      //  highlightButtonOnClick(shape)

		document.getElementById("name").textContent = shape.name;
		document.getElementById("ap").textContent = shape.AP;
        document.getElementById("hp").textContent = shape.HP;

        if (shape.affinity == currentTurn)      {	   //You clicked on a friendly

		console.log("Selected: "+shape.name);
		current_soldier = shape; //Unit is now selected;

		console.log("Drawing radius for possible unit movement") ;
        removeRadius("tan",boardLayer);
        removeRadius("crimson",boardLayer);

        if (current_soldier.AP != 0) {
        drawRadius(shape.currentHexId,current_soldier.AP,"tan",boardLayer);
        console.log("Adding action icon to unit");
        setIcon(current_soldier,moveIconImage,icon,boardLayer);

        boardLayer.draw();
         }   else {
             console.log("Out of AP for this turn");
         }

           }
        else { //You clicked on an enemy

           if (icon.getImage() == gunIconImage && calculateDistance(current_soldier, shape)<3) {
               console.log("Preparing to fire at enemy");
               attack(current_soldier,shape,"attack_gun",25,boardLayer);
               current_soldier.AP = 0;
               current_soldier.showAPBar();
               current_soldier = undefined;
               removeRadius("crimson",boardLayer);
               icon.hide();              
           }

            if (icon.getImage() == axeIconImage && calculateDistance(current_soldier, shape)<2) {
                console.log("Preparing to melee enemy");
                attack(current_soldier,shape,"attack_axe",50,boardLayer);
                current_soldier.AP = 0;
                current_soldier.showAPBar();
                current_soldier = undefined;
                removeRadius("crimson",boardLayer);
                icon.hide();                
            }

            if (icon.getImage() == moveIconImage) {
                    console.log("Unable to select "+shape.name+" : Unit belongs to opposing side")
            }
        }
	}

    if(shape.getName() == "endturn"){
    highlightButtonOnClick(shape);

    removeRadius("tan",boardLayer);
    removeRadius("crimson",boardLayer);
    if (icon != undefined) {
    icon.hide();     //Remove icon    
    }

    //Reset AP for all units on map
     var units = boardLayer.get('.sol');
     for (var i=0;i<units.length;i++) {
        units[i].AP = 3;
         units[i].showAPBar();
        }

      //Give the armies some cash
     army[currentTurn].gold+=army[currentTurn].income;
     document.getElementById("gold_"+army[currentTurn].color).textContent =  "Gold: "+army[currentTurn].gold;

       if(currentTurn == 1) {
           currentTurn=0;
           console.log("Army 1 turn ended. Army 0 to move");
       }  else {
           currentTurn = 1;
           console.log("Army 0 turn ended. Army 1 to move");
       }

        alert("Turn ended!");
    }

    if(shape.getName() == "shootbutton") {
        console.log("Ranged attack button engaged");
        highlightButtonOnClick(shape)

        if (current_soldier == undefined) {
            console.log("You have to select a unit before you can use ranged attack");
        } else {
        removeRadius("tan",boardLayer);

        if ((current_soldier.AP != 0)) {
        drawRadius(current_soldier.currentHexId,2,"crimson",boardLayer);  //Units can only attack 2 hexes away: hence AP=2
        setIcon(current_soldier,gunIconImage,icon,boardLayer);
        } else {
            console.log("Out of AP - try next turn")
        }
        //boardLayer.draw();
        }
    }

    if(shape.getName() == "meleebutton")  {
        console.log("Melee button engaged");
        highlightButtonOnClick(shape)

        if (current_soldier == undefined) {
            console.log("You have to select a unit before you can use melee attack");
        } else {
            removeRadius("tan",boardLayer);
            removeRadius("crimson",boardLayer);

            if ((current_soldier.AP != 0)) {
                drawRadius(current_soldier.currentHexId,1,"crimson",boardLayer);  //Units can only melee 1 hexes away: hence AP=1
                setIcon(current_soldier,axeIconImage,icon,boardLayer);
                //boardLayer.draw();
            } else {
                console.log("Out of AP - try next turn")
            }
        }
    }

    if(shape.getName() == "gold")      {
        console.log("Clicked on hex:"+shape.getId());

        if (current_soldier != undefined && icon.getImage() == moveIconImage) { //Time to move soldier if we're in Move mode

            var distance = calculateDistance(current_soldier, shape);
            console.log("Distance for requested movement calculated as:"+distance);

            if (distance > current_soldier.AP) {
                console.log("Not enough AP to reach destination hex!");
            } else {

                current_soldier.currentHexId = shape.currentHexId; //!!!!!!!!!!!!!!! IMPORTANT: soldier hex is set as the hex the gold belongs to (not gold itself)
                createUnitAnimation(boardLayer.get("#"+shape.currentHexId)[0],current_soldier,boardLayer);          //Animate soldier movement
                removeRadius("tan",boardLayer);                                 //Remove movement radius
                icon.hide();
                //moveIcon.hide();                                   //Remove movement icon
                //  boardLayer.draw();
                current_soldier.AP = current_soldier.AP-distance;    //Update AP
                document.getElementById("ap").innerText = current_soldier.AP; //Update AP in GUI
                                      //Unselect soldier

                var hex = boardLayer.get("#"+shape.currentHexId)[0];

               if (current_soldier.affinity == 0 && shape.affinity != 0) {
                    hex.setStroke("red");
                    hex.setStrokeWidth(4);

                   if (shape.affinity == 1) {
                       army[1].income-=5;
                       document.getElementById("income_blue").textContent = "(+"+army[1].income+")" ;
                   }

                    shape.affinity = 0;
                    army[0].income+=5;
                    document.getElementById("income_red").textContent = "(+"+army[0].income+")" ;
               }

                if(current_soldier.affinity == 1 && shape.affinity != 1 )                   {
                        hex.setStroke("blue");
                        hex.setStrokeWidth(4);
						
						if (shape.affinity == 0) {
					    army[0].income-=5;
						document.getElementById("income_red").textContent = "(+"+army[0].income+")" ;
					    }
						
                        shape.affinity = 1;
                        army[1].income+=5;
                        document.getElementById("income_blue").textContent = "(+"+army[1].income+")" ;
                }

                current_soldier = undefined;
            }

        } else {
            document.getElementById("name").innerText = "";
            document.getElementById("ap").innerText = "";
        }
    }

    if(shape.getName() == "castle") {

            if (icon == moveIconImage) {
                alert("Castle:"+shape.HP);
            }

            if (icon.getImage() == gunIconImage && calculateDistance(current_soldier, shape)<3) {
                console.log("Preparing to fire at enemy");
                attack(current_soldier,shape,"attack_gun",25,boardLayer);
                current_soldier.AP = 0;
                current_soldier.showAPBar();
                current_soldier = undefined;
                removeRadius("crimson",boardLayer);
                icon.hide();                
            }

            if (icon.getImage() == axeIconImage && calculateDistance(current_soldier, shape)<2) {
                console.log("Preparing to melee enemy");
                attack(current_soldier,shape,"attack_axe",50,boardLayer);
                current_soldier.AP = 0;
                current_soldier.showAPBar();
                current_soldier = undefined;
                removeRadius("crimson",boardLayer);
                icon.hide();                
            }

    }

});



//Create a segment map; each segment is of dimension 5x5 hexes
function createBoardLayer(segmentsOnEachSide,segmentSize) {

	if (segmentsOnEachSide < 1) {
        alert("Number of segments must be greater than one");
        return;
    }

	var result = jQuery.ajax( {
	  	url: "mapgen?seg="+ segmentsOnEachSide +"&size=" + segmentSize,
	  	success: function(result){
	  		var generatedMap = eval(result)	  		
	  		generateMap(segmentsOnEachSide,segmentSize,generatedMap);
	  }
	} );   

}

function generateMap(segmentsOnEachSide,segmentSize,jsonMap){

	

    var rows = segmentsOnEachSide*segmentSize;
    var cols = segmentsOnEachSide*segmentSize;
    var rowIdx;
    var colIdx;

    var x;
    var y;

    var segCount=0;
    var currentSegment = 0;


    for (var i=0; i < segmentsOnEachSide; i++) {
        for (var j=0; j < segmentsOnEachSide; j++){        
            generateSegment(i*segmentSize,i*segmentSize+segmentSize,j*segmentSize,j*segmentSize+segmentSize,jsonMap[currentSegment],currentSegment);
            currentSegment++;
        }
    }
}

function generateSegment(minCol,maxCol,minRow,maxRow,segment,segnum) {
//    var backgroundColor = color;
    var goldCount = 2;

    var hexRadius = 35;
    var strokeColor = "#CCCCCC";
    var currentHex = 0;

    var castlePosition = -1;

    for(colIdx = minCol; colIdx < maxCol; colIdx++) {
        for(rowIdx = minRow; rowIdx < maxRow; rowIdx++) {

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

            var jsonHex =  segment[currentHex]  ;

            var color = "white" ;

            if (jsonHex.color.indexOf("castle") == -1)  {
            if (jsonHex.color != "default")  {
            color = jsonHex.color;
            } else {
                color = "white";
            }
            }

            var hexagon = new Kinetic.RegularPolygon({
                //   id: "tile-row" + colIdx + "-col-" + rowIdx,
                x: x,
                y: y,
                sides: 6,
                radius: hexRadius,
                stroke: strokeColor,
                fill: color,
                strokeWidth: 1,
                name: 'hex'
            });


                        //Grid numbering. Uncomment this to see x,y,z indexing
            var complexText = new Kinetic.Text({
                x: x-10,
                y: y-10,
                //       text: rowIdx + "," +colIdx ,
                fontSize: 12,
                fontFamily: 'Calibri',
                fill: 'red',
                width: 30    ,
                padding: 0,
                align: 'center'
            });

            if (colIdx %2 == 0) {
                var x = rowIdx-colIdx/2;
                var y =  colIdx;
                complexText.setText(segnum);
            }   else {
                var x = rowIdx -(colIdx-1)/2
                var y =  colIdx;
                complexText.setText(segnum);
            }

            boardLayer.add(complexText);

            hexagon.setId(jsonHex.id);

            if (jsonHex.color == "red_castle") {
            generateCastle(hexagon,castleImg0,0,boardLayer);
            }

            if (jsonHex.color == "blue_castle") {
                generateCastle(hexagon,castleImg1,1,boardLayer);
            }

//            //Grid numbering. Uncomment this to see x,y,z indexing
//            var complexText = new Kinetic.Text({
//                x: x-10,
//                y: y-10,
//                //       text: rowIdx + "," +colIdx ,
//                fontSize: 12,
//                fontFamily: 'Calibri',
//                fill: '#555',
//                width: 30    ,
//                padding: 0,
//                align: 'center'
//            });
//
//            if (colIdx %2 == 0) {
//                var x = rowIdx-colIdx/2;
//                var y =  colIdx;
//                complexText.setText(x+ "," +y);
//            }   else {
//                var x = rowIdx -(colIdx-1)/2
//                var y =  colIdx;
//                complexText.setText(x + "," +y);
//            }
//
//            boardLayer.add(complexText);

            boardLayer.add(hexagon);
            hexagon.moveToBottom();
            currentHex++;
        }
    }
}

// left side = 1 , right side = 0
function getCastlePosition(segmentsOnEachSide,side){
   var possiblePositions = new Array();
   var totalSegments = segmentsOnEachSide*segmentsOnEachSide;
   for(var i = 0;i<totalSegments;i++){
       if(i%segmentsOnEachSide == 0 && side == 1){
          possiblePositions.push(i);
       }

       if((i+1)%segmentsOnEachSide == 0 && side == 0){
          possiblePositions.push(i);
       }
   }
   return possiblePositions[getRandom(0,possiblePositions.length -1)];
}

//boardLayer.add(shootbutton);
//Set label
document.getElementById("ranged").style.left  = shootbutton.getX()-180+"px";
document.getElementById("ranged").style.top  =  shootbutton.getY()+30+"px";

//boardLayer.add(meleebutton);
//Set label
document.getElementById("melee").style.left  = meleebutton.getX()-255+"px";
document.getElementById("melee").style.top  =  meleebutton.getY()+30+"px";

//boardLayer.add(generatebutton);
//Set generate button label
document.getElementById("createSoldiertext").style.left  = generatebutton.getX()+20+"px";
document.getElementById("createSoldiertext").style.top  =  generatebutton.getY()+30+"px";

//boardLayer.add(endturnbutton);
//Set end turn button label
document.getElementById("endturntext").style.left  = endturnbutton.getX()+110+"px";
document.getElementById("endturntext").style.top  =  endturnbutton.getY()+30+"px";


//Set unit stats to the left
document.getElementById("unitstats").style.left  = (stage.getX()+700)+"px";
document.getElementById("unitstats").style.top  =  (stage.getY()+25)+"px";

document.getElementById("armystats1").style.left  = (stage.getX()+900)+"px";
document.getElementById("armystats1").style.top  =  (stage.getY()+25)+"px";

document.getElementById("armystats2").style.left  = (stage.getX()+1050)+"px";
document.getElementById("armystats2").style.top  =  (stage.getY()+25)+"px";

stage.add(boardLayer);
