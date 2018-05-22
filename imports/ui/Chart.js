import React, {Component} from "react";
import ReactHighstock from "react-highcharts/ReactHighstock"
import PropTypes from "prop-types"
import {Meteor} from "meteor/meteor";

export default class Chart extends Component {
    constructor(props) {
        super(props);
        this.state = {candles: [], volumes: [], selected: 3}
    }

    componentDidMount() {
        this.getData(this.props.symbol, "1h")
        ReactHighstock.Highcharts.setOptions({
            time: {
                timezoneOffset: new Date().getTimezoneOffset()
            }
        })
    }

    getData(symbol, timeFrame, selected = this.state.selected) {
        this.refs.chart.getChart().showLoading()
        Meteor.call("getDataForAdamTheory", symbol, timeFrame, (error, result) => {
            this.setState({candles: result.candles, volumes: result.volumes, selected: selected})
        })
    }

    render() {
        const symbol = this.props.symbol
        const options = {
            series: [{
                type: "candlestick",
                name: symbol,
                data: this.state.candles,
                id: "candlestick"
            }, {
                type: "column",
                name: "Volume",
                data: this.state.volumes,
                yAxis: 1,
            }, this.state.candles.length === 0 ? {} : {
                type: "flags",
                name: "Flags on series",
                data: [{
                    x: this.state.candles[this.state.candles.length - 51][0],
                    title: "Now"
                }],
                onSeries: "candlestick",
                shape: "squarepin",
                y: -100,
                enableMouseTracking: false,
                fillColor: "#e0e0e3", //#4186c4,
                lineColor: "#e0e0e3",
                lineWidth: 1,
                style: {
                    color: "#4186c4" //#e0e0e3
                },
            }],
            rangeSelector: {
                selected: this.state.selected,
                allButtonsEnabled: true,
                buttons: [{
                    type: "hour",
                    count: 3,
                    text: "1m",
                    events: {
                        click: () => {
                            this.getData(symbol, "1m", 0)
                        }
                    }
                }, {
                    type: "hour",
                    count: 10,
                    text: "5m",
                    events: {
                        click: () => {
                            this.getData(symbol, "5m", 1)
                        }
                    }
                }, {
                    type: "day",
                    count: 2,
                    text: "30m",
                    events: {
                        click: () => {
                            this.getData(symbol, "30m", 2)
                        }
                    }
                }, {
                    type: "week",
                    count: 1,
                    text: "1h",
                    events: {
                        click: () => {
                            this.getData(symbol, "1h", 3)
                        }
                    }
                }, {
                    type: "week",
                    count: 4,
                    text: "6h",
                    events: {
                        click: () => {
                            this.getData(symbol, "6h", 4)
                        }
                    }
                }, {
                    type: "year",
                    count: 1,
                    text: "1d",
                    events: {
                        click: () => {
                            this.getData(symbol, "1D", 5)
                        }
                    }
                }]
            },
            title: {
                text: symbol
            },
            xAxis: {
                gridLineWidth: 0.2,
                lineColor: "#5e6067",
                crosshair: {
                    dashStyle: "dash",
                    color: "#55575d",
                },
            },
            yAxis: [{
                gridLineWidth: 0.2,
                crosshair: {
                    dashStyle: "dash",
                    color: "#55575d",
                    snap: false
                },
                labels: {
                    align: "right",
                    x: -3
                },
                title: {
                    text: "OHLC"
                },
                height: "100%",
                lineWidth: 1,
                resize: {
                    enabled: true
                }
            }, {
                gridLineWidth: 0.2,
                labels: {
                    align: "right",
                    x: -3
                },
                title: {
                    text: "Volume"
                },
                top: "80%",
                height: "20%",
                offset: 0,
                lineWidth: 1,
                visible: false,
            }],
            tooltip: {
                split: true
            },
            chart: {
                height: this.props.height,
                width: this.props.width,
                backgroundColor: "#131722"
            },
            plotOptions: {
                candlestick: {
                    color: "#e94f5f",
                    upColor: "#57b888",
                    lineColor: "#e94f5f",
                    upLineColor: "#57b888",
                    pointPadding: 0.2,
                    groupPadding: 0.2
                },
                column: {
                    pointPadding: 0.1,
                    groupPadding: 0.1
                },
                series: {
                    turboThreshold: 0
                }
            }
        }

        return <ReactHighstock config={options} ref="chart"/>
    }
}

Chart.propTypes = {
    width: PropTypes.number,
    height: PropTypes.number,
    symbol: PropTypes.string.isRequired
}