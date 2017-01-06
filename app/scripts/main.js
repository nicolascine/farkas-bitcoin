var message = {
    event: 'subscribe',
    channel: 'ticker',
    symbol: 'tBTCUSD'
};

/* Requirement:

            arr[0] // ignore
BID       = arr[1]; // float Price of last highest bid
BID_SIZE  = arr[2]; // float Size of the last highest bid
ASK       = arr[3]; // float Price of last lowest ask
ASK_SIZE  = arr[4]; // float Size of the last lowest ask
            arr[5] // ignore

1. - Qué tamaño va teniendo la diferencia entre el precio más alto
    al que compran y el más bajo al que venden. (Cómo se comparan los BID y los ASK.)
    (BID - ASK)

2. - Qué tamaño va teniendo la diferencia entre la cantidad que están
    dispuestos a comprar y la cantidad que están dispuestos a vender
    (BID_SIZE - ASK_SIZE)

- Cuál es el precio de cada BID y cada ASK */



var websocket = new WebSocket('wss://api.bitfinex.com/ws/v2');

websocket.onopen = function() {
    $('#response').append('<p>> CONNECTED</p>');
};

websocket.onmessage = function(evt) {
    var responseArray = JSON.parse(evt.data)
    if(responseArray.length >= 5) {
      parseData( responseArray )
    }
};

websocket.onerror = function(evt) {
    //console.log(evt)
    $('#response').append('<p>> ERROR: ' + evt.data + '</p>');
};

function sendMessage(message) {
    //console.log(message)
    $('#response').append('<p>> SENT: ' + JSON.stringify(message) + '</p>');
    websocket.send(JSON.stringify(message));
};

setTimeout(function() {
    sendMessage(message)
}, 2000)

function parseData(data){

  var BID = data[1];
  var BID_SIZE = data[2];
  var ASK = data[3];
  var ASK_SIZE = data[4];

  $('#response').append('<hr>');
  $('#response').append('<p>> <b>BID:</b> ' + BID + ' <b>ASK:</b> ' + ASK + '</p>');
  $('#response').append('<p>> (BID - ASK): ' + (BID - ASK) + '</p>');
  $('#response').append('<p>> (BID_SIZE - ASK_SIZE): ' + (BID_SIZE - ASK_SIZE) + '</p>');
  $('#response').append('<hr>');
}

