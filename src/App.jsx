import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Login from './components/Login';
import Navbar from './components/Navbar';

function App() {
  return (
    <Router>
      <div className="container">
        <Navbar />
        <Switch>
        <Route exact path="/">
            Home...
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/admin">
            Admin...
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
