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
    <Router history={createHashHistory()}>
      <TransitionGroup>
        <CSSTransition key={location.pathname} timeout={1000} classNames="page">
          <Switch location={location}>
            <Route path="/" exact render={() => <Redirect to="/home" />}></Route>
            <Route path="/login" key={new Date().getTime()} component={View.LoginIndex}></Route>
            <Route path="/home" key={new Date().getTime()} component={View.HomeIndex}></Route>
            <Route path="/quotes" key={new Date().getTime()} component={View.QuotesIndex}></Route>
            <Route path="/quotes-detail" key={new Date().getTime()} component={View.TesDetail}></Route>
            <Route path="/setting" key={new Date().getTime()} component={View.SetIndex}></Route>
            <Route path="/set-language" key={new Date().getTime()} component={View.SetLanguage}></Route>
            <Route path="/feedback"  key={new Date().getTime()} component={View.FeedBack}></Route>
            <Route path="/ann" key={new Date().getTime()} component={View.Ann}></Route>
            <Route path="/ann-detail" key={new Date().getTime()} component={View.AnnDetail}></Route>
            <Route path="/about-us" key={new Date().getTime()} component={View.About}></Route>
            <Route path="/help" key={new Date().getTime()} component={View.Help}></Route>
            <Route path="/help-detail" key={new Date().getTime()} component={View.HelpDetail}></Route>
            <Route path="/register" key={new Date().getTime()} component={View.RegisterIndex}></Route>
            <Route path="/forget" key={new Date().getTime()} component={View.ForgetIndex}></Route>
            <PrivateRoute children={<View.TradeIndex />} path="/trade" locationMine={location}></PrivateRoute>
            <PrivateRoute children={<View.MineIndex />} path="/mine" locationMine={location}></PrivateRoute>
            <PrivateRoute children={<View.TradeOrder />} path="/trade-order" locationMine={location}></PrivateRoute>
            <PrivateRoute children={<View.AssetsBill />} path="/assets-bill" locationMine={location}></PrivateRoute>
            <PrivateRoute children={<View.AssetsLock />} path="/assets-lock" locationMine={location}></PrivateRoute>
            <PrivateRoute children={<View.MineAssets />} path="/mine-assets" locationMine={location}></PrivateRoute>
            <PrivateRoute children={<View.InvDetail />} path="/inv-detail" locationMine={location}></PrivateRoute>
            <PrivateRoute children={<View.SafeIndex />} path="/safe" locationMine={location}></PrivateRoute>
            <PrivateRoute children={<View.AuthCard />} path="/auth-card" locationMine={location}></PrivateRoute>
            <PrivateRoute children={<View.SetPass />} path="/set-pass" locationMine={location}></PrivateRoute>
            <PrivateRoute children={<View.RechargeIndex />} path="/recharge" locationMine={location}></PrivateRoute>
            <PrivateRoute children={<View.WithdrawIndex />} path="/withdraw" locationMine={location}></PrivateRoute>
            <PrivateRoute children={<View.WithDrawPending />} path="/withdraw-detail" locationMine={location}></PrivateRoute>
          </Switch>
        </CSSTransition>
      </TransitionGroup>
    </Router>


  );
};

export default withRouter(RouteConfig);
