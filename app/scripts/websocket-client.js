class WebsocketClient {
    constructor() {
        this.websocket = new WebSocket('wss://api.bitfinex.com/ws/v2')
        this.websocket.onopen = () => {
            this.socketOpen()
        }
        this.websocket.onmessage = (evt) => {
            this.socketMessage(evt)
        }
        this.websocket.onerror = (evt) => {
            this.socketError(evt)
        }
        this.streamArray = []
    }
    socketOpen() {
        $('#init').append('<p>> CONNECTED</p>')
    }
    socketMessage(evt) {
        if (this.responseIsValid(evt.data)) {
            this.streamArray.push(evt.data)
        }
    }
    socketError(evt) {
        $('#init').append('<p>> ERROR: ' + evt.data + '</p>')
    }
    sendMessage(message) {
        $('#init').append('<p>> SENT: ' + JSON.stringify(message) + '</p>')
        this.websocket.send(JSON.stringify(message))
    }
    responseIsValid(res) {
        var isValid = JSON.parse(res).length >= 5 ? true : false;
        return isValid
    }
}
