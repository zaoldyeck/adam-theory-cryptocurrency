import {Meteor} from 'meteor/meteor';
import {check} from 'meteor/check'
import axios from 'axios'

Meteor.methods({
    getData(symbol, timeFrame) {
        check(symbol, String);
        check(timeFrame, String);
        this.unblock();
        return getCandles(symbol, timeFrame)
    },
    getDataForAdamTheory(symbol, timeFrame) {
        return getCandles(symbol, timeFrame).then(data => {
            const {candles, volumes} = data
            const lastCandle = candles[candles.length - 1]
            const lastCandleMTS = lastCandle[0], lastCandleClose = lastCandle[4]
            const newCandles = candles.slice(candles.length - 51, candles.length - 1).reverse().map(array =>
                [2 * lastCandleMTS - array[0],
                    2 * lastCandleClose - array[4],
                    2 * lastCandleClose - array[3],
                    2 * lastCandleClose - array[2],
                    2 * lastCandleClose - array[1]])
            const newVolumes = newCandles.map(array => {
                return {x: array[0], y: 0}
            })
            let result = {
                candles: [...candles, ...newCandles],
                volumes: [...volumes, ...newVolumes]
            };
            return result
        })
    }
});

function getCandles(symbol, timeFrame, retry = 1) {
    if (retry < 6) {
        return axios.get(`https://api-pub.bitfinex.com/v2/candles/trade:${timeFrame}:t${symbol.toUpperCase()}/hist`, {params: {limit: 1000}}).then(response => {
            const candles = response.data.reverse()

            /**
             * [MTS, OPEN, CLOSE, HIGH, LOW, VOLUME] to
             * [MTS, OPEN, HIGH, LOW, CLOSE] and
             * [MTS, VOLUME]
             */
            return {
                candles: candles.map(candle => [candle[0], candle[1], candle[3], candle[4], candle[2]]),
                volumes: candles.map(candle => {
                    return {x: candle[0], y: candle[5], color: candle[1] - candle[2] > 0 ? "#532834" : "#274841"}
                }),
            }
        }).catch(error => getCandles(symbol, timeFrame, retry + 1))
    } else Meteor.Error("API retry limit", "Bitfinex API retry more than 5 times.")
}