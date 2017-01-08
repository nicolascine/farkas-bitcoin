class BitfinexChart {
    constructor(chartContainer) {
        this.seriesOptions = [{
            name: 'BID',
            data: [{}]
        }, {
            name: 'ASK',
            data: [{}]
        }];
        this.chartContainer = chartContainer
        this.highchart = new Highcharts.stockChart(this.getOptions());
    }
    getOptions() {
        return {
            chart: {
                renderTo: this.chartContainer,
            },
            rangeSelector: {
                selected: 4
            },
            yAxis: {
                labels: {
                    formatter: function() {
                        return (this.value > 0 ? ' + ' : '') + this.value + '%';
                    }
                },
                plotLines: [{
                    value: 0,
                    width: 3,
                    color: 'silver'
                }]
            },
            plotOptions: {
                series: {
                    compare: 'percent',
                    showInNavigator: true
                }
            },
            tooltip: {
                pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b> ({point.change}%)<br/>',
                valueDecimals: 2,
                split: true
            },
            series: this.seriesOptions
        }
    }
    setChartSeries(data) {
        var time = (new Date()).getTime()
        this.highchart.series[0].addPoint([time, data[1]], true, false, true);
        this.highchart.series[1].addPoint([time, data[3]], true, false, true);
    }
}
