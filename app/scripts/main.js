const endpoint = 'wss://api.bitfinex.com/ws/v2'
const message = {
    event: 'subscribe',
    channel: 'ticker',
    symbol: 'tBTCUSD'
}
const container = $('#responses')


class FarkasSidebar extends SidebarPlugin {
    constructor(container) {
        super(container)
    }
}

class BitfinexWebSocket extends WebsocketClient {
    constructor(endpoint, message) {
        super(endpoint, message)
    }
}


const sidebar = new FarkasSidebar(container);
const bitfinex = new BitfinexWebSocket(endpoint, message);


setTimeout(function() {
    bitfinex.sendMessage()
}, 3000);
