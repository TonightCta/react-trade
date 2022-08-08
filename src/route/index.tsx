import { CSSTransition, TransitionGroup } from "react-transition-group";
import * as View from "../views/index";
import { ReactElement, ReactNode, useEffect } from "react";
import { withRouter, Route, Switch, Redirect, useLocation, Router } from "react-router-dom";
import PrivateRoute from "./private";
import { createHashHistory } from "history";
import "./index.css";

const RouteConfig = (): ReactElement<ReactNode> => {
  useEffect((): void => {
    // window.scrollTo(0,0)
  }, [])
  const location: any = useLocation();
  const history = createHashHistory();
  history.listen((location: any) => {
    setTimeout(() => {
      if (location.action === 'POP') return;
      window.scrollTo(0, 0);
    });
  })
  return (
    <Router history={history}>
      <TransitionGroup>
        <CSSTransition key={location.pathname} timeout={1000} classNames="page">
          <Switch location={location}>
            <Route path="/" exact render={() => <Redirect to="/home" />}></Route>
            <Route path="/login" component={View.LoginIndex}></Route>
            <Route path="/home" component={View.HomeIndex}></Route>
            <Route path="/quotes" component={View.QuotesIndex}></Route>
            <Route path="/quotes-detail" component={View.TesDetail}></Route>
            <Route path="/trade" component={View.TradeIndex}></Route>
            <PrivateRoute children={<View.MineIndex />} path="/mine" location={location}></PrivateRoute>
            <Route path="/trade-order" component={View.TradeOrder}></Route>
            <Route path="/assets-bill" component={View.AssetsBill}></Route>
            <Route path="/assets-lock" component={View.AssetsLock}></Route>
            <Route path="/mine-assets" component={View.MineAssets}></Route>
            <Route path="/inv-detail" component={View.InvDetail}></Route>
            <Route path="/setting" component={View.SetIndex}></Route>
            <Route path="/safe" component={View.SafeIndex}></Route>
            <Route path="/auth-card" component={View.AuthCard}></Route>
            <Route path="/set-pass" component={View.SetPass}></Route>
            <Route path="/set-language" component={View.SetLanguage}></Route>
            <Route path="/feedback" component={View.FeedBack}></Route>
            <Route path="/ann" component={View.Ann}></Route>
            <Route path="/ann-detail" component={View.AnnDetail}></Route>
            <Route path="/about-us" component={View.About}></Route>
            <Route path="/help" component={View.Help}></Route>
            <Route path="/help-detail" component={View.HelpDetail}></Route>
            <Route path="/register" component={View.RegisterIndex}></Route>
            <Route path="/forget" component={View.ForgetIndex}></Route>
            <Route path="/recharge" component={View.RechargeIndex}></Route>
            <Route path="/withdraw" component={View.WithdrawIndex}></Route>
            <Route path="/withdraw-detail" component={View.WithDrawPending}></Route>
          </Switch>
        </CSSTransition>
      </TransitionGroup>
    </Router>


  );
};

export default withRouter(RouteConfig);