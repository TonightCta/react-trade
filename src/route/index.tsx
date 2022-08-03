import * as View from '../views/index'
import React, { ReactNode } from "react";
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import { createHashHistory } from 'history';
const history = createHashHistory();

const RouteConfig = (): React.ReactElement<ReactNode> => {
    return (
        <Router history={history}>
            <Switch>
                <Route path="/" exact render={() => (
                    <Redirect to="/home" />
                )}></Route>
                <Route path="/home" component={View.HomeIndex}></Route>
                <Route path="/trade" component={View.TradeIndex}></Route>
                <Route path="/mine" component={View.MineIndex}></Route>
            </Switch>
        </Router>
    )
};

export default RouteConfig;
