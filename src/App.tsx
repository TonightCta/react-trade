import Footer from './components/footer';
import RouteConfig from './route';
import { HashRouter, Router } from 'react-router-dom';
import { createHashHistory } from 'history'
import './App.css';
import './App.scss'
import { ReactNode } from 'react';
const history = createHashHistory();

const App = (): React.ReactElement<ReactNode> => {

  return (
    <HashRouter>
      <div className="App">
        <div className='router-view'>
          <Router history={history}>
            <RouteConfig />
          </Router>
        </div>
        <div className='footer'>
          <Footer />
        </div>
      </div>
    </HashRouter>

  );
}

export default App;
