import React from "react";
import ReactDOM from "react-dom";
import {onPageLoad} from "meteor/server-render";
import DarkUnica from "highcharts/themes/dark-unica";
import ReactHighstock from "react-highcharts/ReactHighstock";
import {BrowserRouter} from 'react-router-dom';
import routes from '/imports/startup/both/routes'

DarkUnica(ReactHighstock.Highcharts)

const App = () => (
    <BrowserRouter>
        {routes}
    </BrowserRouter>
)

onPageLoad(() => {
    ReactDOM.hydrate(<App/>, document.getElementById("render-target"));
});