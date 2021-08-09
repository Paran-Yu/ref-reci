import { BrowserRouter as Router, Route } from 'react-router-dom';

//page
import './App.css';
import Main from './pages/Main/';
import Fridge from './pages/Fridge/';
import Recipe from './pages/Recipe';
import SignIn from './components/Auth/SignIn';
import SignUp from './components/Auth/SignUp';
import ChangePassword from './components/Auth/ChangePassword'


function App() {
  return (
    <div className="App">
      <Router>
        {/* <Route exact path='/' component={MainRef} /> */}
        <Route exact path='/' component={Main} />
        <Route path='/fridge' component={Fridge} />
        <Route path='/recipe' component={Recipe} />
        <Route path="/signin" component={SignIn} />
        <Route path="/signup" component={SignUp} />
        <Route path="/changepassword" component={ChangePassword} />
      </Router>
    </div>
  );
}

export default App;
