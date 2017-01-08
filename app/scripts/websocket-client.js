class WebsocketClient {
    constructor(endpoint, message) {
        this.websocket = new WebSocket(endpoint)
        this.websocket.onopen = () => {
            this.socketOpen()
        }
        this.websocket.onmessage = (event) => {
            this.socketMessage(event)
        }
        this.websocket.onerror = (event) => {
            this.socketError(event)
        }
        this.message = message
        this.seriesArray = []
    }

    socketOpen() {
        sidebar.attachStatusMsg('CONNECTED')
    }

    socketMessage(event) {
        var data = JSON.parse(event.data)
        if (this.responseIsValid(data)) {
            this.seriesArray.push(data)
            sidebar.attachStreamItem(data)
            chart.setChartSeries(data)
        }
    }

    socketError(event) {
        sidebar.attachStatusMsg('ERROR: ' + event.data)
    }

    sendMessage() {
        sidebar.attachStatusMsg('SENT: ' + JSON.stringify(message))
        this.websocket.send(JSON.stringify(this.message))
    }

    responseIsValid(data) {
        var isValid = data.length >= 5 ? true : false;
        return isValid
    }


}
