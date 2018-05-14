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
        this.state = {candles: [], volumes: []}
        Meteor.call("getData", "BTCUSD", "1h", (error, result) => {
            this.setState({candles: result.candles, volumes: result.volumes})
        })
    }

    render() {
        const options = {
            series: [{
                type: 'candlestick',
                name: 'BTCUSD',
                data: this.state.candles/*,
                dataGrouping: {
                    units: [[
                        'week',                         // unit name
                        [1]                             // allowed multiples
                    ], [
                        'month',
                        [1, 2, 3, 4, 6]
                    ]]
                }*/
            }, {
                type: 'column',
                name: 'Volume',
                data: this.state.volumes,
                yAxis: 1/*,
                dataGrouping: {
                    units: [[
                        'week',                         // unit name
                        [1]                             // allowed multiples
                    ], [
                        'month',
                        [1, 2, 3, 4, 6]
                    ]]
                }
                */
            }],
            rangeSelector: {
                //selected: 1
                buttons: [{
                    type: 'minute',
                    count: 1,
                    text: '1m'
                }, {
                    type: 'minute',
                    count: 5,
                    text: '5m'
                }, {
                    type: 'minute',
                    count: 30,
                    text: '30m'
                }, {
                    type: 'hour',
                    text: 'YTD'
                }, {
                    type: 'hour',
                    count: 1,
                    text: '1y'
                }, {
                    type: 'all',
                    text: 'All'
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
                height: '60%',
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
                top: '65%',
                height: '35%',
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

        return (
            <ReactHighstock config={options}/>
        );
    }
}

Chart.propTypes = {
    width: PropTypes.number,
    height: PropTypes.number
}
