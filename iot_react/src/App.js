import logo from './logo.svg';
import { BrowserRouter as Router, Route } from 'react-router-dom';
//page
import './App.css';
import MainRef from './pages/MainRef/';
import SecComp from './pages/SecComp/';
function App() {
  return (
    <div className="App">
      <Router>
        <Route exact path='/' component={MainRef} />
        <Route path='/stuff' component={SecComp} />
      </Router>
    </div>
  );
}

export default App;
