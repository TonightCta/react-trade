import Footer from './components/footer';
import RouteConfig from './route';
import './App.css';
import './App.scss'

function App() {
  return (
    <div className="App">
      <div className='router-view'>
        <RouteConfig />
      </div>
      <div className='footer'>
        <Footer/>
      </div>
    </div>
  );
}

export default App;
