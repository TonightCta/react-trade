import Footer from './components/footer';
import RouteConfig from './route';
import { HashRouter } from 'react-router-dom';
import './App.css';
import './App.scss'
import { ReactNode, useCallback, useEffect, useState } from 'react';
import LoadView from './views/load_view/load_view';
// import { createWS, sendWs,getMessage } from './utils/ws'
import { useSocket } from './utils/hooks'
// import { upUserAssets } from './store/app/action_fn'
// import { WSDataType } from "./utils/state";
// import { initWsSubscribe, subscribeReducer } from './redurce/set_subscribe';
import store from './store';
import { QUList } from './request/api';
import { setQU, upCurrentCoin, setTradeFrom, setTradeTo } from './store/app/action_creators';

const App = (): React.ReactElement<ReactNode> => {
  // const [token, setToken] = useState<string | null>(sessionStorage.getItem('token_1'));
  const [wsStatus, setWsStatus] = useState<number>(store.getState().wsStatus);
  const [sourceQ, setSourceQ] = useState<any[]>([]);
  const setQUH = async () => {
    let arr: any[] = [];
    const result = await QUList();
    for (let i in result.data.list) {
      arr.push(result.data.list[i]);
    };
    setSourceQ(arr);
    if (!localStorage.getItem('currentCoin')) {
      const action = upCurrentCoin(Object.values<any>(result.data.list)[0]);
      store.dispatch(action);
    }
    if (!sessionStorage.getItem('tradeFromCoin')) {
      const current = JSON.parse(localStorage.getItem('currentCoin') || '{}')
      const actionFromCoin = setTradeFrom(current.target)
      const actionToCoin = setTradeTo(current.base)
      store.dispatch(actionFromCoin);
      store.dispatch(actionToCoin);
    }
    const actionQU = setQU(arr);
    store.dispatch(actionQU);
  }
  // const [state, dispatch] = useReducer(subscribeReducer, {}, initWsSubscribe);
  const { send } = useSocket();
  const sendWSApp = async () => {
    store.getState().quList.forEach(e => {
      send({
        e: 'subscribe',
        d: {
          symbol: e.symbol,
          interval: '1m'
        }
      });
    });
  }
  const storeChange = () => {
    store.subscribe(() => {
      // setToken(store.getState().appToken);
      setWsStatus(store.getState().wsStatus)
    })
  };
  useEffect(() => {
    wsStatus === 1 && sendWSApp();
  }, [wsStatus, sourceQ.length])
  // useEffect(() => {
  //   setInterval(() => {
  //     token && upUserAssets();
  //   }, 10000)
  // }, [token])
  useEffect(() => {
    storeChange();
    if (store.getState().quList.length < 1) {
      setQUH();
    };
    const win :any  = window;
    console.log(win)
    // createWS();
    return () => {
      setSourceQ([])
    }
  }, [])
  return (
    <HashRouter>
      <div className="App">
        {/* 启动页 */}
        <LoadView />
        {/* 邀请链接 */}
        {/* <InvBox /> */}
        <div className='router-view'>
          <RouteConfig />
        </div>
        <div className='footer'>
          <Footer />
        </div>
      </div>
    </HashRouter>
  );
}

export default App;
