class SidebarPlugin {
    constructor(sidebarContainer) {
        this.container = sidebarContainer
        this.countResponses = 0
        this.data = null
        this.bid = null
        this.bidSize = null
        this.ask = null
        this.askSize = null
        this.date = null
        this.spread = null
        this.spPercent = null
        this.spSize = null
        this.spreadType = null
    }
    attachStatusMsg(msg) {
        $('#init').append('<p>>' + msg + '</p>')
    }
    attachStreamItem(data) {
        this.data = data
        this.parseData()
        //Append to sidebar
        this.appendToSidebar()
        //Append to table
        this.appendToTable()
        //Append to resume table
        this.appentToResume()
    }
    parseData() {
        this.bid = this.data[1]
        this.bidSize = this.data[2]
        this.ask = this.data[3]
        this.askSize = this.data[4]
        this.date = moment().format('hh:mm:ss / DD-MM-YYYY')
        this.spread = (this.bid - this.ask).toFixed(2)
        this.spPercent = (((this.bid - this.ask) / this.bid) * 100).toFixed(2)
        this.spSize = (this.bidSize - this.askSize).toFixed(2)
        this.spSizePer = (((this.bidSize - this.askSize) / this.bidSize) * 100).toFixed(2)
        if (this.spread < 0) {
            this.spreadType = 'down'
        } else {
            this.spreadType = 'up'
        }
    }
    appentToResume() {
        $('.resume .spread .value').html(this.spread)
        $('.resume .spread-percent span').html(this.spPercent)
        $('.resume .sp-size .value').html(this.spSize)
        $('.resume .sp-size-percent span').html(this.spSizePer)
        $('.resume .price-bid span').html(this.bid)
        $('.resume .price-ask span').html(this.ask)
    }
    appendToSidebar() {
        var template = '<li class="item animated fadeIn">\
                  <span class="date"><i class="material-icons">keyboard_arrow_right</i>' + this.date + '</span>\
                  <span class="diff-values ' + this.spreadType + '">Spread: <i class="material-icons">arrow_drop_' + this.spreadType + '</i>\
                  <span>' + this.spread + '</span></span>\
                  <span class="diff-sizes">Diff Sizes:<span> ' + this.spSize + '</span></span>\
                  <span class="values"><b>bid: ' + this.bid + ' </b><b>ask: ' + this.ask + '</b><span>\
                  </li>';
        // Display only last 5
        if (this.countResponses == 5) {
            this.countResponses = 4
            this.container.find('li').last().remove()
        }
        this.countResponses++;
        this.container.prepend(template)
    }
    appendToTable() {
        //Append to Table
        var row = '<tr class="animated fadeIn">\
                <td>' + this.data[1] + '</td>\
                <td>' + this.data[2] + '</td>\
                <td>' + this.data[3] + '</td>\
                <td>' + this.data[4] + '</td>\
                <td>' + this.data[5] + '</td>\
                <td>' + this.data[6] + '</td>\
                <td>' + this.data[7] + '</td>\
                <td>' + this.data[8] + '</td>\
                <td>' + this.data[9] + '</td>\
                <td>' + this.data[10] + '</td>\
              </tr>';
        $('.table-striped tbody').prepend(row)
    }
}
