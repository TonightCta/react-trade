import { CSSTransition, TransitionGroup } from "react-transition-group";
import * as View from "../views/index";
import { ReactElement, ReactNode } from "react";
import { withRouter, Route, Switch, Redirect, useLocation, Router } from "react-router-dom";
import PrivateRoute from "./private";
import { createHashHistory } from "history";
import "./index.css";

const RouteConfig = (): ReactElement<ReactNode> => {
  const location: any = useLocation();
  const history = createHashHistory();
  history.listen((location: any) => {
    setTimeout(() => {
      if (location.action === 'POP') return;
      const win: any = window;
      if (location.pathname === '/home' || location.pathname === '/quotes' || location.pathname === '/trade' || location.pathname === '/mine') {
        win.setStatus(1)
      } else {
        win.setStatus(0)
      };
      window.scrollTo(0, 0);
    });
  })
  return (
    <Router history={createHashHistory()}>
      <TransitionGroup>
        <CSSTransition key={location.pathname} timeout={1000} classNames="page">
          <Switch location={location}>
            <Route path="/" exact render={() => <Redirect to="/home" />}></Route>
            <Route path="/login" key="login" component={View.LoginIndex}></Route>
            <Route path={`/home`} key="home" component={View.HomeIndex}></Route>
            <Route path="/quotes" key="quotes" component={View.QuotesIndex}></Route>
            <Route path="/quotes-detail" key="quotesDetail" component={View.TesDetail}></Route>
            <Route path="/setting" key="setting" component={View.SetIndex}></Route>
            <Route path="/set-language" key="setLanguage" component={View.SetLanguage}></Route>
            <Route path="/feedback" key="feedback" component={View.FeedBack}></Route>
            <Route path="/ann" key="ann" component={View.Ann}></Route>
            <Route path="/ann-detail" key="annDetail" component={View.AnnDetail}></Route>
            <Route path="/about-us" key="aboutUs" component={View.About}></Route>
            <Route path="/help" key="help" component={View.Help}></Route>
            <Route path="/help-detail" key="helpDetail" component={View.HelpDetail}></Route>
            <Route path="/register" key="register" component={View.RegisterIndex}></Route>
            <Route path="/forget" key="forget" component={View.ForgetIndex}></Route>
            <Route path="/download" key="download" component={View.DownIndex}></Route>
            <PrivateRoute children={<View.TradeIndex />} key="trade" path="/trade" locationMine={location}></PrivateRoute>
            <PrivateRoute children={<View.MineIndex />} key="mine" path="/mine" locationMine={location}></PrivateRoute>
            <PrivateRoute children={<View.TradeOrder />} key="tradeOrder" path="/trade-order" locationMine={location}></PrivateRoute>
            <PrivateRoute children={<View.AssetsBill />} key="assetsBill" path="/assets-bill" locationMine={location}></PrivateRoute>
            <PrivateRoute children={<View.AssetsLock />} key="assetsLock" path="/assets-lock" locationMine={location}></PrivateRoute>
            <PrivateRoute children={<View.MineAssets />} key="mineAssets" path="/mine-assets" locationMine={location}></PrivateRoute>
            <PrivateRoute children={<View.InvDetail />} key="invDetail" path="/inv-detail" locationMine={location}></PrivateRoute>
            <PrivateRoute children={<View.SafeIndex />} key="safe" path="/safe" locationMine={location}></PrivateRoute>
            <PrivateRoute children={<View.AuthCard />} key="authCard" path="/auth-card" locationMine={location}></PrivateRoute>
            <PrivateRoute children={<View.SetPass />} key="setPass" path="/set-pass" locationMine={location}></PrivateRoute>
            <PrivateRoute children={<View.RechargeIndex />} key="recharge" path="/recharge" locationMine={location}></PrivateRoute>
            <PrivateRoute children={<View.WithdrawIndex />} key="withdraw" path="/withdraw" locationMine={location}></PrivateRoute>
            <PrivateRoute children={<View.WithDrawPending />} key="withdrawDetail" path="/withdraw-detail" locationMine={location}></PrivateRoute>
            <PrivateRoute children={<View.AddressManage />} key="addressManage" path="/address-mange" locationMine={location}></PrivateRoute>
            <PrivateRoute children={<View.InviteIndex />} key="invite" path="/invite" locationMine={location}></PrivateRoute>
            <PrivateRoute children={<View.RechargeFaitIndex />} key="rechargeFait" path="/recharge-fait" locationMine={location}></PrivateRoute>
            <PrivateRoute children={<View.WithdrawFait />} key="withdrawFait" path="/withdraw-fait" locationMine={location}></PrivateRoute>
          </Switch>
        </CSSTransition>
      </TransitionGroup>
    </Router>


  );
};

export default withRouter(RouteConfig);
