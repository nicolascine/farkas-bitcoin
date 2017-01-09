class SidebarPlugin {
    constructor(sidebarContainer) {
        this.container = sidebarContainer
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
        var DATE = moment().format('HH:MM:SS / DD-MM-YYYY')

        var template = '<li class="item animated fadeIn">\
                    <span class="date"><i class="material-icons">keyboard_arrow_right</i>' + DATE + '</span>\
                    <span class="diff-values">Diff Price: <span>' + (BID - ASK) + '</span></span>\
                    <span class="diff-sizes">Diff Sizes:<span> ' + (BID_SIZE - ASK_SIZE) + '</span></span>\
                    <span class="values"><b>BID: ' + BID + ' </b><b>ASK: ' + ASK + '</b><span>\
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
