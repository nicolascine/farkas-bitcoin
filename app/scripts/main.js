var message = {
    event: 'subscribe',
    channel: 'ticker',
    symbol: 'tBTCUSD'
};

var websocket = new WebSocket("wss://api.bitfinex.com/ws/v2");

websocket.onopen = function() {
    $("#response").append('<p>> CONNECTED</p>');
};

websocket.onmessage = function(evt) {
    console.log(evt)
    $("#response").append("<p>> RESPONSE: " + evt.data + "</p>");
};

websocket.onerror = function(evt) {
    console.log(evt)
    $("#response").append("<p>> ERROR: " + evt.data + "</p>");
};

function sendMessage(message) {
    console.log(message)
    $("#response").append("<p>> SENT: " + JSON.stringify(message) + "</p>");
    websocket.send(message);
};
