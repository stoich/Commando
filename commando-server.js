// http://ejohn.org/blog/ecmascript-5-strict-mode-json-and-more/"use strict";// Optional. You will see this name in eg. 'ps' or 'top' commandprocess.title = 'commando';// Port where we'll run the websocket servervar webSocketsServerPort = 1337;// websocket and http serversvar webSocketServer = require('websocket').server;var http = require('http');/** * Global variables */var RED = 1;var BLUE = 0;var NONE = -1;//var ID = "id";//var COLOR = "color";var DEFAULT = "default";var GOLD = "yellow";var ROCK = "black";var RED_CASTLE = "red_castle";var BLUE_CASTLE = "blue_castle";var segmentsOnSide = 4;var segSize = 5;// list of currently connected clients (users)var clients = new Array();	/** * HTTP server */var server = http.createServer(function(request, response) {    // Not important for us. We're writing WebSocket server, not HTTP server});server.listen(webSocketsServerPort, function() {    console.log((new Date()) + " Server is listening on port " + webSocketsServerPort);});/** * WebSocket server */var wsServer = new webSocketServer({    // WebSocket server is tied to a HTTP server. To be honest I don't understand why.    httpServer: server});// This callback function is called every time someone tries to connect to the WebSocket serverwsServer.on('request', function(request) {    console.log((new Date()) + ' Connection from origin ' + request.origin + '.');	var currentClients = clients.length;    // accept connection    var connection = request.accept(null, request.origin);     // we need to know client index to remove them on 'close' event    var index = clients.push(connection) - 1;      console.log((new Date()) + ' Connection accepted.');    // send back chat history    if (currentClients % 2 == 0) {        connection.sendUTF(JSON.stringify( { type: 'notification', data: 'Odd number of users. Please wait for someone to join in order to start battle.'} ));    }else {		  var map = JSON.stringify( generateMap(4,5) );		  connection.sendUTF(JSON.stringify( { type: 'map', data: map} ));		  		  //Send to previous client to sync maps for both sides				 clients[index-1].sendUTF(JSON.stringify( { type: 'map', data: map} ));		 		 	}    // user sent some message    connection.on('message', function(message) {        if (message.type === 'utf8') { // accept only text            if (userName === false) { // first message sent by user is their name                // remember user name                userName = message.utf8Data;                // get random color and send it back to the user                userColor = colors.shift();                connection.sendUTF(JSON.stringify({ type:'color', data: userColor }));                console.log((new Date()) + ' User is known as: ' + userName                            + ' with ' + userColor + ' color.');            } else { // log and broadcast the message                console.log((new Date()) + ' Received Message from '                            + userName + ': ' + message.utf8Data);                // we want to keep history of all sent messages                var obj = {                    time: (new Date()).getTime(),                    text: message.utf8Data,                    author: userName,                    color: userColor                };                history.push(obj);                // broadcast message to all connected clients                var json = JSON.stringify({ type:'message', data: obj });                for (var i=0; i < clients.length; i++) {                    clients[i].sendUTF(json);                }            }        }    });    // user disconnected    connection.on('close', function(connection) {            console.log((new Date()) + " Peer " + connection.remoteAddress + " disconnected.");            // remove user from the list of connected clients            clients.splice(index, 1);                        });});function generateMap(segmentsOnEachSide, segmentSize){		if (segmentsOnEachSide < 1) {			console.log("Number of segments must be greater than one");			return null;		}				var map = new Array();		var currentSegment = 0;        		var redCastlePosition = PlaceCastle(segmentsOnEachSide, RED);		var blueCastlePosition = PlaceCastle(segmentsOnEachSide, BLUE);		for (var i = 0; i < segmentsOnEachSide; i++) {			for (var j = 0; j < segmentsOnEachSide; j++) {				if (currentSegment == redCastlePosition) {					map.push(GenerateSegment(i * segmentSize, i * segmentSize + segmentSize, j * segmentSize, j							* segmentSize + segmentSize, RED));				} else if (currentSegment == blueCastlePosition) {					map.push(GenerateSegment(i * segmentSize, i * segmentSize + segmentSize, j * segmentSize, j							* segmentSize + segmentSize, BLUE));				} else {					map.push(GenerateSegment(i * segmentSize, i * segmentSize + segmentSize, j * segmentSize, j							* segmentSize + segmentSize, NONE));				}				currentSegment++;			}		}				return map;		}function GenerateSegment( minCol, maxCol, minRow, maxRow, castle) {var segment = new Array();var goldCount = 2;var currentHex = 0;var castlePosition = -1;var color;// segmentSize = maxCol - minColif (castle == RED) {	castlePosition = PlaceCastle((maxCol - minCol), RED);}if (castle == BLUE) {	castlePosition = PlaceCastle((maxCol - minCol), BLUE);}for (var colIdx = minCol; colIdx < maxCol; colIdx++) {	for (var rowIdx = minRow; rowIdx < maxRow; rowIdx++) {		var newHex = new Object();		var dice = getRandom(1, 100);		color = DEFAULT;		if (dice < 30 && currentHex != castlePosition) {			color = ROCK;		}		if (dice >= 30 && dice < 35 && goldCount != 0 && castle == NONE) {			color = GOLD;			goldCount--;		}		var x1;		var y1;		// "Strighten" hex grid indexing		if (colIdx % 2 == 0) {			x1 = rowIdx - colIdx / 2;			y1 = colIdx;		} else {			x1 = rowIdx - (colIdx - 1) / 2;			y1 = colIdx;		}		newHex.id = x1 + "," + y1;		if (castle == RED && currentHex == castlePosition) {			newHex.color = RED_CASTLE;		} else if (castle == BLUE && currentHex == castlePosition) {			newHex.color = BLUE_CASTLE;		} else {			newHex.color = color;		}		segment.push(newHex);		currentHex++;	}}return segment;}function PlaceCastle(size, color) {		var possiblePositions = new Array();		var totalSegments = size * size;		for (var i = 0; i < totalSegments; i++) {			if (i % size == 0 && color == RED) {				possiblePositions.push(i);			}			if ((i + 1) % size == 0 && color == BLUE) {				possiblePositions.push(i);			}		}				return possiblePositions[getRandom(0, possiblePositions.length - 1)];	}	function getRandom(min, max) {    return Math.floor(Math.random() * (max - min + 1)) + min;}