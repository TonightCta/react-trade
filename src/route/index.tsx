import { CSSTransition, TransitionGroup } from "react-transition-group";
import * as View from "../views/index";
import { ReactElement, ReactNode, useEffect } from "react";
import { withRouter, Route, Switch, Redirect, useLocation, Router,useHistory } from "react-router-dom";
import PrivateRoute from "./private";
// import { createHashHistory } from "history";
import "./index.css";
import { useSocket } from "../utils/hooks";
import store from "../store";

const RouteConfig = (): ReactElement<ReactNode> => {
  const location = useLocation();
  const history = useHistory();
  const { send } = useSocket();
  useEffect(() => {
    const quList = store.getState().quList;
    history.listen((location: any) => {
      setTimeout(() => {
        if (location.action === 'POP') return;
        const win: any = window;
        if (location.pathname === '/home' || location.pathname === '/quotes' || location.pathname === '/trade' || location.pathname === '/mine') {
          win.setStatus(1);
        } else {
          win.setStatus(0)
        };
        if (location.pathname === '/home' || location.pathname === '/trade' || location.pathname === '/quotes-detail') {
          quList.forEach(e => {
            send({
              e: 'subscribe',
              d: {
                symbol: e.symbol,
                interval: '1m'
              }
            });
          });
        } else {
          quList.forEach(e => {
            send({
              e: 'unsubscribe',
              d: {
                symbol: e.symbol,
                interval: '1m'
              }
            });
          });
        }
        window.scrollTo(0, 0);
      });
    })
  }, []);
  const LAND : string | undefined = process.env.REACT_APP_LAND;
  return (
    <Router history={useHistory()}>
      <TransitionGroup>
        <CSSTransition key={location.pathname} timeout={1000} classNames="page">
          <Switch location={location}>
            {/**
             * REACT_APP_LAND
             * 1 ---> 泰国
             * 2 ---> 南非
             * 3 ---> 南非 YD
             * 4 ---> 越南 ASX
            */}
            <Route path="/" exact render={() => <Redirect to="/home" />}></Route>
            <Route path="/login" key="login" component={View.LoginIndex}></Route>
            <Route path={`/home`} key="home" component={LAND == '1' && View.HomeIndex || LAND == '2' && View.HomeIndexOutside || LAND == '3' && View.HomeIndexNew || LAND == '4' && View.HomeIndexAsx || View.HomeIndex}></Route>
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
            <Route path="/download-en" key="downloadEn" component={View.DownEnIndex}></Route>
            <Route path="/download-new" key="downloadYD" component={View.DownNewIndex}></Route>
            <Route path="/download-asx" key="downloadASX" component={View.DownAsxIndex}></Route>
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
            <PrivateRoute children={<View.ActivityTH />} key="activity" path="/activity" locationMine={location}></PrivateRoute>
            <PrivateRoute children={<View.RechargeFaitIndex />} key="rechargeFait" path="/recharge-fait" locationMine={location}></PrivateRoute>
            <PrivateRoute children={<View.WithdrawFait />} key="withdrawFait" path="/withdraw-fait" locationMine={location}></PrivateRoute>
            <PrivateRoute children={<View.InviteIndexTh/>} key="inviteTh" path="/invite-th"></PrivateRoute>
            <PrivateRoute children={<View.InviteIndexNew/>} key="inviteNew" path="/invite-new"></PrivateRoute>
            <PrivateRoute children={<View.InviteIndexASX/>} key="inviteASX" path="/invite-asx"></PrivateRoute>
            <Route path="*" key="unknow" component={View.NotFound}></Route>
          </Switch>
        </CSSTransition>
      </TransitionGroup>
    </Router>


  );
};

export default withRouter(RouteConfig);
