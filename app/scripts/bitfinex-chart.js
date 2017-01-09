class BitfinexChart {
    constructor(chartContainer) {
        this.seriesOptions = [{
            name: 'BID',
            color: '#8bc040',
            data: []
        }, {
            name: 'ASK',
            color: '#de5f66',
            data: []
        }];
        this.chartContainer = chartContainer
        this.countItems = 0
        this.isReady = false
        this.highchart = new Highcharts.stockChart(this.getOptions())
    }
    getOptions() {
        return {
            chart: {
                renderTo: this.chartContainer,
                backgroundColor: '#323b44'
            },
            rangeSelector: {
                enabled: false
            },
            xAxis: {
                allowDecimals: false,
                min: (new Date()).getTime()
            },
            yAxis: [{
                labels: {
                    formatter: function() {
                        return '$' + this.value
                    }
                },
                plotLines: [{
                    value: 0,
                    width: 3
                }]
            }],
            tooltip: {
                pointFormat: '<span style="color:{series.color}">{series.name}</span> <b>${point.y}</b><br/>',
                valueDecimals: 2,
                split: true
            },
            series: this.seriesOptions,
            credits: {
                enabled: false
            }
        }
    }
    setChartSeries(data) {
        var time = (new Date()).getTime()
        var reDraw = this.isReady ? true : false
        if (!this.isReady) {
            this.countItems++
                if (this.countItems == 3) {
                    this.isReady = true
                }
        }
        this.addPoint(time, data, reDraw)
    }
    addPoint(time, data, reDraw) {

        //Add to BID serie
        this.highchart.series[1].addPoint([time, data[3]], reDraw, false, false)

        //Add to ASK serie
        this.highchart.series[0].addPoint([time, data[1]], reDraw, false, false)
    }
}
