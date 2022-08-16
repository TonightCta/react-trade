import Footer from './components/footer';
import RouteConfig from './route';
import { HashRouter, withRouter } from 'react-router-dom';
import './App.css';
import './App.scss'
import { ReactNode, useEffect, useState } from 'react';
import LoadView from './views/load_view/load_view';
import { createWS } from './utils/ws'
import InvBox from './components/inv/inv';
import { upUserAssets } from './store/app/action_fn'
import store from './store';

const App = (): React.ReactElement<ReactNode> => {
  const [token, setToken] = useState<string | null>(sessionStorage.getItem('token_1'));
  const storeChange = () => {
    store.subscribe(() => {
      setToken(store.getState().appToken);
    })
  };
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
