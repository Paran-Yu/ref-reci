import logo from './logo.svg';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Button from '@material-ui/core/Button'

//page
import './App.css';
import MainRef from './pages/MainRef/';
import SecComp from './pages/SecComp/';
import Recipe from './pages/Recipe';
import SignIn from './components/Auth/SignIn';
import SignUp from './components/Auth/SignUp';
//import ChangePassword from './components/Auth/ChangePassword'
// import FloatingActionButton from './components/Main/FloatingActionButton';


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
        {/* <Route path="/main" component={FloatingActionButton} /> */}
        <Route path="/mainref" component={MainRef} />
        {/* <Route path="/changepassword" component={ChangePassword} /> */}
      </Router>
    </div>
  );
}

export default App;
