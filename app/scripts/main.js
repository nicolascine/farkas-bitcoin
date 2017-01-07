var message = {
    event: 'subscribe',
    channel: 'ticker',
    symbol: 'tBTCUSD'
}
var ws = new WebsocketClient();

setTimeout(function() {
    ws.sendMessage(message);
}, 3000);
