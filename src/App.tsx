import Footer from './components/footer';
import RouteConfig from './route';
import { HashRouter } from 'react-router-dom';
import './App.css';
import './App.scss'
import { ReactNode, useEffect } from 'react';
import LoadView from './views/load_view/load_view';

const App = (): React.ReactElement<ReactNode> => {
  // useEffect((): void => {
    // window.scrollTo(0, 0)
    // window.scrollTo({
    //   top: 0,
    //   behavior: 'smooth'
    // });
  // }, [])
  return (
    <HashRouter>
      <div className="App">
        {/* 启动页 */}
        <LoadView/>
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
