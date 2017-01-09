class SidebarPlugin {
    constructor(sidebarContainer) {
        this.container = sidebarContainer
        this.countResponses = 0
    }

    attachStatusMsg(msg) {
        $('#init').append('<p>>' + msg + '</p>')
    }

    attachStreamItem(data) {
        var bid     = data[1]
        var bidSize = data[2]
        var ask     = data[3]
        var askSize = data[4]
        var date    = moment().format('hh:mm:ss / DD-MM-YYYY')
        var spread  = (bid - ask).toFixed(2)
        var spread  = (bid - ask).toFixed(2)
        var spreadSize = (bidSize - askSize).toFixed(2)
        var spreadType = ''

        if(spread < 0){
          spread = spread.toString().substring(1)
          spreadType = 'down'
        }else{
          spreadType = 'up'
        }

        var template = '<li class="item animated fadeIn">\
                    <span class="date"><i class="material-icons">keyboard_arrow_right</i>' + date + '</span>\
                    <span class="diff-values '+spreadType+'">Spread: <i class="material-icons">arrow_drop_'+spreadType+'</i>\
                    <span>' + spread + '</span></span>\
                    <span class="diff-sizes">Diff Sizes:<span> ' + spreadSize + '</span></span>\
                    <span class="values"><b>bid: ' + bid + ' </b><b>ask: ' + ask + '</b><span>\
                    </li>';

        // Display only last 5
        if (this.countResponses == 5) {
            this.countResponses = 4
            this.container.find('li').last().remove()
        }

        this.countResponses++;
        this.container.prepend(template)

        //Append to Table
        var row = '<tr class="animated fadeIn">\
                  <td>' + data[1] + '</td>\
                  <td>' + data[2] + '</td>\
                  <td>' + data[3] + '</td>\
                  <td>' + data[4] + '</td>\
                  <td>' + data[5] + '</td>\
                  <td>' + data[6] + '</td>\
                  <td>' + data[7] + '</td>\
                  <td>' + data[8] + '</td>\
                  <td>' + data[9] + '</td>\
                  <td>' + data[10] + '</td>\
                </tr>';
        $('.table-striped tbody').prepend(row)
    }
}
