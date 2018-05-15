import React, {Component} from 'react';
import ReactHighstock from 'react-highcharts/ReactHighstock'
import PropTypes from "prop-types"
import {Meteor} from "meteor/meteor";
import DarkUnica from 'highcharts/themes/dark-unica'

DarkUnica(ReactHighstock.Highcharts)

// App component - represents the whole app
export default class Chart extends Component {
    constructor(props) {
        super(props);
        this.state = {candles: [], volumes: [], selected: 3}
    }

    componentDidMount() {
        this.getData("BTCUSD", "1h")
    }

    getData(symbol, timeFrame, selected = this.state.selected) {
        this.refs.chart.getChart().showLoading()
        Meteor.call("getData", symbol, timeFrame, (error, result) => {
            this.setState({candles: result.candles, volumes: result.volumes, selected: selected})
        })
    }

    render() {
        const options = {
            series: [{
                type: 'candlestick',
                name: 'BTCUSD',
                data: this.state.candles
            }, {
                type: 'column',
                name: 'Volume',
                data: this.state.volumes,
                yAxis: 1
            }],
            rangeSelector: {
                selected: this.state.selected,
                allButtonsEnabled: true,
                buttons: [{
                    type: 'hour',
                    count: 3,
                    text: '1m',
                    events: {
                        click: () => {
                            this.getData("BTCUSD", "1m", 0)
                        }
                    }
                }, {
                    type: 'hour',
                    count: 10,
                    text: '5m',
                    events: {
                        click: () => {
                            this.getData("BTCUSD", "5m", 1)
                        }
                    }
                }, {
                    type: 'day',
                    count: 2,
                    text: '30m',
                    events: {
                        click: () => {
                            this.getData("BTCUSD", "30m", 2)
                        }
                    }
                }, {
                    type: 'week',
                    count: 1,
                    text: '1h',
                    events: {
                        click: () => {
                            this.getData("BTCUSD", "1h", 3)
                        }
                    }
                }, {
                    type: 'week',
                    count: 4,
                    text: '6h',
                    events: {
                        click: () => {
                            this.getData("BTCUSD", "6h", 4)
                        }
                    }
                }, {
                    type: 'year',
                    count: 1,
                    text: '1d',
                    events: {
                        click: () => {
                            this.getData("BTCUSD", "1D", 5)
                        }
                    }
                }]
            },
            title: {
                text: 'BTCUSD'
            },
            yAxis: [{
                labels: {
                    align: 'right',
                    x: -3
                },
                title: {
                    text: 'OHLC'
                },
                height: '80%',
                lineWidth: 2,
                resize: {
                    enabled: true
                }
            }, {
                labels: {
                    align: 'right',
                    x: -3
                },
                title: {
                    text: 'Volume'
                },
                top: '83%',
                height: '17%',
                offset: 0,
                lineWidth: 2
            }],
            tooltip: {
                split: true
            },
            chart: {
                height: this.props.height,
                width: this.props.width
            }
        }

        return <ReactHighstock config={options} ref="chart"/>
    }
}

Chart.propTypes = {
    width: PropTypes.number,
    height: PropTypes.number
}
