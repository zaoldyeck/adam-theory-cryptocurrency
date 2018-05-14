import {Meteor} from 'meteor/meteor';
import {check} from 'meteor/check'
import axios from 'axios'

Meteor.methods({
    getData(symbol, timeFrame) {
        check(symbol, String);
        check(timeFrame, String);
        this.unblock();

        return axios.get(`https://api.bitfinex.com/v2/candles/trade:${timeFrame}:t${symbol}/hist`, {params: {limit: 1000}}).then(response => {
            const candles = response.data.reverse()
            console.log(candles.length)
            return {
                candles: candles.map(candle => [candle[0], candle[1], candle[3], candle[4], candle[2]]),
                volumes: candles.map(candle => [candle[0], candle[5]]),
            }
        })
    }
});