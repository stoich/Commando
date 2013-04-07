/* CONTAINS INDEPENDENT UTILITY FUNCTIONS USED FREQUENTLY */

//generates random number between the given constraints
function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

//executes attack
function attack(current_soldier,target,animation,damage,boardLayer) {
	boardLayer.setListening(false);
	console.log("Starting attack animation for "+current_soldier.name);
	current_soldier.setAnimation(animation);
	current_soldier.start();

	var dmgTaken = damage+getRandom(0,10);      //Damage is slightly random
	target.HP = target.HP-dmgTaken;
	console.log("Target "+target.name + " has taken "+dmgTaken + " damage");
	console.log(target.name + " has "+target.HP + " HP left");

	setTimeout(function(){
		current_soldier.stop();
		current_soldier.setAnimation('idle');
		boardLayer.draw();},1000);
		boardLayer.setListening(true);

		if (target.HP <1) {
		console.log(target.name + " has been killed.");

        if (tagert.getName() == "sol") {
        target.bar.remove();
        }
		target.remove();
	}	
}

//calculates distance between two hex tiles (NOT NEEDED, METHOD IS ADDED TO THE TILES)
function calculateDistance(target,destination) {
    if(target.getName() == "hex"){
        var x1 = parseInt(target.getId().split(",")[0]) ;
        var y1 = parseInt(target.getId().split(",")[1]) ;
    }   else {
        var x1 = parseInt(target.currentHexId.split(",")[0]) ;
        var y1 = parseInt(target.currentHexId.split(",")[1]) ;
    }

	  var z1 = -x1-y1;

      if(destination.getName() == "hex"){
	  var x2 = parseInt(destination.getId().split(",")[0]) ;
      var y2 = parseInt(destination.getId().split(",")[1]) ;
      }      else {
        var x2 = parseInt(destination.currentHexId.split(",")[0]) ;
        var y2 = parseInt(destination.currentHexId.split(",")[1]) ;
      }
      var z2 = -x2-y2;

	  return Math.max(Math.abs((x2-x1)),Math.abs((y2-y1)),Math.abs((z2-z1)));
}

