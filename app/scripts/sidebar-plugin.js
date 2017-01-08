class SidebarPlugin {
    constructor(container) {
        this.container = container
        this.countResponses = 0
    }

    attachStatusMsg(msg) {
        $('#init').append('<p>>' + msg + '</p>')
    }

    attachStreamItem(data) {
        var BID = data[1]
        var BID_SIZE = data[2]
        var ASK = data[3]
        var ASK_SIZE = data[4]
        var DATE = moment().format('DD-MM-YYYY HH:MM:SS')

        var template = '<li class="item animated fadeIn">\
                    <span class="date"><i class="material-icons">keyboard_arrow_right</i>' + DATE + '</span><br>\
                    <b class="green">BID:</b> ' + BID + ' <b class="red">ASK:</b> ' + ASK + '<br>\
                    <span class="green">BID - ASK:</span> ' + (BID - ASK) + '<br>\
                    <span class="red">BID_SIZE - ASK_SIZE:</span> ' + (BID_SIZE - ASK_SIZE) + '\
                    </li>';

        // Display only last 5
        if (this.countResponses == 5) {
            this.countResponses = 4
            this.container.find('li').last().remove()
        }

        this.countResponses++;
        this.container.prepend(template)
    }
}
