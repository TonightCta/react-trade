import Footer from './components/footer';
import RouteConfig from './route';
import { HashRouter, withRouter } from 'react-router-dom';
import './App.css';
import './App.scss'
import { ReactNode, useEffect } from 'react';
import LoadView from './views/load_view/load_view';
import { createWS } from './utils/ws'
import InvBox from './components/inv/inv';

const App = (): React.ReactElement<ReactNode> => {
  useEffect(() => {
    createWS();
  }, [])
  return (
    <HashRouter>
      <div className="App">
        {/* 启动页 */}
        <LoadView />
        {/* 邀请链接 */}
        <InvBox/>
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
