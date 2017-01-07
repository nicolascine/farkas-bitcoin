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

var message = {
    event: 'subscribe',
    channel: 'ticker',
    symbol: 'tBTCUSD'
};
var countResponses = 0;
var websocket = new WebSocket('wss://api.bitfinex.com/ws/v2');

websocket.onopen = function() {
    $('#init').append('<p>> CONNECTED</p>');
};

websocket.onmessage = function(evt) {
    var responseArray = JSON.parse(evt.data)
    if (responseArray.length >= 5) {
        parseData(responseArray)
    }
};

websocket.onerror = function(evt) {
    $('#init').append('<p>> ERROR: ' + evt.data + '</p>');
};

function sendMessage(message) {
    $('#init').append('<p>> SENT: ' + JSON.stringify(message) + '</p>');
    websocket.send(JSON.stringify(message));
};

function parseData(data) {
    var BID = data[1];
    var BID_SIZE = data[2];
    var ASK = data[3];
    var ASK_SIZE = data[4];
    var date = moment().format('DD-MM-YYYY HH:MM');
    var template = '<li class="item">\
                    <span class="date"><i class="material-icons">keyboard_arrow_right</i>'+ date +'</span><br>\
                    <b class="green">BID:</b> '+ BID +' <b class="red">ASK:</b> '+ ASK +'<br>\
                    <span class="green">BID - ASK:</span> '+ (BID - ASK) +'<br>\
                    <span class="red">BID_SIZE - ASK_SIZE:</span> '+ (BID_SIZE - ASK_SIZE) +'\
                    </li>';

    // Display only last 5
    if (countResponses == 5) {
        countResponses = 4;
        $('#responses').find('li').last().remove();
    }
    countResponses++;
    $('#responses').prepend(template);
};

setTimeout(function() {
    sendMessage(message)
}, 2000);
