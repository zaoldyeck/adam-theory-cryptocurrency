import React from 'react';
import {Redirect, Route, Switch} from 'react-router-dom';
import App from '/imports/ui/App';

export default (
    <Switch>
        <Redirect exact from='/' to='/BTCUSD'/>
        <Route sensitive path="/:symbol([a-z]+)"
               render={props => <Redirect to={`${props.location.pathname.toUpperCase()}`}/>}/>
        <Route exact path="/:symbol" component={App}/>
    </Switch>
)