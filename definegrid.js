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
//generateCastle(boardLayer.get("#-4,9")[0],castleImg0,0,boardLayer);
//generateCastle(boardLayer.get("#9,0")[0],castleImg1, 1,boardLayer);
//generateGold(goldImage, 5,boardLayer);

var current_soldier;
var currentTurn=0;
//var colorholder;
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

    var json = new Array();
  // 5x5 json =  [[{"id":"0,0","color":"default"},{"id":"1,0","color":"default"},{"id":"2,0","color":"black"},{"id":"3,0","color":"black"},{"id":"4,0","color":"default"},{"id":"0,1","color":"black"},{"id":"1,1","color":"black"},{"id":"2,1","color":"default"},{"id":"3,1","color":"default"},{"id":"4,1","color":"black"},{"id":"-1,2","color":"default"},{"id":"0,2","color":"black"},{"id":"1,2","color":"black"},{"id":"2,2","color":"default"},{"id":"3,2","color":"black"},{"id":"-1,3","color":"black"},{"id":"0,3","color":"default"},{"id":"1,3","color":"default"},{"id":"2,3","color":"default"},{"id":"3,3","color":"default"},{"id":"-2,4","color":"default"},{"id":"-1,4","color":"black"},{"id":"0,4","color":"black"},{"id":"1,4","color":"default"},{"id":"2,4","color":"black"}],[{"id":"5,0","color":"default"},{"id":"6,0","color":"black"},{"id":"7,0","color":"default"},{"id":"8,0","color":"default"},{"id":"9,0","color":"black"},{"id":"5,1","color":"default"},{"id":"6,1","color":"yellow"},{"id":"7,1","color":"black"},{"id":"8,1","color":"default"},{"id":"9,1","color":"default"},{"id":"4,2","color":"yellow"},{"id":"5,2","color":"default"},{"id":"6,2","color":"default"},{"id":"7,2","color":"black"},{"id":"8,2","color":"black"},{"id":"4,3","color":"default"},{"id":"5,3","color":"black"},{"id":"6,3","color":"black"},{"id":"7,3","color":"default"},{"id":"8,3","color":"default"},{"id":"3,4","color":"black"},{"id":"4,4","color":"black"},{"id":"5,4","color":"default"},{"id":"6,4","color":"default"},{"id":"7,4","color":"default"}],[{"id":"10,0","color":"default"},{"id":"11,0","color":"default"},{"id":"12,0","color":"default"},{"id":"13,0","color":"yellow"},{"id":"14,0","color":"default"},{"id":"10,1","color":"default"},{"id":"11,1","color":"default"},{"id":"12,1","color":"black"},{"id":"13,1","color":"default"},{"id":"14,1","color":"default"},{"id":"9,2","color":"default"},{"id":"10,2","color":"black"},{"id":"11,2","color":"yellow"},{"id":"12,2","color":"default"},{"id":"13,2","color":"default"},{"id":"9,3","color":"default"},{"id":"10,3","color":"default"},{"id":"11,3","color":"black"},{"id":"12,3","color":"black"},{"id":"13,3","color":"default"},{"id":"8,4","color":"default"},{"id":"9,4","color":"default"},{"id":"10,4","color":"default"},{"id":"11,4","color":"black"},{"id":"12,4","color":"default"}],[{"id":"15,0","color":"default"},{"id":"16,0","color":"default"},{"id":"17,0","color":"default"},{"id":"18,0","color":"black"},{"id":"19,0","color":"default"},{"id":"15,1","color":"default"},{"id":"16,1","color":"default"},{"id":"17,1","color":"default"},{"id":"18,1","color":"default"},{"id":"19,1","color":"default"},{"id":"14,2","color":"default"},{"id":"15,2","color":"yellow"},{"id":"16,2","color":"default"},{"id":"17,2","color":"yellow"},{"id":"18,2","color":"default"},{"id":"14,3","color":"black"},{"id":"15,3","color":"default"},{"id":"16,3","color":"default"},{"id":"17,3","color":"default"},{"id":"18,3","color":"default"},{"id":"13,4","color":"default"},{"id":"14,4","color":"default"},{"id":"15,4","color":"default"},{"id":"16,4","color":"default"},{"id":"17,4","color":"black"}],[{"id":"20,0","color":"default"},{"id":"21,0","color":"black"},{"id":"22,0","color":"yellow"},{"id":"23,0","color":"default"},{"id":"24,0","color":"default"},{"id":"20,1","color":"default"},{"id":"21,1","color":"yellow"},{"id":"22,1","color":"default"},{"id":"23,1","color":"default"},{"id":"24,1","color":"default"},{"id":"19,2","color":"default"},{"id":"20,2","color":"default"},{"id":"21,2","color":"black"},{"id":"22,2","color":"black"},{"id":"23,2","color":"default"},{"id":"19,3","color":"default"},{"id":"20,3","color":"default"},{"id":"21,3","color":"default"},{"id":"22,3","color":"default"},{"id":"23,3","color":"black"},{"id":"18,4","color":"default"},{"id":"19,4","color":"black"},{"id":"20,4","color":"black"},{"id":"21,4","color":"default"},{"id":"22,4","color":"default"}],[{"id":"-2,5","color":"default"},{"id":"-1,5","color":"default"},{"id":"0,5","color":"black"},{"id":"1,5","color":"black"},{"id":"2,5","color":"default"},{"id":"-3,6","color":"default"},{"id":"-2,6","color":"default"},{"id":"-1,6","color":"default"},{"id":"0,6","color":"default"},{"id":"1,6","color":"default"},{"id":"-3,7","color":"yellow"},{"id":"-2,7","color":"default"},{"id":"-1,7","color":"default"},{"id":"0,7","color":"default"},{"id":"1,7","color":"default"},{"id":"-4,8","color":"default"},{"id":"-3,8","color":"black"},{"id":"-2,8","color":"black"},{"id":"-1,8","color":"default"},{"id":"0,8","color":"default"},{"id":"-4,9","color":"default"},{"id":"-3,9","color":"black"},{"id":"-2,9","color":"black"},{"id":"-1,9","color":"default"},{"id":"0,9","color":"default"}],[{"id":"3,5","color":"default"},{"id":"4,5","color":"default"},{"id":"5,5","color":"default"},{"id":"6,5","color":"default"},{"id":"7,5","color":"default"},{"id":"2,6","color":"default"},{"id":"3,6","color":"default"},{"id":"4,6","color":"default"},{"id":"5,6","color":"black"},{"id":"6,6","color":"default"},{"id":"2,7","color":"black"},{"id":"3,7","color":"default"},{"id":"4,7","color":"default"},{"id":"5,7","color":"default"},{"id":"6,7","color":"default"},{"id":"1,8","color":"default"},{"id":"2,8","color":"default"},{"id":"3,8","color":"black"},{"id":"4,8","color":"default"},{"id":"5,8","color":"black"},{"id":"1,9","color":"default"},{"id":"2,9","color":"default"},{"id":"3,9","color":"default"},{"id":"4,9","color":"default"},{"id":"5,9","color":"yellow"}],[{"id":"8,5","color":"default"},{"id":"9,5","color":"default"},{"id":"10,5","color":"default"},{"id":"11,5","color":"yellow"},{"id":"12,5","color":"default"},{"id":"7,6","color":"default"},{"id":"8,6","color":"default"},{"id":"9,6","color":"default"},{"id":"10,6","color":"default"},{"id":"11,6","color":"default"},{"id":"7,7","color":"default"},{"id":"8,7","color":"default"},{"id":"9,7","color":"black"},{"id":"10,7","color":"default"},{"id":"11,7","color":"black"},{"id":"6,8","color":"default"},{"id":"7,8","color":"default"},{"id":"8,8","color":"default"},{"id":"9,8","color":"default"},{"id":"10,8","color":"default"},{"id":"6,9","color":"default"},{"id":"7,9","color":"default"},{"id":"8,9","color":"default"},{"id":"9,9","color":"default"},{"id":"10,9","color":"black"}],[{"id":"13,5","color":"default"},{"id":"14,5","color":"black"},{"id":"15,5","color":"default"},{"id":"16,5","color":"default"},{"id":"17,5","color":"black"},{"id":"12,6","color":"black"},{"id":"13,6","color":"default"},{"id":"14,6","color":"default"},{"id":"15,6","color":"black"},{"id":"16,6","color":"default"},{"id":"12,7","color":"yellow"},{"id":"13,7","color":"default"},{"id":"14,7","color":"black"},{"id":"15,7","color":"default"},{"id":"16,7","color":"default"},{"id":"11,8","color":"default"},{"id":"12,8","color":"black"},{"id":"13,8","color":"default"},{"id":"14,8","color":"black"},{"id":"15,8","color":"default"},{"id":"11,9","color":"default"},{"id":"12,9","color":"default"},{"id":"13,9","color":"black"},{"id":"14,9","color":"default"},{"id":"15,9","color":"default"}],[{"id":"18,5","color":"default"},{"id":"19,5","color":"default"},{"id":"20,5","color":"default"},{"id":"21,5","color":"default"},{"id":"22,5","color":"default"},{"id":"17,6","color":"default"},{"id":"18,6","color":"default"},{"id":"19,6","color":"default"},{"id":"20,6","color":"default"},{"id":"21,6","color":"default"},{"id":"17,7","color":"black"},{"id":"18,7","color":"default"},{"id":"19,7","color":"black"},{"id":"20,7","color":"default"},{"id":"21,7","color":"default"},{"id":"16,8","color":"black"},{"id":"17,8","color":"default"},{"id":"18,8","color":"default"},{"id":"19,8","color":"default"},{"id":"20,8","color":"black"},{"id":"16,9","color":"default"},{"id":"17,9","color":"black"},{"id":"18,9","color":"black"},{"id":"19,9","color":"default"},{"id":"20,9","color":"black"}],[{"id":"-5,10","color":"red_castle"},{"id":"-4,10","color":"default"},{"id":"-3,10","color":"default"},{"id":"-2,10","color":"default"},{"id":"-1,10","color":"black"},{"id":"-5,11","color":"black"},{"id":"-4,11","color":"black"},{"id":"-3,11","color":"black"},{"id":"-2,11","color":"black"},{"id":"-1,11","color":"black"},{"id":"-6,12","color":"black"},{"id":"-5,12","color":"default"},{"id":"-4,12","color":"default"},{"id":"-3,12","color":"default"},{"id":"-2,12","color":"default"},{"id":"-6,13","color":"black"},{"id":"-5,13","color":"black"},{"id":"-4,13","color":"default"},{"id":"-3,13","color":"default"},{"id":"-2,13","color":"default"},{"id":"-7,14","color":"default"},{"id":"-6,14","color":"default"},{"id":"-5,14","color":"default"},{"id":"-4,14","color":"default"},{"id":"-3,14","color":"black"}],[{"id":"0,10","color":"default"},{"id":"1,10","color":"default"},{"id":"2,10","color":"black"},{"id":"3,10","color":"default"},{"id":"4,10","color":"default"},{"id":"0,11","color":"yellow"},{"id":"1,11","color":"default"},{"id":"2,11","color":"default"},{"id":"3,11","color":"default"},{"id":"4,11","color":"default"},{"id":"-1,12","color":"default"},{"id":"0,12","color":"default"},{"id":"1,12","color":"default"},{"id":"2,12","color":"default"},{"id":"3,12","color":"black"},{"id":"-1,13","color":"default"},{"id":"0,13","color":"default"},{"id":"1,13","color":"black"},{"id":"2,13","color":"default"},{"id":"3,13","color":"black"},{"id":"-2,14","color":"black"},{"id":"-1,14","color":"black"},{"id":"0,14","color":"black"},{"id":"1,14","color":"black"},{"id":"2,14","color":"black"}],[{"id":"5,10","color":"default"},{"id":"6,10","color":"default"},{"id":"7,10","color":"yellow"},{"id":"8,10","color":"default"},{"id":"9,10","color":"default"},{"id":"5,11","color":"black"},{"id":"6,11","color":"black"},{"id":"7,11","color":"black"},{"id":"8,11","color":"black"},{"id":"9,11","color":"default"},{"id":"4,12","color":"default"},{"id":"5,12","color":"default"},{"id":"6,12","color":"default"},{"id":"7,12","color":"black"},{"id":"8,12","color":"black"},{"id":"4,13","color":"black"},{"id":"5,13","color":"default"},{"id":"6,13","color":"black"},{"id":"7,13","color":"default"},{"id":"8,13","color":"black"},{"id":"3,14","color":"default"},{"id":"4,14","color":"default"},{"id":"5,14","color":"default"},{"id":"6,14","color":"black"},{"id":"7,14","color":"default"}],[{"id":"10,10","color":"black"},{"id":"11,10","color":"default"},{"id":"12,10","color":"black"},{"id":"13,10","color":"black"},{"id":"14,10","color":"default"},{"id":"10,11","color":"default"},{"id":"11,11","color":"default"},{"id":"12,11","color":"black"},{"id":"13,11","color":"default"},{"id":"14,11","color":"default"},{"id":"9,12","color":"black"},{"id":"10,12","color":"black"},{"id":"11,12","color":"default"},{"id":"12,12","color":"black"},{"id":"13,12","color":"default"},{"id":"9,13","color":"default"},{"id":"10,13","color":"default"},{"id":"11,13","color":"default"},{"id":"12,13","color":"black"},{"id":"13,13","color":"default"},{"id":"8,14","color":"default"},{"id":"9,14","color":"black"},{"id":"10,14","color":"default"},{"id":"11,14","color":"black"},{"id":"12,14","color":"default"}],[{"id":"15,10","color":"default"},{"id":"16,10","color":"black"},{"id":"17,10","color":"black"},{"id":"18,10","color":"default"},{"id":"19,10","color":"black"},{"id":"15,11","color":"default"},{"id":"16,11","color":"black"},{"id":"17,11","color":"default"},{"id":"18,11","color":"black"},{"id":"19,11","color":"default"},{"id":"14,12","color":"default"},{"id":"15,12","color":"black"},{"id":"16,12","color":"black"},{"id":"17,12","color":"default"},{"id":"18,12","color":"default"},{"id":"14,13","color":"default"},{"id":"15,13","color":"default"},{"id":"16,13","color":"black"},{"id":"17,13","color":"default"},{"id":"18,13","color":"default"},{"id":"13,14","color":"default"},{"id":"14,14","color":"default"},{"id":"15,14","color":"default"},{"id":"16,14","color":"default"},{"id":"17,14","color":"default"}],[{"id":"-7,15","color":"black"},{"id":"-6,15","color":"default"},{"id":"-5,15","color":"default"},{"id":"-4,15","color":"default"},{"id":"-3,15","color":"default"},{"id":"-8,16","color":"default"},{"id":"-7,16","color":"black"},{"id":"-6,16","color":"default"},{"id":"-5,16","color":"default"},{"id":"-4,16","color":"default"},{"id":"-8,17","color":"black"},{"id":"-7,17","color":"default"},{"id":"-6,17","color":"black"},{"id":"-5,17","color":"default"},{"id":"-4,17","color":"black"},{"id":"-9,18","color":"black"},{"id":"-8,18","color":"default"},{"id":"-7,18","color":"black"},{"id":"-6,18","color":"default"},{"id":"-5,18","color":"black"},{"id":"-9,19","color":"default"},{"id":"-8,19","color":"default"},{"id":"-7,19","color":"default"},{"id":"-6,19","color":"default"},{"id":"-5,19","color":"default"}],[{"id":"-2,15","color":"default"},{"id":"-1,15","color":"default"},{"id":"0,15","color":"yellow"},{"id":"1,15","color":"default"},{"id":"2,15","color":"black"},{"id":"-3,16","color":"default"},{"id":"-2,16","color":"yellow"},{"id":"-1,16","color":"default"},{"id":"0,16","color":"default"},{"id":"1,16","color":"default"},{"id":"-3,17","color":"black"},{"id":"-2,17","color":"default"},{"id":"-1,17","color":"default"},{"id":"0,17","color":"default"},{"id":"1,17","color":"black"},{"id":"-4,18","color":"default"},{"id":"-3,18","color":"black"},{"id":"-2,18","color":"default"},{"id":"-1,18","color":"default"},{"id":"0,18","color":"default"},{"id":"-4,19","color":"default"},{"id":"-3,19","color":"black"},{"id":"-2,19","color":"default"},{"id":"-1,19","color":"black"},{"id":"0,19","color":"default"}],[{"id":"3,15","color":"black"},{"id":"4,15","color":"default"},{"id":"5,15","color":"default"},{"id":"6,15","color":"default"},{"id":"7,15","color":"black"},{"id":"2,16","color":"black"},{"id":"3,16","color":"default"},{"id":"4,16","color":"black"},{"id":"5,16","color":"default"},{"id":"6,16","color":"black"},{"id":"2,17","color":"black"},{"id":"3,17","color":"default"},{"id":"4,17","color":"black"},{"id":"5,17","color":"default"},{"id":"6,17","color":"black"},{"id":"1,18","color":"black"},{"id":"2,18","color":"yellow"},{"id":"3,18","color":"black"},{"id":"4,18","color":"default"},{"id":"5,18","color":"black"},{"id":"1,19","color":"default"},{"id":"2,19","color":"default"},{"id":"3,19","color":"default"},{"id":"4,19","color":"black"},{"id":"5,19","color":"default"}],[{"id":"8,15","color":"default"},{"id":"9,15","color":"default"},{"id":"10,15","color":"black"},{"id":"11,15","color":"default"},{"id":"12,15","color":"default"},{"id":"7,16","color":"black"},{"id":"8,16","color":"black"},{"id":"9,16","color":"default"},{"id":"10,16","color":"black"},{"id":"11,16","color":"default"},{"id":"7,17","color":"default"},{"id":"8,17","color":"default"},{"id":"9,17","color":"default"},{"id":"10,17","color":"default"},{"id":"11,17","color":"yellow"},{"id":"6,18","color":"default"},{"id":"7,18","color":"default"},{"id":"8,18","color":"default"},{"id":"9,18","color":"black"},{"id":"10,18","color":"default"},{"id":"6,19","color":"black"},{"id":"7,19","color":"default"},{"id":"8,19","color":"black"},{"id":"9,19","color":"default"},{"id":"10,19","color":"default"}],[{"id":"13,15","color":"default"},{"id":"14,15","color":"default"},{"id":"15,15","color":"default"},{"id":"16,15","color":"yellow"},{"id":"17,15","color":"black"},{"id":"12,16","color":"black"},{"id":"13,16","color":"yellow"},{"id":"14,16","color":"black"},{"id":"15,16","color":"default"},{"id":"16,16","color":"default"},{"id":"12,17","color":"default"},{"id":"13,17","color":"default"},{"id":"14,17","color":"black"},{"id":"15,17","color":"default"},{"id":"16,17","color":"default"},{"id":"11,18","color":"default"},{"id":"12,18","color":"default"},{"id":"13,18","color":"default"},{"id":"14,18","color":"black"},{"id":"15,18","color":"default"},{"id":"11,19","color":"default"},{"id":"12,19","color":"black"},{"id":"13,19","color":"default"},{"id":"14,19","color":"default"},{"id":"15,19","color":"black"}],[{"id":"-10,20","color":"default"},{"id":"-9,20","color":"black"},{"id":"-8,20","color":"default"},{"id":"-7,20","color":"default"},{"id":"-6,20","color":"black"},{"id":"-10,21","color":"black"},{"id":"-9,21","color":"yellow"},{"id":"-8,21","color":"default"},{"id":"-7,21","color":"default"},{"id":"-6,21","color":"black"},{"id":"-11,22","color":"black"},{"id":"-10,22","color":"black"},{"id":"-9,22","color":"default"},{"id":"-8,22","color":"black"},{"id":"-7,22","color":"black"},{"id":"-11,23","color":"default"},{"id":"-10,23","color":"default"},{"id":"-9,23","color":"default"},{"id":"-8,23","color":"black"},{"id":"-7,23","color":"default"},{"id":"-12,24","color":"default"},{"id":"-11,24","color":"default"},{"id":"-10,24","color":"default"},{"id":"-9,24","color":"default"},{"id":"-8,24","color":"default"}],[{"id":"-5,20","color":"default"},{"id":"-4,20","color":"black"},{"id":"-3,20","color":"default"},{"id":"-2,20","color":"default"},{"id":"-1,20","color":"default"},{"id":"-5,21","color":"default"},{"id":"-4,21","color":"default"},{"id":"-3,21","color":"default"},{"id":"-2,21","color":"black"},{"id":"-1,21","color":"black"},{"id":"-6,22","color":"default"},{"id":"-5,22","color":"default"},{"id":"-4,22","color":"default"},{"id":"-3,22","color":"black"},{"id":"-2,22","color":"default"},{"id":"-6,23","color":"black"},{"id":"-5,23","color":"default"},{"id":"-4,23","color":"black"},{"id":"-3,23","color":"default"},{"id":"-2,23","color":"default"},{"id":"-7,24","color":"black"},{"id":"-6,24","color":"default"},{"id":"-5,24","color":"default"},{"id":"-4,24","color":"default"},{"id":"-3,24","color":"default"}],[{"id":"0,20","color":"default"},{"id":"1,20","color":"default"},{"id":"2,20","color":"default"},{"id":"3,20","color":"black"},{"id":"4,20","color":"default"},{"id":"0,21","color":"default"},{"id":"1,21","color":"default"},{"id":"2,21","color":"default"},{"id":"3,21","color":"default"},{"id":"4,21","color":"black"},{"id":"-1,22","color":"black"},{"id":"0,22","color":"default"},{"id":"1,22","color":"black"},{"id":"2,22","color":"default"},{"id":"3,22","color":"black"},{"id":"-1,23","color":"black"},{"id":"0,23","color":"default"},{"id":"1,23","color":"default"},{"id":"2,23","color":"black"},{"id":"3,23","color":"black"},{"id":"-2,24","color":"default"},{"id":"-1,24","color":"yellow"},{"id":"0,24","color":"default"},{"id":"1,24","color":"default"},{"id":"2,24","color":"black"}],[{"id":"5,20","color":"default"},{"id":"6,20","color":"default"},{"id":"7,20","color":"default"},{"id":"8,20","color":"default"},{"id":"9,20","color":"black"},{"id":"5,21","color":"default"},{"id":"6,21","color":"default"},{"id":"7,21","color":"default"},{"id":"8,21","color":"default"},{"id":"9,21","color":"yellow"},{"id":"4,22","color":"default"},{"id":"5,22","color":"default"},{"id":"6,22","color":"default"},{"id":"7,22","color":"default"},{"id":"8,22","color":"black"},{"id":"4,23","color":"black"},{"id":"5,23","color":"default"},{"id":"6,23","color":"black"},{"id":"7,23","color":"black"},{"id":"8,23","color":"default"},{"id":"3,24","color":"default"},{"id":"4,24","color":"default"},{"id":"5,24","color":"default"},{"id":"6,24","color":"default"},{"id":"7,24","color":"black"}],[{"id":"10,20","color":"black"},{"id":"11,20","color":"default"},{"id":"12,20","color":"default"},{"id":"13,20","color":"default"},{"id":"14,20","color":"default"},{"id":"10,21","color":"default"},{"id":"11,21","color":"default"},{"id":"12,21","color":"black"},{"id":"13,21","color":"black"},{"id":"14,21","color":"default"},{"id":"9,22","color":"default"},{"id":"10,22","color":"black"},{"id":"11,22","color":"black"},{"id":"12,22","color":"default"},{"id":"13,22","color":"default"},{"id":"9,23","color":"default"},{"id":"10,23","color":"default"},{"id":"11,23","color":"default"},{"id":"12,23","color":"default"},{"id":"13,23","color":"default"},{"id":"8,24","color":"default"},{"id":"9,24","color":"default"},{"id":"10,24","color":"default"},{"id":"11,24","color":"default"},{"id":"12,24","color":"blue_castle"}]]
  //4x5  json = [[{"id":"0,0","color":"black"},{"id":"1,0","color":"default"},{"id":"2,0","color":"default"},{"id":"3,0","color":"default"},{"id":"4,0","color":"default"},{"id":"0,1","color":"default"},{"id":"1,1","color":"black"},{"id":"2,1","color":"default"},{"id":"3,1","color":"black"},{"id":"4,1","color":"black"},{"id":"-1,2","color":"default"},{"id":"0,2","color":"black"},{"id":"1,2","color":"black"},{"id":"2,2","color":"black"},{"id":"3,2","color":"default"},{"id":"-1,3","color":"default"},{"id":"0,3","color":"default"},{"id":"1,3","color":"default"},{"id":"2,3","color":"default"},{"id":"3,3","color":"default"},{"id":"-2,4","color":"default"},{"id":"-1,4","color":"default"},{"id":"0,4","color":"black"},{"id":"1,4","color":"default"},{"id":"2,4","color":"default"}],[{"id":"5,0","color":"black"},{"id":"6,0","color":"black"},{"id":"7,0","color":"black"},{"id":"8,0","color":"yellow"},{"id":"9,0","color":"black"},{"id":"5,1","color":"black"},{"id":"6,1","color":"black"},{"id":"7,1","color":"default"},{"id":"8,1","color":"black"},{"id":"9,1","color":"black"},{"id":"4,2","color":"black"},{"id":"5,2","color":"black"},{"id":"6,2","color":"default"},{"id":"7,2","color":"default"},{"id":"8,2","color":"default"},{"id":"4,3","color":"yellow"},{"id":"5,3","color":"default"},{"id":"6,3","color":"default"},{"id":"7,3","color":"default"},{"id":"8,3","color":"black"},{"id":"3,4","color":"default"},{"id":"4,4","color":"default"},{"id":"5,4","color":"default"},{"id":"6,4","color":"default"},{"id":"7,4","color":"default"}],[{"id":"10,0","color":"default"},{"id":"11,0","color":"black"},{"id":"12,0","color":"default"},{"id":"13,0","color":"black"},{"id":"14,0","color":"black"},{"id":"10,1","color":"black"},{"id":"11,1","color":"default"},{"id":"12,1","color":"black"},{"id":"13,1","color":"default"},{"id":"14,1","color":"black"},{"id":"9,2","color":"default"},{"id":"10,2","color":"black"},{"id":"11,2","color":"default"},{"id":"12,2","color":"default"},{"id":"13,2","color":"default"},{"id":"9,3","color":"default"},{"id":"10,3","color":"default"},{"id":"11,3","color":"black"},{"id":"12,3","color":"black"},{"id":"13,3","color":"default"},{"id":"8,4","color":"black"},{"id":"9,4","color":"default"},{"id":"10,4","color":"default"},{"id":"11,4","color":"default"},{"id":"12,4","color":"default"}],[{"id":"15,0","color":"default"},{"id":"16,0","color":"default"},{"id":"17,0","color":"default"},{"id":"18,0","color":"blue_castle"},{"id":"19,0","color":"black"},{"id":"15,1","color":"default"},{"id":"16,1","color":"default"},{"id":"17,1","color":"default"},{"id":"18,1","color":"black"},{"id":"19,1","color":"default"},{"id":"14,2","color":"default"},{"id":"15,2","color":"black"},{"id":"16,2","color":"black"},{"id":"17,2","color":"default"},{"id":"18,2","color":"default"},{"id":"14,3","color":"black"},{"id":"15,3","color":"default"},{"id":"16,3","color":"default"},{"id":"17,3","color":"black"},{"id":"18,3","color":"default"},{"id":"13,4","color":"black"},{"id":"14,4","color":"default"},{"id":"15,4","color":"default"},{"id":"16,4","color":"default"},{"id":"17,4","color":"black"}],[{"id":"-2,5","color":"default"},{"id":"-1,5","color":"black"},{"id":"0,5","color":"default"},{"id":"1,5","color":"black"},{"id":"2,5","color":"default"},{"id":"-3,6","color":"default"},{"id":"-2,6","color":"default"},{"id":"-1,6","color":"black"},{"id":"0,6","color":"black"},{"id":"1,6","color":"black"},{"id":"-3,7","color":"default"},{"id":"-2,7","color":"default"},{"id":"-1,7","color":"black"},{"id":"0,7","color":"default"},{"id":"1,7","color":"black"},{"id":"-4,8","color":"default"},{"id":"-3,8","color":"default"},{"id":"-2,8","color":"black"},{"id":"-1,8","color":"default"},{"id":"0,8","color":"default"},{"id":"-4,9","color":"default"},{"id":"-3,9","color":"default"},{"id":"-2,9","color":"yellow"},{"id":"-1,9","color":"black"},{"id":"0,9","color":"default"}],[{"id":"3,5","color":"yellow"},{"id":"4,5","color":"black"},{"id":"5,5","color":"default"},{"id":"6,5","color":"default"},{"id":"7,5","color":"default"},{"id":"2,6","color":"default"},{"id":"3,6","color":"default"},{"id":"4,6","color":"default"},{"id":"5,6","color":"default"},{"id":"6,6","color":"default"},{"id":"2,7","color":"default"},{"id":"3,7","color":"default"},{"id":"4,7","color":"default"},{"id":"5,7","color":"default"},{"id":"6,7","color":"default"},{"id":"1,8","color":"black"},{"id":"2,8","color":"default"},{"id":"3,8","color":"default"},{"id":"4,8","color":"default"},{"id":"5,8","color":"default"},{"id":"1,9","color":"black"},{"id":"2,9","color":"default"},{"id":"3,9","color":"default"},{"id":"4,9","color":"default"},{"id":"5,9","color":"default"}],[{"id":"8,5","color":"default"},{"id":"9,5","color":"default"},{"id":"10,5","color":"black"},{"id":"11,5","color":"black"},{"id":"12,5","color":"black"},{"id":"7,6","color":"default"},{"id":"8,6","color":"default"},{"id":"9,6","color":"default"},{"id":"10,6","color":"default"},{"id":"11,6","color":"default"},{"id":"7,7","color":"black"},{"id":"8,7","color":"default"},{"id":"9,7","color":"black"},{"id":"10,7","color":"default"},{"id":"11,7","color":"black"},{"id":"6,8","color":"default"},{"id":"7,8","color":"default"},{"id":"8,8","color":"default"},{"id":"9,8","color":"yellow"},{"id":"10,8","color":"default"},{"id":"6,9","color":"default"},{"id":"7,9","color":"default"},{"id":"8,9","color":"default"},{"id":"9,9","color":"default"},{"id":"10,9","color":"black"}],[{"id":"13,5","color":"default"},{"id":"14,5","color":"black"},{"id":"15,5","color":"default"},{"id":"16,5","color":"default"},{"id":"17,5","color":"black"},{"id":"12,6","color":"black"},{"id":"13,6","color":"default"},{"id":"14,6","color":"black"},{"id":"15,6","color":"default"},{"id":"16,6","color":"default"},{"id":"12,7","color":"black"},{"id":"13,7","color":"default"},{"id":"14,7","color":"default"},{"id":"15,7","color":"default"},{"id":"16,7","color":"black"},{"id":"11,8","color":"default"},{"id":"12,8","color":"default"},{"id":"13,8","color":"default"},{"id":"14,8","color":"default"},{"id":"15,8","color":"default"},{"id":"11,9","color":"default"},{"id":"12,9","color":"default"},{"id":"13,9","color":"black"},{"id":"14,9","color":"default"},{"id":"15,9","color":"default"}],[{"id":"-5,10","color":"black"},{"id":"-4,10","color":"black"},{"id":"-3,10","color":"default"},{"id":"-2,10","color":"default"},{"id":"-1,10","color":"black"},{"id":"-5,11","color":"default"},{"id":"-4,11","color":"default"},{"id":"-3,11","color":"black"},{"id":"-2,11","color":"default"},{"id":"-1,11","color":"default"},{"id":"-6,12","color":"default"},{"id":"-5,12","color":"default"},{"id":"-4,12","color":"default"},{"id":"-3,12","color":"black"},{"id":"-2,12","color":"black"},{"id":"-6,13","color":"black"},{"id":"-5,13","color":"default"},{"id":"-4,13","color":"black"},{"id":"-3,13","color":"default"},{"id":"-2,13","color":"default"},{"id":"-7,14","color":"red_castle"},{"id":"-6,14","color":"black"},{"id":"-5,14","color":"default"},{"id":"-4,14","color":"black"},{"id":"-3,14","color":"default"}],[{"id":"0,10","color":"yellow"},{"id":"1,10","color":"default"},{"id":"2,10","color":"default"},{"id":"3,10","color":"default"},{"id":"4,10","color":"default"},{"id":"0,11","color":"default"},{"id":"1,11","color":"black"},{"id":"2,11","color":"default"},{"id":"3,11","color":"default"},{"id":"4,11","color":"black"},{"id":"-1,12","color":"black"},{"id":"0,12","color":"default"},{"id":"1,12","color":"default"},{"id":"2,12","color":"default"},{"id":"3,12","color":"default"},{"id":"-1,13","color":"black"},{"id":"0,13","color":"black"},{"id":"1,13","color":"yellow"},{"id":"2,13","color":"default"},{"id":"3,13","color":"default"},{"id":"-2,14","color":"default"},{"id":"-1,14","color":"default"},{"id":"0,14","color":"default"},{"id":"1,14","color":"default"},{"id":"2,14","color":"default"}],[{"id":"5,10","color":"default"},{"id":"6,10","color":"black"},{"id":"7,10","color":"default"},{"id":"8,10","color":"default"},{"id":"9,10","color":"default"},{"id":"5,11","color":"black"},{"id":"6,11","color":"black"},{"id":"7,11","color":"default"},{"id":"8,11","color":"default"},{"id":"9,11","color":"default"},{"id":"4,12","color":"default"},{"id":"5,12","color":"default"},{"id":"6,12","color":"default"},{"id":"7,12","color":"black"},{"id":"8,12","color":"default"},{"id":"4,13","color":"default"},{"id":"5,13","color":"default"},{"id":"6,13","color":"black"},{"id":"7,13","color":"default"},{"id":"8,13","color":"black"},{"id":"3,14","color":"default"},{"id":"4,14","color":"default"},{"id":"5,14","color":"black"},{"id":"6,14","color":"default"},{"id":"7,14","color":"black"}],[{"id":"10,10","color":"default"},{"id":"11,10","color":"default"},{"id":"12,10","color":"black"},{"id":"13,10","color":"yellow"},{"id":"14,10","color":"default"},{"id":"10,11","color":"default"},{"id":"11,11","color":"default"},{"id":"12,11","color":"default"},{"id":"13,11","color":"black"},{"id":"14,11","color":"default"},{"id":"9,12","color":"default"},{"id":"10,12","color":"default"},{"id":"11,12","color":"default"},{"id":"12,12","color":"default"},{"id":"13,12","color":"default"},{"id":"9,13","color":"default"},{"id":"10,13","color":"black"},{"id":"11,13","color":"black"},{"id":"12,13","color":"default"},{"id":"13,13","color":"default"},{"id":"8,14","color":"default"},{"id":"9,14","color":"default"},{"id":"10,14","color":"default"},{"id":"11,14","color":"default"},{"id":"12,14","color":"black"}],[{"id":"-7,15","color":"default"},{"id":"-6,15","color":"black"},{"id":"-5,15","color":"default"},{"id":"-4,15","color":"black"},{"id":"-3,15","color":"default"},{"id":"-8,16","color":"default"},{"id":"-7,16","color":"default"},{"id":"-6,16","color":"default"},{"id":"-5,16","color":"default"},{"id":"-4,16","color":"default"},{"id":"-8,17","color":"default"},{"id":"-7,17","color":"default"},{"id":"-6,17","color":"default"},{"id":"-5,17","color":"default"},{"id":"-4,17","color":"default"},{"id":"-9,18","color":"default"},{"id":"-8,18","color":"default"},{"id":"-7,18","color":"black"},{"id":"-6,18","color":"default"},{"id":"-5,18","color":"yellow"},{"id":"-9,19","color":"default"},{"id":"-8,19","color":"default"},{"id":"-7,19","color":"black"},{"id":"-6,19","color":"default"},{"id":"-5,19","color":"default"}],[{"id":"-2,15","color":"black"},{"id":"-1,15","color":"default"},{"id":"0,15","color":"default"},{"id":"1,15","color":"black"},{"id":"2,15","color":"default"},{"id":"-3,16","color":"default"},{"id":"-2,16","color":"default"},{"id":"-1,16","color":"default"},{"id":"0,16","color":"default"},{"id":"1,16","color":"default"},{"id":"-3,17","color":"default"},{"id":"-2,17","color":"default"},{"id":"-1,17","color":"default"},{"id":"0,17","color":"black"},{"id":"1,17","color":"default"},{"id":"-4,18","color":"black"},{"id":"-3,18","color":"default"},{"id":"-2,18","color":"black"},{"id":"-1,18","color":"default"},{"id":"0,18","color":"default"},{"id":"-4,19","color":"default"},{"id":"-3,19","color":"default"},{"id":"-2,19","color":"black"},{"id":"-1,19","color":"black"},{"id":"0,19","color":"default"}],[{"id":"3,15","color":"default"},{"id":"4,15","color":"default"},{"id":"5,15","color":"default"},{"id":"6,15","color":"black"},{"id":"7,15","color":"black"},{"id":"2,16","color":"default"},{"id":"3,16","color":"default"},{"id":"4,16","color":"black"},{"id":"5,16","color":"default"},{"id":"6,16","color":"default"},{"id":"2,17","color":"black"},{"id":"3,17","color":"default"},{"id":"4,17","color":"default"},{"id":"5,17","color":"black"},{"id":"6,17","color":"default"},{"id":"1,18","color":"default"},{"id":"2,18","color":"black"},{"id":"3,18","color":"default"},{"id":"4,18","color":"default"},{"id":"5,18","color":"default"},{"id":"1,19","color":"black"},{"id":"2,19","color":"black"},{"id":"3,19","color":"default"},{"id":"4,19","color":"default"},{"id":"5,19","color":"default"}],[{"id":"8,15","color":"black"},{"id":"9,15","color":"default"},{"id":"10,15","color":"black"},{"id":"11,15","color":"default"},{"id":"12,15","color":"default"},{"id":"7,16","color":"default"},{"id":"8,16","color":"default"},{"id":"9,16","color":"default"},{"id":"10,16","color":"black"},{"id":"11,16","color":"yellow"},{"id":"7,17","color":"default"},{"id":"8,17","color":"default"},{"id":"9,17","color":"black"},{"id":"10,17","color":"default"},{"id":"11,17","color":"default"},{"id":"6,18","color":"default"},{"id":"7,18","color":"default"},{"id":"8,18","color":"default"},{"id":"9,18","color":"default"},{"id":"10,18","color":"default"},{"id":"6,19","color":"default"},{"id":"7,19","color":"default"},{"id":"8,19","color":"default"},{"id":"9,19","color":"default"},{"id":"10,19","color":"default"}]]
   //     json =  [[{"id":"0,0","color":"default"},{"id":"1,0","color":"black"},{"id":"2,0","color":"black"},{"id":"3,0","color":"default"},{"id":"4,0","color":"black"},{"id":"0,1","color":"default"},{"id":"1,1","color":"black"},{"id":"2,1","color":"default"},{"id":"3,1","color":"black"},{"id":"4,1","color":"default"},{"id":"-1,2","color":"black"},{"id":"0,2","color":"default"},{"id":"1,2","color":"default"},{"id":"2,2","color":"default"},{"id":"3,2","color":"black"},{"id":"-1,3","color":"default"},{"id":"0,3","color":"default"},{"id":"1,3","color":"black"},{"id":"2,3","color":"black"},{"id":"3,3","color":"default"},{"id":"-2,4","color":"black"},{"id":"-1,4","color":"default"},{"id":"0,4","color":"black"},{"id":"1,4","color":"default"},{"id":"2,4","color":"black"}],[{"id":"5,0","color":"black"},{"id":"6,0","color":"default"},{"id":"7,0","color":"black"},{"id":"8,0","color":"black"},{"id":"9,0","color":"black"},{"id":"5,1","color":"default"},{"id":"6,1","color":"default"},{"id":"7,1","color":"default"},{"id":"8,1","color":"default"},{"id":"9,1","color":"black"},{"id":"4,2","color":"default"},{"id":"5,2","color":"default"},{"id":"6,2","color":"black"},{"id":"7,2","color":"default"},{"id":"8,2","color":"default"},{"id":"4,3","color":"black"},{"id":"5,3","color":"black"},{"id":"6,3","color":"default"},{"id":"7,3","color":"default"},{"id":"8,3","color":"default"},{"id":"3,4","color":"default"},{"id":"4,4","color":"default"},{"id":"5,4","color":"black"},{"id":"6,4","color":"default"},{"id":"7,4","color":"default"}],[{"id":"10,0","color":"default"},{"id":"11,0","color":"default"},{"id":"12,0","color":"black"},{"id":"13,0","color":"default"},{"id":"14,0","color":"default"},{"id":"10,1","color":"default"},{"id":"11,1","color":"black"},{"id":"12,1","color":"default"},{"id":"13,1","color":"default"},{"id":"14,1","color":"black"},{"id":"9,2","color":"default"},{"id":"10,2","color":"default"},{"id":"11,2","color":"default"},{"id":"12,2","color":"black"},{"id":"13,2","color":"default"},{"id":"9,3","color":"black"},{"id":"10,3","color":"black"},{"id":"11,3","color":"black"},{"id":"12,3","color":"default"},{"id":"13,3","color":"default"},{"id":"8,4","color":"default"},{"id":"9,4","color":"default"},{"id":"10,4","color":"black"},{"id":"11,4","color":"default"},{"id":"12,4","color":"black"}],[{"id":"15,0","color":"black"},{"id":"16,0","color":"default"},{"id":"17,0","color":"default"},{"id":"18,0","color":"default"},{"id":"19,0","color":"default"},{"id":"15,1","color":"default"},{"id":"16,1","color":"default"},{"id":"17,1","color":"black"},{"id":"18,1","color":"default"},{"id":"19,1","color":"yellow"},{"id":"14,2","color":"default"},{"id":"15,2","color":"default"},{"id":"16,2","color":"default"},{"id":"17,2","color":"default"},{"id":"18,2","color":"default"},{"id":"14,3","color":"black"},{"id":"15,3","color":"black"},{"id":"16,3","color":"default"},{"id":"17,3","color":"default"},{"id":"18,3","color":"black"},{"id":"13,4","color":"default"},{"id":"14,4","color":"default"},{"id":"15,4","color":"default"},{"id":"16,4","color":"default"},{"id":"17,4","color":"black"}],[{"id":"-2,5","color":"default"},{"id":"-1,5","color":"default"},{"id":"0,5","color":"default"},{"id":"1,5","color":"default"},{"id":"2,5","color":"default"},{"id":"-3,6","color":"default"},{"id":"-2,6","color":"default"},{"id":"-1,6","color":"black"},{"id":"0,6","color":"default"},{"id":"1,6","color":"default"},{"id":"-3,7","color":"black"},{"id":"-2,7","color":"default"},{"id":"-1,7","color":"black"},{"id":"0,7","color":"default"},{"id":"1,7","color":"yellow"},{"id":"-4,8","color":"black"},{"id":"-3,8","color":"default"},{"id":"-2,8","color":"black"},{"id":"-1,8","color":"default"},{"id":"0,8","color":"default"},{"id":"-4,9","color":"black"},{"id":"-3,9","color":"default"},{"id":"-2,9","color":"black"},{"id":"-1,9","color":"black"},{"id":"0,9","color":"black"}],[{"id":"3,5","color":"default"},{"id":"4,5","color":"black"},{"id":"5,5","color":"default"},{"id":"6,5","color":"default"},{"id":"7,5","color":"black"},{"id":"2,6","color":"black"},{"id":"3,6","color":"black"},{"id":"4,6","color":"default"},{"id":"5,6","color":"black"},{"id":"6,6","color":"default"},{"id":"2,7","color":"default"},{"id":"3,7","color":"default"},{"id":"4,7","color":"default"},{"id":"5,7","color":"default"},{"id":"6,7","color":"default"},{"id":"1,8","color":"black"},{"id":"2,8","color":"black"},{"id":"3,8","color":"black"},{"id":"4,8","color":"black"},{"id":"5,8","color":"black"},{"id":"1,9","color":"default"},{"id":"2,9","color":"default"},{"id":"3,9","color":"black"},{"id":"4,9","color":"default"},{"id":"5,9","color":"default"}],[{"id":"8,5","color":"black"},{"id":"9,5","color":"default"},{"id":"10,5","color":"black"},{"id":"11,5","color":"default"},{"id":"12,5","color":"default"},{"id":"7,6","color":"black"},{"id":"8,6","color":"default"},{"id":"9,6","color":"black"},{"id":"10,6","color":"black"},{"id":"11,6","color":"black"},{"id":"7,7","color":"black"},{"id":"8,7","color":"default"},{"id":"9,7","color":"default"},{"id":"10,7","color":"default"},{"id":"11,7","color":"default"},{"id":"6,8","color":"default"},{"id":"7,8","color":"default"},{"id":"8,8","color":"black"},{"id":"9,8","color":"default"},{"id":"10,8","color":"default"},{"id":"6,9","color":"default"},{"id":"7,9","color":"default"},{"id":"8,9","color":"default"},{"id":"9,9","color":"black"},{"id":"10,9","color":"black"}],[{"id":"13,5","color":"default"},{"id":"14,5","color":"black"},{"id":"15,5","color":"default"},{"id":"16,5","color":"default"},{"id":"17,5","color":"default"},{"id":"12,6","color":"default"},{"id":"13,6","color":"black"},{"id":"14,6","color":"default"},{"id":"15,6","color":"black"},{"id":"16,6","color":"default"},{"id":"12,7","color":"default"},{"id":"13,7","color":"default"},{"id":"14,7","color":"default"},{"id":"15,7","color":"default"},{"id":"16,7","color":"default"},{"id":"11,8","color":"default"},{"id":"12,8","color":"default"},{"id":"13,8","color":"black"},{"id":"14,8","color":"black"},{"id":"15,8","color":"black"},{"id":"11,9","color":"default"},{"id":"12,9","color":"default"},{"id":"13,9","color":"default"},{"id":"14,9","color":"black"},{"id":"15,9","color":"default"}],[{"id":"-5,10","color":"black"},{"id":"-4,10","color":"default"},{"id":"-3,10","color":"black"},{"id":"-2,10","color":"default"},{"id":"-1,10","color":"black"},{"id":"-5,11","color":"default"},{"id":"-4,11","color":"default"},{"id":"-3,11","color":"default"},{"id":"-2,11","color":"black"},{"id":"-1,11","color":"default"},{"id":"-6,12","color":"default"},{"id":"-5,12","color":"black"},{"id":"-4,12","color":"black"},{"id":"-3,12","color":"black"},{"id":"-2,12","color":"black"},{"id":"-6,13","color":"default"},{"id":"-5,13","color":"default"},{"id":"-4,13","color":"default"},{"id":"-3,13","color":"black"},{"id":"-2,13","color":"default"},{"id":"-7,14","color":"red_castle"},{"id":"-6,14","color":"black"},{"id":"-5,14","color":"default"},{"id":"-4,14","color":"default"},{"id":"-3,14","color":"default"}],[{"id":"0,10","color":"default"},{"id":"1,10","color":"default"},{"id":"2,10","color":"black"},{"id":"3,10","color":"black"},{"id":"4,10","color":"black"},{"id":"0,11","color":"default"},{"id":"1,11","color":"default"},{"id":"2,11","color":"default"},{"id":"3,11","color":"black"},{"id":"4,11","color":"default"},{"id":"-1,12","color":"default"},{"id":"0,12","color":"default"},{"id":"1,12","color":"default"},{"id":"2,12","color":"black"},{"id":"3,12","color":"default"},{"id":"-1,13","color":"default"},{"id":"0,13","color":"default"},{"id":"1,13","color":"black"},{"id":"2,13","color":"default"},{"id":"3,13","color":"default"},{"id":"-2,14","color":"black"},{"id":"-1,14","color":"black"},{"id":"0,14","color":"default"},{"id":"1,14","color":"default"},{"id":"2,14","color":"black"}],[{"id":"5,10","color":"black"},{"id":"6,10","color":"black"},{"id":"7,10","color":"default"},{"id":"8,10","color":"default"},{"id":"9,10","color":"default"},{"id":"5,11","color":"black"},{"id":"6,11","color":"default"},{"id":"7,11","color":"default"},{"id":"8,11","color":"default"},{"id":"9,11","color":"default"},{"id":"4,12","color":"black"},{"id":"5,12","color":"black"},{"id":"6,12","color":"default"},{"id":"7,12","color":"black"},{"id":"8,12","color":"default"},{"id":"4,13","color":"default"},{"id":"5,13","color":"black"},{"id":"6,13","color":"default"},{"id":"7,13","color":"default"},{"id":"8,13","color":"default"},{"id":"3,14","color":"default"},{"id":"4,14","color":"default"},{"id":"5,14","color":"default"},{"id":"6,14","color":"default"},{"id":"7,14","color":"default"}],[{"id":"10,10","color":"default"},{"id":"11,10","color":"default"},{"id":"12,10","color":"default"},{"id":"13,10","color":"blue_castle"},{"id":"14,10","color":"default"},{"id":"10,11","color":"default"},{"id":"11,11","color":"default"},{"id":"12,11","color":"default"},{"id":"13,11","color":"default"},{"id":"14,11","color":"default"},{"id":"9,12","color":"black"},{"id":"10,12","color":"default"},{"id":"11,12","color":"default"},{"id":"12,12","color":"black"},{"id":"13,12","color":"black"},{"id":"9,13","color":"default"},{"id":"10,13","color":"default"},{"id":"11,13","color":"default"},{"id":"12,13","color":"default"},{"id":"13,13","color":"default"},{"id":"8,14","color":"black"},{"id":"9,14","color":"black"},{"id":"10,14","color":"default"},{"id":"11,14","color":"default"},{"id":"12,14","color":"default"}],[{"id":"-7,15","color":"default"},{"id":"-6,15","color":"black"},{"id":"-5,15","color":"default"},{"id":"-4,15","color":"default"},{"id":"-3,15","color":"default"},{"id":"-8,16","color":"black"},{"id":"-7,16","color":"default"},{"id":"-6,16","color":"black"},{"id":"-5,16","color":"black"},{"id":"-4,16","color":"default"},{"id":"-8,17","color":"black"},{"id":"-7,17","color":"black"},{"id":"-6,17","color":"black"},{"id":"-5,17","color":"default"},{"id":"-4,17","color":"default"},{"id":"-9,18","color":"default"},{"id":"-8,18","color":"yellow"},{"id":"-7,18","color":"black"},{"id":"-6,18","color":"default"},{"id":"-5,18","color":"black"},{"id":"-9,19","color":"black"},{"id":"-8,19","color":"black"},{"id":"-7,19","color":"default"},{"id":"-6,19","color":"yellow"},{"id":"-5,19","color":"default"}],[{"id":"-2,15","color":"default"},{"id":"-1,15","color":"black"},{"id":"0,15","color":"default"},{"id":"1,15","color":"default"},{"id":"2,15","color":"yellow"},{"id":"-3,16","color":"default"},{"id":"-2,16","color":"black"},{"id":"-1,16","color":"black"},{"id":"0,16","color":"default"},{"id":"1,16","color":"default"},{"id":"-3,17","color":"default"},{"id":"-2,17","color":"black"},{"id":"-1,17","color":"black"},{"id":"0,17","color":"default"},{"id":"1,17","color":"default"},{"id":"-4,18","color":"default"},{"id":"-3,18","color":"default"},{"id":"-2,18","color":"black"},{"id":"-1,18","color":"default"},{"id":"0,18","color":"black"},{"id":"-4,19","color":"default"},{"id":"-3,19","color":"default"},{"id":"-2,19","color":"default"},{"id":"-1,19","color":"default"},{"id":"0,19","color":"default"}],[{"id":"3,15","color":"yellow"},{"id":"4,15","color":"black"},{"id":"5,15","color":"black"},{"id":"6,15","color":"default"},{"id":"7,15","color":"default"},{"id":"2,16","color":"default"},{"id":"3,16","color":"default"},{"id":"4,16","color":"default"},{"id":"5,16","color":"yellow"},{"id":"6,16","color":"default"},{"id":"2,17","color":"default"},{"id":"3,17","color":"default"},{"id":"4,17","color":"default"},{"id":"5,17","color":"default"},{"id":"6,17","color":"default"},{"id":"1,18","color":"default"},{"id":"2,18","color":"default"},{"id":"3,18","color":"default"},{"id":"4,18","color":"black"},{"id":"5,18","color":"default"},{"id":"1,19","color":"default"},{"id":"2,19","color":"default"},{"id":"3,19","color":"default"},{"id":"4,19","color":"black"},{"id":"5,19","color":"default"}],[{"id":"8,15","color":"black"},{"id":"9,15","color":"black"},{"id":"10,15","color":"black"},{"id":"11,15","color":"default"},{"id":"12,15","color":"black"},{"id":"7,16","color":"default"},{"id":"8,16","color":"default"},{"id":"9,16","color":"default"},{"id":"10,16","color":"default"},{"id":"11,16","color":"yellow"},{"id":"7,17","color":"default"},{"id":"8,17","color":"default"},{"id":"9,17","color":"default"},{"id":"10,17","color":"default"},{"id":"11,17","color":"black"},{"id":"6,18","color":"yellow"},{"id":"7,18","color":"default"},{"id":"8,18","color":"default"},{"id":"9,18","color":"default"},{"id":"10,18","color":"default"},{"id":"6,19","color":"default"},{"id":"7,19","color":"black"},{"id":"8,19","color":"default"},{"id":"9,19","color":"default"},{"id":"10,19","color":"default"}]]
        json = [[{"id":"0,0","color":"default"},{"id":"1,0","color":"black"},{"id":"2,0","color":"default"},{"id":"3,0","color":"default"},{"id":"4,0","color":"default"},{"id":"0,1","color":"default"},{"id":"1,1","color":"default"},{"id":"2,1","color":"default"},{"id":"3,1","color":"black"},{"id":"4,1","color":"default"},{"id":"-1,2","color":"black"},{"id":"0,2","color":"black"},{"id":"1,2","color":"black"},{"id":"2,2","color":"default"},{"id":"3,2","color":"default"},{"id":"-1,3","color":"default"},{"id":"0,3","color":"default"},{"id":"1,3","color":"black"},{"id":"2,3","color":"black"},{"id":"3,3","color":"default"},{"id":"-2,4","color":"black"},{"id":"-1,4","color":"default"},{"id":"0,4","color":"default"},{"id":"1,4","color":"black"},{"id":"2,4","color":"default"}],[{"id":"5,0","color":"black"},{"id":"6,0","color":"default"},{"id":"7,0","color":"yellow"},{"id":"8,0","color":"default"},{"id":"9,0","color":"default"},{"id":"5,1","color":"default"},{"id":"6,1","color":"black"},{"id":"7,1","color":"default"},{"id":"8,1","color":"default"},{"id":"9,1","color":"default"},{"id":"4,2","color":"default"},{"id":"5,2","color":"black"},{"id":"6,2","color":"black"},{"id":"7,2","color":"default"},{"id":"8,2","color":"default"},{"id":"4,3","color":"default"},{"id":"5,3","color":"default"},{"id":"6,3","color":"default"},{"id":"7,3","color":"default"},{"id":"8,3","color":"default"},{"id":"3,4","color":"black"},{"id":"4,4","color":"default"},{"id":"5,4","color":"default"},{"id":"6,4","color":"black"},{"id":"7,4","color":"default"}],[{"id":"10,0","color":"default"},{"id":"11,0","color":"default"},{"id":"12,0","color":"yellow"},{"id":"13,0","color":"default"},{"id":"14,0","color":"black"},{"id":"10,1","color":"black"},{"id":"11,1","color":"default"},{"id":"12,1","color":"black"},{"id":"13,1","color":"black"},{"id":"14,1","color":"default"},{"id":"9,2","color":"default"},{"id":"10,2","color":"default"},{"id":"11,2","color":"default"},{"id":"12,2","color":"default"},{"id":"13,2","color":"black"},{"id":"9,3","color":"yellow"},{"id":"10,3","color":"black"},{"id":"11,3","color":"black"},{"id":"12,3","color":"black"},{"id":"13,3","color":"default"},{"id":"8,4","color":"black"},{"id":"9,4","color":"default"},{"id":"10,4","color":"default"},{"id":"11,4","color":"default"},{"id":"12,4","color":"black"}],[{"id":"15,0","color":"black"},{"id":"16,0","color":"black"},{"id":"17,0","color":"black"},{"id":"18,0","color":"black"},{"id":"19,0","color":"default"},{"id":"15,1","color":"default"},{"id":"16,1","color":"default"},{"id":"17,1","color":"default"},{"id":"18,1","color":"black"},{"id":"19,1","color":"default"},{"id":"14,2","color":"default"},{"id":"15,2","color":"black"},{"id":"16,2","color":"default"},{"id":"17,2","color":"default"},{"id":"18,2","color":"yellow"},{"id":"14,3","color":"default"},{"id":"15,3","color":"default"},{"id":"16,3","color":"default"},{"id":"17,3","color":"default"},{"id":"18,3","color":"yellow"},{"id":"13,4","color":"default"},{"id":"14,4","color":"black"},{"id":"15,4","color":"default"},{"id":"16,4","color":"default"},{"id":"17,4","color":"default"}],[{"id":"-2,5","color":"default"},{"id":"-1,5","color":"black"},{"id":"0,5","color":"default"},{"id":"1,5","color":"black"},{"id":"2,5","color":"black"},{"id":"-3,6","color":"default"},{"id":"-2,6","color":"default"},{"id":"-1,6","color":"default"},{"id":"0,6","color":"default"},{"id":"1,6","color":"default"},{"id":"-3,7","color":"red_castle"},{"id":"-2,7","color":"default"},{"id":"-1,7","color":"default"},{"id":"0,7","color":"default"},{"id":"1,7","color":"black"},{"id":"-4,8","color":"default"},{"id":"-3,8","color":"default"},{"id":"-2,8","color":"black"},{"id":"-1,8","color":"default"},{"id":"0,8","color":"default"},{"id":"-4,9","color":"default"},{"id":"-3,9","color":"default"},{"id":"-2,9","color":"default"},{"id":"-1,9","color":"default"},{"id":"0,9","color":"black"}],[{"id":"3,5","color":"default"},{"id":"4,5","color":"black"},{"id":"5,5","color":"yellow"},{"id":"6,5","color":"yellow"},{"id":"7,5","color":"default"},{"id":"2,6","color":"default"},{"id":"3,6","color":"black"},{"id":"4,6","color":"black"},{"id":"5,6","color":"default"},{"id":"6,6","color":"default"},{"id":"2,7","color":"default"},{"id":"3,7","color":"default"},{"id":"4,7","color":"default"},{"id":"5,7","color":"black"},{"id":"6,7","color":"default"},{"id":"1,8","color":"default"},{"id":"2,8","color":"default"},{"id":"3,8","color":"default"},{"id":"4,8","color":"default"},{"id":"5,8","color":"default"},{"id":"1,9","color":"default"},{"id":"2,9","color":"black"},{"id":"3,9","color":"default"},{"id":"4,9","color":"default"},{"id":"5,9","color":"black"}],[{"id":"8,5","color":"default"},{"id":"9,5","color":"default"},{"id":"10,5","color":"default"},{"id":"11,5","color":"black"},{"id":"12,5","color":"default"},{"id":"7,6","color":"default"},{"id":"8,6","color":"default"},{"id":"9,6","color":"black"},{"id":"10,6","color":"yellow"},{"id":"11,6","color":"default"},{"id":"7,7","color":"black"},{"id":"8,7","color":"default"},{"id":"9,7","color":"default"},{"id":"10,7","color":"yellow"},{"id":"11,7","color":"default"},{"id":"6,8","color":"default"},{"id":"7,8","color":"default"},{"id":"8,8","color":"black"},{"id":"9,8","color":"default"},{"id":"10,8","color":"default"},{"id":"6,9","color":"default"},{"id":"7,9","color":"default"},{"id":"8,9","color":"default"},{"id":"9,9","color":"black"},{"id":"10,9","color":"default"}],[{"id":"13,5","color":"default"},{"id":"14,5","color":"black"},{"id":"15,5","color":"default"},{"id":"16,5","color":"default"},{"id":"17,5","color":"yellow"},{"id":"12,6","color":"default"},{"id":"13,6","color":"default"},{"id":"14,6","color":"black"},{"id":"15,6","color":"default"},{"id":"16,6","color":"default"},{"id":"12,7","color":"default"},{"id":"13,7","color":"black"},{"id":"14,7","color":"black"},{"id":"15,7","color":"default"},{"id":"16,7","color":"yellow"},{"id":"11,8","color":"default"},{"id":"12,8","color":"black"},{"id":"13,8","color":"default"},{"id":"14,8","color":"default"},{"id":"15,8","color":"default"},{"id":"11,9","color":"black"},{"id":"12,9","color":"default"},{"id":"13,9","color":"default"},{"id":"14,9","color":"black"},{"id":"15,9","color":"default"}],[{"id":"-5,10","color":"default"},{"id":"-4,10","color":"black"},{"id":"-3,10","color":"black"},{"id":"-2,10","color":"default"},{"id":"-1,10","color":"default"},{"id":"-5,11","color":"default"},{"id":"-4,11","color":"default"},{"id":"-3,11","color":"default"},{"id":"-2,11","color":"default"},{"id":"-1,11","color":"default"},{"id":"-6,12","color":"black"},{"id":"-5,12","color":"black"},{"id":"-4,12","color":"default"},{"id":"-3,12","color":"yellow"},{"id":"-2,12","color":"default"},{"id":"-6,13","color":"default"},{"id":"-5,13","color":"black"},{"id":"-4,13","color":"default"},{"id":"-3,13","color":"default"},{"id":"-2,13","color":"default"},{"id":"-7,14","color":"default"},{"id":"-6,14","color":"default"},{"id":"-5,14","color":"black"},{"id":"-4,14","color":"black"},{"id":"-3,14","color":"default"}],[{"id":"0,10","color":"default"},{"id":"1,10","color":"default"},{"id":"2,10","color":"default"},{"id":"3,10","color":"black"},{"id":"4,10","color":"default"},{"id":"0,11","color":"default"},{"id":"1,11","color":"black"},{"id":"2,11","color":"default"},{"id":"3,11","color":"default"},{"id":"4,11","color":"default"},{"id":"-1,12","color":"black"},{"id":"0,12","color":"default"},{"id":"1,12","color":"yellow"},{"id":"2,12","color":"black"},{"id":"3,12","color":"default"},{"id":"-1,13","color":"default"},{"id":"0,13","color":"black"},{"id":"1,13","color":"black"},{"id":"2,13","color":"default"},{"id":"3,13","color":"black"},{"id":"-2,14","color":"default"},{"id":"-1,14","color":"black"},{"id":"0,14","color":"black"},{"id":"1,14","color":"default"},{"id":"2,14","color":"default"}],[{"id":"5,10","color":"yellow"},{"id":"6,10","color":"default"},{"id":"7,10","color":"default"},{"id":"8,10","color":"default"},{"id":"9,10","color":"black"},{"id":"5,11","color":"black"},{"id":"6,11","color":"black"},{"id":"7,11","color":"default"},{"id":"8,11","color":"black"},{"id":"9,11","color":"default"},{"id":"4,12","color":"black"},{"id":"5,12","color":"default"},{"id":"6,12","color":"default"},{"id":"7,12","color":"black"},{"id":"8,12","color":"default"},{"id":"4,13","color":"default"},{"id":"5,13","color":"default"},{"id":"6,13","color":"default"},{"id":"7,13","color":"default"},{"id":"8,13","color":"default"},{"id":"3,14","color":"default"},{"id":"4,14","color":"default"},{"id":"5,14","color":"yellow"},{"id":"6,14","color":"black"},{"id":"7,14","color":"default"}],[{"id":"10,10","color":"black"},{"id":"11,10","color":"black"},{"id":"12,10","color":"black"},{"id":"13,10","color":"yellow"},{"id":"14,10","color":"default"},{"id":"10,11","color":"default"},{"id":"11,11","color":"default"},{"id":"12,11","color":"default"},{"id":"13,11","color":"black"},{"id":"14,11","color":"yellow"},{"id":"9,12","color":"default"},{"id":"10,12","color":"default"},{"id":"11,12","color":"default"},{"id":"12,12","color":"black"},{"id":"13,12","color":"default"},{"id":"9,13","color":"default"},{"id":"10,13","color":"black"},{"id":"11,13","color":"default"},{"id":"12,13","color":"default"},{"id":"13,13","color":"default"},{"id":"8,14","color":"default"},{"id":"9,14","color":"black"},{"id":"10,14","color":"default"},{"id":"11,14","color":"black"},{"id":"12,14","color":"black"}],[{"id":"-7,15","color":"default"},{"id":"-6,15","color":"default"},{"id":"-5,15","color":"default"},{"id":"-4,15","color":"default"},{"id":"-3,15","color":"default"},{"id":"-8,16","color":"default"},{"id":"-7,16","color":"default"},{"id":"-6,16","color":"black"},{"id":"-5,16","color":"default"},{"id":"-4,16","color":"default"},{"id":"-8,17","color":"default"},{"id":"-7,17","color":"black"},{"id":"-6,17","color":"default"},{"id":"-5,17","color":"default"},{"id":"-4,17","color":"default"},{"id":"-9,18","color":"black"},{"id":"-8,18","color":"default"},{"id":"-7,18","color":"black"},{"id":"-6,18","color":"default"},{"id":"-5,18","color":"black"},{"id":"-9,19","color":"default"},{"id":"-8,19","color":"yellow"},{"id":"-7,19","color":"default"},{"id":"-6,19","color":"black"},{"id":"-5,19","color":"default"}],[{"id":"-2,15","color":"default"},{"id":"-1,15","color":"default"},{"id":"0,15","color":"yellow"},{"id":"1,15","color":"default"},{"id":"2,15","color":"default"},{"id":"-3,16","color":"default"},{"id":"-2,16","color":"default"},{"id":"-1,16","color":"default"},{"id":"0,16","color":"default"},{"id":"1,16","color":"default"},{"id":"-3,17","color":"black"},{"id":"-2,17","color":"default"},{"id":"-1,17","color":"black"},{"id":"0,17","color":"default"},{"id":"1,17","color":"default"},{"id":"-4,18","color":"default"},{"id":"-3,18","color":"default"},{"id":"-2,18","color":"default"},{"id":"-1,18","color":"black"},{"id":"0,18","color":"default"},{"id":"-4,19","color":"default"},{"id":"-3,19","color":"default"},{"id":"-2,19","color":"default"},{"id":"-1,19","color":"default"},{"id":"0,19","color":"default"}],[{"id":"3,15","color":"black"},{"id":"4,15","color":"default"},{"id":"5,15","color":"default"},{"id":"6,15","color":"yellow"},{"id":"7,15","color":"default"},{"id":"2,16","color":"black"},{"id":"3,16","color":"yellow"},{"id":"4,16","color":"default"},{"id":"5,16","color":"default"},{"id":"6,16","color":"black"},{"id":"2,17","color":"black"},{"id":"3,17","color":"black"},{"id":"4,17","color":"default"},{"id":"5,17","color":"default"},{"id":"6,17","color":"black"},{"id":"1,18","color":"default"},{"id":"2,18","color":"default"},{"id":"3,18","color":"black"},{"id":"4,18","color":"default"},{"id":"5,18","color":"default"},{"id":"1,19","color":"default"},{"id":"2,19","color":"default"},{"id":"3,19","color":"black"},{"id":"4,19","color":"black"},{"id":"5,19","color":"default"}],[{"id":"8,15","color":"default"},{"id":"9,15","color":"default"},{"id":"10,15","color":"default"},{"id":"11,15","color":"default"},{"id":"12,15","color":"black"},{"id":"7,16","color":"default"},{"id":"8,16","color":"default"},{"id":"9,16","color":"default"},{"id":"10,16","color":"default"},{"id":"11,16","color":"blue_castle"},{"id":"7,17","color":"black"},{"id":"8,17","color":"default"},{"id":"9,17","color":"default"},{"id":"10,17","color":"black"},{"id":"11,17","color":"default"},{"id":"6,18","color":"default"},{"id":"7,18","color":"black"},{"id":"8,18","color":"black"},{"id":"9,18","color":"default"},{"id":"10,18","color":"default"},{"id":"6,19","color":"black"},{"id":"7,19","color":"black"},{"id":"8,19","color":"default"},{"id":"9,19","color":"default"},{"id":"10,19","color":"default"}]]

        ;

    console.log(json);

    if (segmentsOnEachSide < 1) {
        alert("Number of segments must be greater than one");
        return;
    }

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
                generateSegment(i*segmentSize,i*segmentSize+segmentSize,j*segmentSize,j*segmentSize+segmentSize,json[currentSegment],currentSegment);

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
