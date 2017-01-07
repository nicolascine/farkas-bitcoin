class WebsocketClient {
    constructor() {
        this.websocket = new WebSocket('wss://api.bitfinex.com/ws/v2');
        this.websocket.onopen = () => { this.socketOpen() };
        this.websocket.onmessage = (evt) => { this.socketMessage(evt) };
        this.websocket.onerror = (evt) => { this.socketError(evt) };
        this.countResponses = 0;
    }

    socketOpen() {
        $('#init').append('<p>> CONNECTED</p>');
    }

    socketMessage(evt) {
        var responseArray = JSON.parse(evt.data)
        if (responseArray.length >= 5) {
            this.parseData(responseArray)
        }
    }

    socketError(evt) {
        $('#init').append('<p>> ERROR: ' + evt.data + '</p>');
    }

    sendMessage(message) {
        console.log(message);
        $('#init').append('<p>> SENT: ' + JSON.stringify(message) + '</p>');
        this.websocket.send(JSON.stringify(message));
    };

    parseData(data) {
        var BID = data[1];
        var BID_SIZE = data[2];
        var ASK = data[3];
        var ASK_SIZE = data[4];
        var date = moment().format('DD-MM-YYYY HH:MM:SS');

        var template = '<li class="item">\
                        <span class="date"><i class="material-icons">keyboard_arrow_right</i>' + date + '</span><br>\
                        <b class="green">BID:</b> ' + BID + ' <b class="red">ASK:</b> ' + ASK + '<br>\
                        <span class="green">BID - ASK:</span> ' + (BID - ASK) + '<br>\
                        <span class="red">BID_SIZE - ASK_SIZE:</span> ' + (BID_SIZE - ASK_SIZE) + '\
                        </li>';

        // Display only last 5
        if (this.countResponses == 5) {
            this.countResponses = 4;
            $('#responses').find('li').last().remove();
        }
        this.countResponses++;
        $('#responses').prepend(template);
    };

}
