import Footer from './components/footer';
import RouteConfig from './route';
import { HashRouter, withRouter } from 'react-router-dom';
import './App.css';
import './App.scss'
import { ReactNode, useEffect, useState } from 'react';
import LoadView from './views/load_view/load_view';
import { createWS, sendWs } from './utils/ws'
import InvBox from './components/inv/inv';
import { upUserAssets } from './store/app/action_fn'
import store from './store';
import { QUList } from './request/api';
import { setQU, upDefaultPriceCoin } from './store/app/action_creators';

const App = (): React.ReactElement<ReactNode> => {
  const [token, setToken] = useState<string | null>(sessionStorage.getItem('token_1'));
  const [wsStatus, setWsStatus] = useState<number>(store.getState().wsStatus)
  const sendWSApp = async () => {
    let arr: any[] = [];
    const result = await QUList()
    for (let i in result.data.list) {
      arr.push(result.data.list[i]);
      if (result.data.list[i].symbol === "BTCUSDT") {
        const action = upDefaultPriceCoin(result.data.list[i].price);
        store.dispatch(action);
      }
    };
    const actionQU = setQU(arr);
    store.dispatch(actionQU)
    arr.forEach(e => {
      sendWs({
        e: 'subscribe',
        d: {
          symbol: e.symbol,
          interval: '1m'
        }
      });
    });
  };
  const storeChange = () => {
    store.subscribe(() => {
      setToken(store.getState().appToken);
      setWsStatus(store.getState().wsStatus)
    })
  };
  useEffect(() => {
    wsStatus === 1 && sendWSApp();
  }, [wsStatus])
  useEffect(() => {
    setInterval(() => {
      token && upUserAssets();
    }, 10000)
  }, [token])
  useEffect(() => {
    storeChange();
    createWS();
  }, [])
  return (
    <HashRouter>
      <div className="App">
        {/* 启动页 */}
        <LoadView />
        {/* 邀请链接 */}
        <InvBox />
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
