import Footer from './components/footer';
import RouteConfig from './route';
import { HashRouter } from 'react-router-dom';
import './App.css';
import './App.scss'

function App() {
  return (
    <HashRouter>
      <div className="App">
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
