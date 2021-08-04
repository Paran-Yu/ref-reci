import logo from './logo.svg';
import { BrowserRouter as Router, Route } from 'react-router-dom';
//page
import './App.css';
import MainRef from './pages/MainRef/';
import SecComp from './pages/SecComp/';
import Recipe from './pages/Recipe';
import SignIn from './pages/Sign/SignIn';
import SignUp from './pages/Sign/SignUp';
function App() {
  return (
    <div className="App">
      <Router>
        {/* <Route exact path='/' component={MainRef} /> */}
        <Route exact path='/' component={MainRef} />
        <Route path='/stuff' component={SecComp} />
        <Route path='/reci' component={Recipe} />
        <Route path="/signIn" component={SignIn} />
        <Route path="/signup" component={SignUp} />
      </Router>
    </div>
  );
}

export default App;
