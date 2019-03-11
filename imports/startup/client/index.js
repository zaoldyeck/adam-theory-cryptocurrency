import React from "react"
import ReactDOM from "react-dom"
import {onPageLoad} from "meteor/server-render"
// import Avocado from "highcharts/themes/avocado"
// import DarkBlue from "highcharts/themes/dark-blue"
// import DarkGreen from "highcharts/themes/dark-green"
import DarkUnica from "highcharts/themes/dark-unica"
// import Gray from "highcharts/themes/gray"
// import Grid from "highcharts/themes/grid"
// import GridLight from "highcharts/themes/grid-light"
// import Skies from "highcharts/themes/skies"
// import Sunset from "highcharts/themes/sunset"
// import SandSignika from "highcharts/themes/sand-signika"
import ReactHighstock from "react-highcharts/ReactHighstock"
import {BrowserRouter} from 'react-router-dom'
import routes from '/imports/startup/both/routes'

DarkUnica(ReactHighstock.Highcharts)

const App = () => (
    <BrowserRouter>
        {routes}
    </BrowserRouter>
)

onPageLoad(() => {
    ReactDOM.hydrate(<App/>, document.getElementById("render-target"))
})