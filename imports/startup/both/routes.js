import React from 'react';
import {Route, Switch,Redirect} from 'react-router-dom';
import App from '/imports/ui/App';

export default (
    <Switch>
        <Redirect exact from='/' to='/BTCUSD'/>
        <Route exact path="/:symbol" component={App}/>
    </Switch>
)