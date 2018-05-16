import React from "react";
import {renderToString} from "react-dom/server";
import {onPageLoad} from "meteor/server-render";
import '/imports/api/Bitfinex'
import {StaticRouter} from 'react-router-dom';
import routes from '/imports/startup/both/routes'

const context = {}
const App = props => (
    <StaticRouter location={props.location} context={context}>
        {routes}
    </StaticRouter>
);

onPageLoad(sink => {
    sink.renderIntoElementById("render-target", renderToString(<App location={sink.request.url}/>));
});