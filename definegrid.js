var stage = new Kinetic.Stage({
    container: 'container',
    width: 800,
    height: 800
});

var boardLayer = createBoardLayer();

var soldier ;

/*
boardLayer.on("click tap", function (e) {
    var tile = e.shape;
    this.draw;
});
*/

/*boardLayer.on("mouseover", function (e) {
    var tile = e.shape;
    tile.setFill("#E0EBEB");
    this.draw();
});*/

/*boardLayer.on("mouseout", function (e) {
    var tile = e.shape;
    tile.setFill("white");
    this.draw();
});*/

var circle = new Kinetic.Circle({
    x: 650,
    y: stage.getHeight() / 2,
    radius: 40,
    fill: 'red',
    stroke: 'black',
    strokeWidth: 4
});

circle.on('mousedown', function(e) {

    var tile = boardLayer.get("#tile-row"+Math.floor((Math.random()*9)+1)+"-col-"+Math.floor((Math.random()*9)+1))[0];

    console.log("Create human clicked");

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

    imageObj.onload = function() {
        soldier = new Kinetic.Sprite({
            x : tile.getAbsolutePosition().x-25,
            y : tile.getAbsolutePosition().y-25,
            image: imageObj,
            animation: 'idle',
            animations: animations,
            frameRate: 7
        });

        soldier.name = getName(5,10);
        console.log("Created: "+soldier.name);

        soldier.on('mousedown', function(e) {
            soldier = e.shape;

            soldier.selected = 1;

            console.log("Clicked on:"+soldier.name);
        });

        // add the shape to the layer
        boardLayer.add(soldier);

        // add the layer to the stage
        stage.add( boardLayer);
   } ;

});

boardLayer.add(circle);

stage.add(boardLayer);

function createBoardLayer(rows, cols, tilesPerRow) {
    var rows = rows || 10,
        cols = cols || 10,
        tilesPerRow = tilesPerRow || 10,
        rowIdx,
        colIdx,
        hexRadius = 35,
        strokeColor = "#CCCCCC",
        x,
        y,
        layer = new Kinetic.Layer();

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
                strokeWidth: 1
            });

            hexagon.on("mouseover", function (e) {
                var tile = e.shape;
                tile.setFill("#E0EBEB");
                layer.add(hexagon);
                stage.add( layer);
            });

            hexagon.on("mouseout", function (e) {
               var tile = e.shape;
               tile.setFill("white");
               layer.add(hexagon);
               stage.add( layer);
            });

            hexagon.on("click tap", function (e) {
            var tile = e.shape;
            console.log("Clicked on hex:"+tile.getId());

                if (soldier.selected==1) {

                    console.log("Defining solider animation");

                    soldier.start();

                    //   var difference = function (a, b) { return Math.abs(a - b) }

                    var x = tile.getAbsolutePosition().x-25;
                    var y = tile.getAbsolutePosition().y-25;

                    if (x > soldier.getX()) {
                        soldier.setAnimation('move_right'); }
                    else {  soldier.setAnimation('move_left');  }

                    var anim = new Kinetic.Animation(function(frame) {

                        if (soldier.getX() == x && soldier.getY() == y ) {
                            anim.stop();
                            soldier.stop();
                            soldier.setAnimation('idle');
                        }

                        if(soldier.getX() != x && soldier.getX() < x){
                            var nextStep = soldier.getX()+(frame.timeDiff + 70)/frame.timeDiff;
                            if(nextStep > x){
                                soldier.setX(x);
                            }else{
                                soldier.setX(nextStep) ;
                            }
                        }

                        if(soldier.getY() != y && soldier.getY() < y){
                            var nextStep = soldier.getY()+ (frame.timeDiff + 70)/frame.timeDiff;
                            if(nextStep > y){
                                soldier.setY(y);
                            }else{
                                soldier.setY(nextStep) ;
                            }
                        }

                        if(soldier.getX() != x  && soldier.getX() > x){
                            var nextStep = soldier.getX()-(frame.timeDiff + 70)/frame.timeDiff;
                            if(nextStep < x){
                                soldier.setX(x);
                            }else{
                                soldier.setX(nextStep) ;
                            }
                        }

                        if(soldier.getY() != y && soldier.getY() > y){
                            var nextStep = soldier.getY()-(frame.timeDiff + 70)/frame.timeDiff;
                            if(nextStep < y){
                                soldier.setY(y);
                            }else{
                                soldier.setY(nextStep) ;
                            }
                        }

                    }, boardLayer);

                    anim.start();

                  //  soldier.stop();
                    soldier.selected=0;
                }

            });

            layer.add(hexagon);
        }
    }

    return layer;
}
