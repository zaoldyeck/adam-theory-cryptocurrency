import React, {Component} from 'react';
import Chart from './Chart'
import FullScreen from './FullScreen'

export default class App extends Component {
    render() {
        return (
            <FullScreen>
                <Chart symbol={this.props.match.params.symbol}/>
            </FullScreen>
        )
    }
}