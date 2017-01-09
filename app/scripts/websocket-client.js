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
    }
    socketOpen() {
        sidebar.attachStatusConnection('Connecting...')
    }
    socketMessage(event) {
        var data = JSON.parse(event.data)
        if (this.responseIsValid(data)) {
            sidebar.attachStreamItem(data)
            chart.setChartSeries(data)
        }
    }
    socketError(event) {
        sidebar.attachStatusMsg('ERROR: ' + event.data)
    }
    sendMessage() {
        var msgObj = JSON.parse(JSON.stringify(message))
        sidebar.attachStatusMsg('Connecting to channel ' + msgObj['channel'] + ' > ' + msgObj['symbol'] + '...')
        this.waitForConnection(() => {
            this.websocket.send(JSON.stringify(this.message))
            if (typeof callback !== 'undefined') {
                callback()
            }
        }, 1000)
    }
    waitForConnection(callback, interval) {
        if (this.websocket.readyState === 1) {
            sidebar.attachStatusConnection('Connection is OK!')
            $('.fullpage-loader').fadeOut('slow');
            callback()
        } else {
            sidebar.attachStatusConnection('Failed connection')
            setTimeout(() => {
                this.waitForConnection(callback, interval)
            }, interval)
        }
    }
    responseIsValid(data) {
        return data.length >= 5
    }
}