//creates moving animation
function createUnitAnimation(shape,current_soldier, boardLayer) {
	console.log("Defining animation for "+current_soldier.name);
    console.log(current_soldier.name+" current location within grid set as "+shape.getId());

    var x = Math.round(shape.getAbsolutePosition().x-25);
    var y = Math.round(shape.getAbsolutePosition().y-25);

    if (x > current_soldier.getX()) {
        current_soldier.setAnimation('move_right'); }
    else {  current_soldier.setAnimation('move_left');  }
      
    current_soldier.hideAPBar();

    var anim = new Kinetic.Animation(function(frame) {
	boardLayer.setListening(false);
	var linearSpeed = 200;
	var linearDistEachFrame = linearSpeed * frame.timeDiff / 1000;

    if (current_soldier.getX() == x && current_soldier.getY() == y ) {
        anim.stop();
        current_soldier.stop();
        current_soldier.setAnimation('idle');
        current_soldier.showAPBar();
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

    current_soldier.start();
}

//draws a radius with the given colour
function drawRadius(currentHexId,unitAP,color,boardLayer){
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
    drawRadius(shape.getId(),unitAP-1,color,boardLayer);
    }
}
}

//removes coloured radius
function removeRadius(color,boardLayer) {
console.log("Removing existing unit radius indication");

    var hexes = boardLayer.get('.hex');
    for (var i=0;i<hexes.length;i++) {

        if (hexes[i].getFill() == color) {
            hexes[i].setFill("white");
        }

    }
}

//sets action icon
function setIcon(target,iconType,icon,boardLayer) {
	console.log("Generating icon for selected unit");	
    icon.setImage(iconType);
    icon.setX(target.getX()-15);
    icon.setY(target.getY()-15);
    icon.moveToTop();
	icon.show();
    boardLayer.add(icon);
    boardLayer.draw();    
}

//button highlighting
function highlightButtonOnClick(shape) {
        console.log("Highlight clicked button");
        var previous = shape.getFill();
        shape.setFill("DarkGray");
        shape.setStroke("black");     
        setTimeout(function(){
        shape.setStroke("grey");
        shape.setFill(previous)},125);
       
}

//generate castle
function generateCastle(hex,castleIcon,affinity,boardLayer) {
    var castleAnimation = {
    idle: [{
        x: 0,
        y: 0,
        width: 50,
        height: 50
    }]     };

    console.log("Creating castle for army "+affinity);

    var castle = new Kinetic.Sprite({
        x : Math.round(hex.getAbsolutePosition().x-25),
        y : Math.round(hex.getAbsolutePosition().y-25),
        id: "castle"+affinity,
        name : "castle",
        image: castleIcon,
        animation: 'idle',
        animations: castleAnimation,
        frameRate: 1,
        index: 0
    });

    castle.currentHexId = hex.getId();
    castle.affinity = affinity;
    castle.name = "castle"+affinity;
    castle.HP = 300;
    boardLayer.add(castle);

    castle.start();
}

//generate unit
function generateUnit(shape,onDemand,currentTurn,animations,imageObj,boardLayer) {
    console.log("Generate unit clicked");
    highlightButtonOnClick(shape)      ;

    var randomHex;

    while (randomHex == undefined) {
        randomHex = boardLayer.get("#"+getRandom(-4,9)+","+getRandom(0,9))[0];
    }

     if (onDemand == 0) {
        var castle = boardLayer.get("#castle"+currentTurn)[0];
        while (randomHex == undefined || calculateDistance(castle,randomHex) != 1 ) {         //Generate unit close to castle
            randomHex = boardLayer.get("#"+getRandom(-4,9)+","+getRandom(0,9))[0];
        }

    }

    var soldier = new Kinetic.Sprite({
        x : Math.round(randomHex.getAbsolutePosition().x-25),
        y : Math.round(randomHex.getAbsolutePosition().y-25),
        image: imageObj,
        animation: 'idle',
        animations: animations,
        frameRate: 30,
        index: 0
    });

    //Set unit affinity (1 or 0)
    soldier.affinity = currentTurn;
    soldier.AP = 3;
    soldier.HP = 100;

    soldier.name = getName(5,10);    //name and setName are different things!
    soldier.setName("sol");          //name and setName are different things!
    soldier.currentHexId = randomHex.getId(); //Which hex does soldier belong to
    soldier.bar = new APBar(soldier.getX(), soldier.getY(), soldier.AP, boardLayer);

    //create soldier methods for handling AP bar
    soldier.showAPBar = function(){
        this.bar.showBar(this.getX(),this.getY(), this.AP);
    };
    soldier.hideAPBar = function(){
        this.bar.hideBar();
    };

    console.log("Created: "+soldier.name +" at "+soldier.getX() + " : " + soldier.getY());
    console.log(soldier.name+"current location within grid set as "+soldier.currentHexId);

    // add the shape to the layer
    boardLayer.add(soldier);

    soldier.bar.initBar(boardLayer);

    // add the layer to the stage
    //stage.add(boardLayer);
}

//generate gold
function generateGold(goldImage,count,boardLayer) {
   if (count == 0) {
        return;
    }

    var castle0 = boardLayer.get("#castle0")[0];
    var castle1 = boardLayer.get("#castle1")[0];

    var randomHex;

    while (randomHex == undefined) {
        randomHex = boardLayer.get("#"+getRandom(-4,9)+","+getRandom(0,9))[0];
    }

    while (randomHex == undefined || calculateDistance(randomHex,castle0)<4 || calculateDistance(randomHex,castle1) <4 ) {
        randomHex = boardLayer.get("#"+getRandom(-4,9)+","+getRandom(0,9))[0];
    }

    var gold = new Kinetic.Image({
        x : Math.round(randomHex.getAbsolutePosition().x-25),
        y: Math.round(randomHex.getAbsolutePosition(). y-25),
        id: "gold"+count,
        name: "gold",
        image: goldImage,
        width: 50,
        height: 50
    });

    gold.currentHexId = randomHex.getId();

    boardLayer.add(gold);

    generateGold(goldImage, count-1, boardLayer);
}