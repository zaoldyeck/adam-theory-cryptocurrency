import React, {Component} from 'react';
//import ChartContainer from './ChartContainer'
import Chart from './Chart'
import FullScreen from 'react-fullscreen'

export default class App extends Component {
    render() {
        return (
            <FullScreen>
                <Chart/>
            </FullScreen>)
    }
}